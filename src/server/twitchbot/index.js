var tmi = require('tmi.js');
var fs = require('fs');
const io = require('socket.io-client');
const Events = require('../../Events');
const hueLights = require('../hueLights');
const config = require('./config.json');
const messages = require('./messages');
const isSubscribed = require('./util').isSubscribed;
const fireBasedb = require('../firebaseDb');
const botColor = 'SpringGreen';
let currentChannel;
const emotes = {};
var client = null;
function initializeClient(channel, socket = null) {
  currentChannel = channel;
  globalSocket = io('http://192.168.0.105:3231');

  client = new tmi.client({
    identity: {
      username: config.users.reonbot.username,
      password: config.users.reonbot.oauth
    },
    channels: ['#' + currentChannel]
  });
  client.on('connected', (address, port) => {
    client.color(botColor);
    console.log(
      'Connected to ' + currentChannel + ' as ' + config.users.reonbot.username
    );
  });
  client.on('chat', onChatMessage);
  client.on('emotesets', onEmoteSets);
}
const coolDownMaster = makeCoolDownObject(30 * 1000);
const coolDownLight = makeCoolDownObject(10 * 1000);
let globalSocket = null;

var repeatWord = word => numberOfTimes => {
  let words = '';
  for (var i = 0; i < numberOfTimes; i++) {
    words += word + ' ';
  }
  return words.trim();
};

function onEmoteSets(sets) {
  client.api(
    {
      url: '/chat/emoticon_images?emotesets=' + sets
    },
    function(err, res, { emoticon_sets }) {
      const allEmotes = Object.keys(emoticon_sets).reduce((all, ch) => {
        return [...all, ...emoticon_sets[ch].map(chan => chan.code)];
      }, []);
      // emotes.love = emoticon_sets['1035587'][0].code;
      // emotes.goldLove = emoticon_sets['1035588'][0].code;
    }
  );
}
const handleCountCommand = handleCountCommandCreator();
const handleLovePyramid = handleLovePyramidCreator();
const handleFirstChat = handleFirstChatsInit();
var onChatMessage = (channel, user, message = '', self) => {
  console.log(`[${getTime()}](${channel}) ${user.username}: ${message}`);
  handleLightCommand({ message, user });
  handleCountCommand({ message, user });
  handleLovePyramid({ message, user });
  handleGameCommand({ message, user });
  handleFirstChat({ message, user });
  handleKanjiAnswers({ message, user });
};

function handleKanjiAnswers({ message, user }) {
  const kanjiCommandRegex = /^!kanji (\d)/;
  if (globalSocket && kanjiCommandRegex.test(message)) {
    var matches = kanjiCommandRegex.exec(message);
    var [all, number] = matches;
    globalSocket.emit(Events.CHAT_ANSWER, { number, username: user.username });
  }
}

function handleFirstChatsInit() {
  let usersSaidSomething = [];
  return ({ message, user }) => {
    if (!globalSocket) return;

    if (!usersSaidSomething.includes(user.username)) {
      usersSaidSomething = [...usersSaidSomething, user.username];

      globalSocket.emit(Events.FIRST_CHAT, { username: user['display-name'] });
    }
  };
}

function handleGameCommand({ message, user }) {
  const gameCommandRegex = /^!sw (\d) (\d)/;

  if (gameCommandRegex.test(message)) {
    var matches = gameCommandRegex.exec(message);
    var [all, number1, number2] = matches;
    if (globalSocket) {
      globalSocket.emit(Events.CHAT_GAME_SWITCH_IMAGE, { number1, number2 });
    }
  }
}

