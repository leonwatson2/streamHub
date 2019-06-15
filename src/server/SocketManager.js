const io = require('./index.js').io;
const { redirectUri, clientId, clientSecret } = require('../config.json');
const hueApi = require('./hueLights').api;
const Events = require('../Events');
const axios = require('axios');
const fs = require('fs');
const streamLabelsPath = 'C://Users/ATJack/Documents/Work/Stream/StreamLabels';
let globalSocket = null;
function SocketManager(socket) {
  let oauthCode, refreshToken, accessToken, userId;
  // console.log('\x1bc'); //clears console
  console.log('Socket Id:' + socket.id);
  //User disconnects
  socket.on('disconnect', () => {
    console.log('disconnect');
  });
  socket.on(Events.RESET_WINS, () => {
    writeToFile(createTxtFor(Events.TODAYS_WINS), 0);
  });
  socket.on(Events.INCREMENT_WINS, wins => {
    writeToFile(createTxtFor(Events.TODAYS_WINS), wins);
  });
  socket.on(Events.TEXT_CHANGE, text => {
    writeToFile(createTxtFor(Events.TEXT_CHANGE), text);
  });
  socket.on(Events.CHANGE_CHRISTMAS, isBigChristmas => {
    writeToFile(createTxtFor(Events.CHANGE_CHRISTMAS), isBigChristmas);
  });

  socket.on(Events.CURRENT_KANJI, currentKanji => {
    writeToFile(
      createTxtFor(Events.CURRENT_KANJI),
      JSON.stringify(currentKanji)
    );
    writeToFile(createTxtFor(Events.ANSWER_COUNTS), JSON.stringify({}));
  });

  socket.on(Events.ANSWER_COUNTS, ccounts => {
    writeToFile(createTxtFor(Events.ANSWER_COUNTS), JSON.stringify(counts));
  });
  socket.on(Events.CHAT_ANSWER, ({ number, username }) => {
    readFile(createTxtFor(Events.ANSWER_COUNTS)).then(content => {
      if (content) {
        const oldAnswers = JSON.parse(content);
        const answers = createNewAnswers(oldAnswers, { number, username });

        writeToFile(
          createTxtFor(Events.ANSWER_COUNTS),
          JSON.stringify(answers)
        );
      } else {
        writeToFile(
          createTxtFor(Events.ANSWER_COUNTS),
          JSON.stringify({ [number]: [username] })
        );
      }
    });
  });
  socket.on(Events.FIRST_CHAT, v => {
    console.log(v);
    socket.emit(Events.FIRST_CHAT, v);
  });
  socket.on(Events.DARK_MODE, isDarkMode => {
    writeToFile(createTxtFor(Events.DARK_MODE), isDarkMode);
  });
  socket.on('LIGHT_TOGGLE', (lightId, currentState) => {
    hueApi.setLightState(lightId, { on: !currentState }).then(() => {
      updateLights(socket);
    });
  });
  socket.on('LIGHT_COLOR', (lightId, newColor) => {
    hueApi.setLightState(lightId, { rgb: newColor }).then(() => {
      updateLights(socket);
    });
  });

  socket.on('get_followers', cb => {
    getUserFollows(userId, accessToken).then(data => {
      if (data) cb(data);
      else cb([]);
    });
  });
  socket.on(Events.CURRENT_SONG, song => {
    writeToFile(
      createTxtFor(Events.CURRENT_SONG),
      `${song.name} - ${song.artists[0].name}`
    );
  });

  //Files Watched
  const watchedEvents = [
    { name: Events.TEXT_CHANGE },
    { name: Events.TODAYS_WINS },
    {
      name: Events.MOST_RECENT_SUBSCRIBER
    },
    { name: Events.ALL_TIME_TOP_CHEERS },
    { name: Events.ALL_TIME_DONO },
    { name: Events.CURRENT_SONG, emitConstant: Events.NEW_SONG },
    { name: Events.CURRENT_KANJI, jsonParse: true }
  ];
  watchedEvents.forEach(eventConstant => {
    watchAndEmitStreamLabsFile(
      socket,
      eventConstant.name,
      eventConstant.emitConstant,
      eventConstant.jsonParse
    );
  });

  watchStreamLabsFile(
    createTxtFor(Events.ANSWER_COUNTS),
    value => {
      socket.emit(Events.ANSWER_COUNTS, JSON.parse(value));
    },
    createFileErrorCatch(Events.ANSWER_COUNTS, '{1:0, 2: 2, 3: 12, 4: 0}')
  );

  watchStreamLabsFile(createTxtFor(Events.CHANGE_CHRISTMAS), value => {
    socket.emit(Events.CHANGE_CHRISTMAS, value === 'true');
  });
  watchStreamLabsFile(
    createTxtFor(Events.NEW_FOLLOWER),
    value => {
      socket.emit(Events.NEW_FOLLOWER, value);
    },
    err => {
      console.log('error');
    }
  );
  watchStreamLabsFile(
    createTxtFor(Events.DARK_MODE),
    value => {
      socket.emit(Events.DARK_MODE, value === 'true');
    },
    createFileErrorCatch(Events.DARK_MODE, 'true')
  );

  watchStreamLabsFile(
    createTxtFor(Events.GAME_IMAGE_URL),
    value => {
      socket.emit(Events.GAME_IMAGE_URL, value);
    },
    createFileErrorCatch(
      Events.GAME_IMAGE_URL,
      'https://udemy-images.udemy.com/course/750x422/1362070_b9a1_2.jpg'
    )
  );

  watchStreamLabsFile(
    'session_follower_count.txt',
    value => {
      socket.emit(Events.FOLLOWER_COUNT, value);
    },
    err => {
      console.log('error');
    }
  );
  watchStreamLabsFile(
    'push_per.txt',
    value => {
      socket.emit('PUSH_PER', value);
    },
    err => {
      console.log('error');
    }
  );

  updateLights(socket);
  globalSocket = socket;
}

