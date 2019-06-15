import React, { useContext } from 'react';
import styled from 'styled-components';
import socketContext from '../../Provider';

const StyledKanjiAnswers = styled.div`
  color: white;
  font-size: ${props => (props.small ? '1.5rem' : '4rem')};
  text-align: ${props => (props.small ? 'left' : 'right')};
  margin-bottom: 10px;
  background: ${props =>
    props.small
      ? 'transparent'
      : 'linear-gradient(to right, transparent 40%, black)'};
  padding-right: 25px;
`;

const StyledSubScript = styled.span`
  color: rgba(255, 255, 255, 0.8);
  font-size: ${props => (props.small ? '.5rem' : '4rem')};
  animation: fade-in 2s 0.5s ease-out forwards;
`;

const StyledInstructions = styled(StyledKanjiAnswers)`
  display: ${props => (props.small ? 'none' : 'block')};

  font-size: 2.5rem;
  opacity: 0.6;
`;
const KanjiAnswers = props => {
  const state = useContext(socketContext);
  const getAnswerCount = index => {
    if (state.answerCounts[index + 1] && state.answerCounts[index + 1].length) {
      return `(${state.answerCounts[index + 1].length})`;
    }
    return '';
  };
  if (state.currentKanji && state.currentKanji.answerCards) {
    return [
      ...state.currentKanji.answerCards.map((card, i) => {
        return (
          <StyledKanjiAnswers
            key={i}
            className='fade-in'
            small={props.controlScreen}
          >
            {i + 1})
            <StyledSubScript small={props.controlScreen}>
              {getAnswerCount(i)}
            </StyledSubScript>
            {card.english}
          </StyledKanjiAnswers>
        );
      }),
      <StyledInstructions
        key={'instructions'}
        className='fade-in'
        small={props.controlScreen}
      >
        <em>
          Guess translation:
          <br /> !kanji 'number'
        </em>
      </StyledInstructions>
    ];
  }
  return 'Nothing';
};

export default KanjiAnswers;
