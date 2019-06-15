import React, { useContext } from 'react';
import styled from 'styled-components';
import socketContext from '../../Provider';

const StyledKanji = styled.div`
  color: white;
  font-size: ${props => (props.small ? '4rem' : '10rem')};
`;

const CurrentKanji = props => {
  const state = useContext(socketContext);
  if (state.currentKanji && state.currentKanji.currentCard)
    return (
      <StyledKanji className='fade-in' small={props.controlScreen}>
        {state.currentKanji.currentCard.kanji}
      </StyledKanji>
    );
  return 'NOthing';
};

export default CurrentKanji;
