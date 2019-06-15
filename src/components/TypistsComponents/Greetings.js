import React, { useState, useEffect, useContext, useCallback } from 'react';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';
import Events from '../../Events';
import SocketContext from '../../Provider';

const words = ['Hey', 'The Stream is Starting', "Say what's up"];
const types = {
  0: <Typist.Delay ms={3000} />,
  1: words[0],
  2: <Typist.Delay ms={1500} />,
  3: <Typist.Backspace count={words[0].length} />,
  4: words[1],
  5: <Typist.Delay ms={3000} />,
  6: <Typist.Backspace count={words[1].length} />,
  7: words[2],
  8: <Typist.Delay ms={5000} />,
  9: <Typist.Backspace count={words[2].length} />
};

export default function Greetings({ socket }) {
  const [usersThatSaidSomething, setUsers] = useState([]);
  const [currentTypist, setTypist] = useState(null);
  const [typistFinised, setFinished] = useState(false);
  const state = useContext(SocketContext);
  const updateUsers = username => {
    const newUsers = usersThatSaidSomething.concat(username);
    console.log(newUsers);
    console.log(username);
    setUsers(newUsers);
  };
  useEffect(() => {
    if (!state.socket) return;
    state.socket.on(Events.FIRST_CHAT, ({ username }) => {
      console.log('event');
      updateUsers(username);
    });
  }, [state.socket]);

  useEffect(() => {
    console.log(usersThatSaidSomething);
    setTypist('');
    Promise.resolve(null).then(() => {
      setTypist(initTypist(null, usersThatSaidSomething));
    });
    setFinished(false);
  }, [typistFinised]);

  const updateFinished = useCallback(() => {
    console.log('called');
    setFinished(true);
  }, []);
  function initTypist(c, usersThatSaid) {
    const cursor = {
      show: true,
      blink: true,
      element: c ? c : '❤',
      hideWhenDone: false,
      hideWhenDoneDelay: 1000
    };

    const users = usersThatSaid.reduce((all, username) => {
      const greeting = `Hey ${username}`;
      return [
        ...all,
        greeting,
        <Typist.Delay ms={3000} />,
        <Typist.Backspace count={greeting.length} />
      ];
    }, []);
    return (
      <Typist
        cursor={cursor}
        onTypingDone={updateFinished}
        className='intro-greeting'
      >
        {[...Object.keys(types).map(c => types[c]), ...users]}
        <Typist.Delay ms={3000} />
      </Typist>
    );
  }
  return <div>{currentTypist}</div>;
}
