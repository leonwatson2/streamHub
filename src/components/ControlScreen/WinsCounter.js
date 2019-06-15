import React, { useContext } from 'react';
import { Card, Button } from 'react-materialize';
import socketContext from '../../Provider';
import * as Events from '../../Events';

export default function WinsCounter() {
  const state = useContext(socketContext);
  const resetWins = () => {
    if (!state.socket) return;
    state.socket.emit(Events.RESET_WINS);
  };
  const incrementWins = (increment = true) => {
    return () => {
      if (!state.socket) return;
      if (increment) state.socket.emit(Events.INCREMENT_WINS, +state.wins + 1);
      else state.socket.emit(Events.INCREMENT_WINS, +state.wins - 1);
    };
  };
  return (
    <Card
      textClassName={'white-text'}
      title={`Current Wins: ${state.wins}`}
      actions={[
        <Button key='reset' onClick={resetWins}>
          Reset Wins
        </Button>,
        <Button
          key='increment'
          onClick={incrementWins(true)}
          floating
          large
          waves='light'
          icon='add'
        />,
        <Button
          key='decrement'
          onClick={incrementWins(false)}
          floating
          large
          waves='light'
          icon='exposure_neg_1'
        />
      ]}
    />
  );
}