function handleLovePyramidCreator() {
  let pyramidSize = 0;
  let timeout = null;

  const cancelTimeout = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };
  const finishPyramid = () => {
    for (let i = pyramidSize; i > 0; i--) {
      client.say(currentChannel, repeatWord('ludicr4Love')(i));
    }
    pyramidSize = 0;
  };
  const startTimeout = () => {
    cancelTimeout();
    timeout = setTimeout(() => {
      finishPyramid();
    }, 5000);
  };
  const isCorrectNextSize = message =>
    message.trim() === repeatWord('ludicr4Love')(pyramidSize + 1);

  return ({ message = '', user }) => {
    if (user.username === 'reonbot') return;
    if (!message.includes('ludicr4Love')) {
      pyramidSize === 0;
      cancelTimeout();
      return;
    }

    if (isCorrectNextSize(message)) {
      pyramidSize += 1;
      startTimeout();
    } else {
      pyramidSize = 0;
      cancelTimeout();
    }
  };
}

function handleCountCommandCreator() {
  const countCoolDown = 3;
  let onCoolDown = {};

  const isOnCoolDown = command => command in onCoolDown;
  const setCoolDown = command => {
    onCoolDown[command] = true;
    setTimeout(_ => {
      delete onCoolDown[command];
    }, countCoolDown * 1000 * 60);
  };
  return ({ message, user }) => {
    if (message.trim() === '!calmdown' && !isOnCoolDown('!calmdown')) {
      setCoolDown('!calmdown');
      fireBasedb.addOneToCount('calmdown').then(({ value }) => {
        client.say(currentChannel, `Leon has said Calm Down ${value} times.`);
      });
    }
  };
}

function handleLightCommand({ message, user }) {
  const lightCommandRegex = /^!light #([a-f|A-F|0-9]{6})/;

  if (message === '!light' && isSubscribed(user)) {
    if (!coolDownLight.isInCoolDown('!light')) {
      coolDownMaster.setCoolDown('!light');
      client.say(currentChannel, messages.light.main);
    }
  }
  if (message === '!light' && !isSubscribed(user)) {
    if (coolDownMaster.isInCoolDown('!light non-subs')) {
      coolDownMaster.setCoolDown('!light non-subs');
      client.say(currentChannel, messages.light.nonsub);
    }
  } else if (lightCommandRegex.test(message) && isSubscribed(user)) {
    if (!coolDownLight.isInCoolDown('!light c')) {
      coolDownLight.setCoolDown('!light c');
      var matches = lightCommandRegex.exec(message);
      var hexValue = matches[1];
      hueLights.hexToRgb(hexValue);
      hueLights.api.setLightState(3, { rgb: hueLights.hexToRgb(hexValue) });
    }
  } else {
    var regexColors = `^!light (.*)?`;
    var lightColorCommandRegex = new RegExp(regexColors);
    if (
      lightColorCommandRegex.test(message) &&
      !coolDownLight.isInCoolDown('!light c')
    ) {
      coolDownLight.setCoolDown('!light c');
      var matches = lightColorCommandRegex.exec(message);
      var color = matches[1]; //?
      if (hueLights.isAColor(color)) {
        const hexValue = hueLights.getColor(color).hex;
        hueLights.changeColorByHex(hexValue);
      }
    }
  }
}

function makeCoolDownObject(coolDownTime) {
  let coolDownList = [];
  function setCoolDown(command) {
    if (!isInCoolDown(command)) {
      coolDownList.push(command);
      setTimeout(() => {
        removeFromCoolDown(command);
      }, coolDownTime);
    }
  }
  function removeFromCoolDown(command) {
    coolDownList = coolDownList.filter(com => com !== command);
  }
  function isInCoolDown(command) {
    return coolDownList.includes(command);
  }
  return {
    setCoolDown,
    isInCoolDown
  };
}

function getTime() {
  let hours = new Date().getHours();
  let minutes = new Date().getMinutes();
  let seconds = new Date().getSeconds();
  function makeTwoDigit(number) {
    return number.toString().length > 1 ? number : '0' + number;
  }
  [hours, minutes, seconds] = [
    makeTwoDigit(hours),
    makeTwoDigit(minutes),
    makeTwoDigit(seconds)
  ];
  return `${hours}:${minutes}:${seconds}`;
}

function connect(socket, channel) {
  initializeClient(channel, socket);
  client.connect();
}

module.exports = connect;
