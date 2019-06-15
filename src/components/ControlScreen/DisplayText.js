import React, { useState, useContext } from 'react';
import { Card, Button } from 'react-materialize';
import socketContext from '../../Provider';
import * as Events from '../../Events';

export default function DisplayText() {
  const state = useContext(socketContext);
  const [displayText, setDisplayText] = useState('');

  const updateText = () => {
    if (!state.socket) return;
    state.socket.emit('TEXT_CHANGE', displayText);
  };
  const changeText = displayText => {
    setDisplayText(displayText);
  };
  return (
    <Card textClassName={'white-text'} title={`Displayed Text: ${state.text}`}>
      <textarea onChange={event => changeText(event.target.value)} />
      <Button key='reset' onClick={updateText}>
        Update Text
      </Button>
    </Card>
  );
}