function watchAndEmitStreamLabsFile(
  socket,
  eventConstant = '',
  emitEventConstant,
  jsonParse = false,
  valueTransform = v => v
) {
  emitEventConstant = emitEventConstant ? emitEventConstant : eventConstant;
  watchStreamLabsFile(createTxtFor(eventConstant), value => {
    value = jsonParse ? JSON.parse(value) : value;
    value = valueTransform(value);
    socket.emit(emitEventConstant, value);
  });
}

function createFileErrorCatch(CONSTANT, initialValue = '') {
  return err => {
    if (err.errno === -4058) {
      fs.writeFile(
        `${streamLabelsPath}/${createTxtFor(CONSTANT)}`,
        initialValue,
        () => {}
      );
    }
  };
}
function updateLights(socket) {
  hueApi.lights().then(config => {
    config.lights.map(light => hueApi.getLightStatusWithRGB(light.id));
    socket.emit('LIGHTS', config.lights);
  });
}

function getUserFollows(userId, accessToken) {
  const options = {
    headers: {
      'Client-ID': clientId,
      Authorization: 'OAuth ' + accessToken
    }
  };
  return axios
    .get(`https://api.twitch.tv/helix/users/follows?to_id=${userId}`, options)
    .then(res => {
      const followers = res.data.data;
      return Promise.all(followers.map(getUserById));
    })
    .catch(err => {
      console.log('Followers', err);
    });
}
function getUserById(user) {
  const id = user.from_id;
  const options = {
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': clientId
    }
  };
  return axios
    .get(`https://api.twitch.tv/kraken/users/${id}`, options)
    .then(res => {
      return res.data;
    })
    .catch(res => {
      console.log(res);
    });
}

function createTxtFor(fileName) {
  return fileName + '.txt';
}

function watchStreamLabsFile(fileName, successCb, failCb) {
  getStreamLabsFileContents(fileName)
    .then(successCb)
    .catch(failCb);
  fs.watchFile(
    `${streamLabelsPath}/${fileName}`,
    { persistent: true },
    function(err, items) {
      getStreamLabsFileContents(fileName)
        .then(successCb)
        .catch(failCb);
    }
  );
}
function writeToFile(fileName, message) {
  const streamLabelsPath =
    'C://Users/ATJack/Documents/Work/Stream/StreamLabels';
  fs.writeFile(`${streamLabelsPath}/${fileName}`, message, function(err) {
    if (err) {
      return console.log(err);
    }
  });
}

function readFile(fileName) {
  return new Promise(res => {
    const streamLabelsPath =
      'C://Users/ATJack/Documents/Work/Stream/StreamLabels';
    fs.readFile(`${streamLabelsPath}/${fileName}`, 'utf8', function(
      err,
      content
    ) {
      if (err) {
        createFileErrorCatch(fileName, '');
      }
      res(content);
    });
  });
}
function getStreamLabsFileContents(fileName) {
  const streamLabelsPath =
    'C://Users/ATJack/Documents/Work/Stream/StreamLabels';
  return new Promise((res, rej) => {
    fs.readFile(`${streamLabelsPath}/${fileName}`, function(err, items) {
      if (err) {
        rej(err);
      } else {
        res(items.toString());
      }
    });
  });
}

function createNewAnswers(oldAnswers, { number, username }) {
  const userListFiltered = Object.keys(oldAnswers)
    .map(key => oldAnswers[key])
    .map(userList => {
      if (userList.includes(username)) {
        const list = userList.filter(name => name !== username);
        return list;
      }
      return userList;
    });
  const oldAnswersFiltered = userListFiltered.reduce((all, list, index) => {
    return {
      ...all,
      [index + 1]: list
    };
  }, {});
  const oldList = oldAnswersFiltered[number] ? oldAnswersFiltered[number] : [];
  const answers = {
    ...oldAnswersFiltered,
    [number]: [...oldList, username]
  };
  return answers;
}
module.exports = {
  SocketManager,
  globalSocket
};
