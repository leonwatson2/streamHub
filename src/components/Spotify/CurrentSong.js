import React, { useState, useEffect, useContext } from 'react';
import { NEW_SONG } from '../../Events';
import socketContext from '../../Provider';

export default function CurrentSong() {
  const [song, setSong] = useState();
  const state = useContext(socketContext);

  useEffect(() => {
    if (state.socket) initSocket(state.socket);
  }, [state.socket]);

  const initSocket = socket => {
    socket.on(NEW_SONG, song => {
      setSong(song);
    });
  };
  return (
    <h4 style={{ color: 'black' }}>
      <i className='material-icons'>music_note</i>
      {song}
    </h4>
  );
}
