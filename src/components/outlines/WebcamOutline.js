import React from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';
import { theme } from '../../styled-components';

const GlobalBackground = createGlobalStyle`
    body {
        background: rgba(0,0,0,0) !important;
    }
`;
const makeGradient = (colors, direction, type = 'linear') => {
  return `linear-gradient(${direction}, ${colors.join(',')})`;
};
const GradientMove = keyframes`
    0% {
        background-position: 0% 0%; 
    }
    50% {
        background-position: 100% 100%; 
    }
    100% {
        background-position: 0% 0%; 
    }
`;
const Box = styled.div`
  width: 293px;
  height: 159px;
  box-sizing: content-box;
  background: ${(props = { theme: theme(true) }) =>
    makeGradient([props.theme.main, props.theme.secondary], '-45deg')};
  background-size: 300%;
  animation: 5s ${GradientMove} ease-in-out infinite;
  transition: 2s;
`;
const Logo = styled.div`
  transition: 2s;
  box-sizing: content-box;
  font-family: 'Asap';
  width: 100px;
  text-align: center;
  padding: 5px 15px;
  height: 25px;
  background: ${(props = { theme: theme(true) }) =>
    makeGradient([props.theme.main, props.theme.secondary], 'to top')};
  color: white;
  line-height: 25px;
  font-size: 25px;
  position: absolute;
  bottom: -${25 + 15}px;
  left: ${283 - 100 + -30}px;
  border: solid 5px ${(props = { theme: theme(true) }) => props.theme.main};
  border-image-source: ${(props = { theme: theme(true) }) =>
    makeGradient(
      [`${props.theme.main} 30%`, props.theme.secondary, props.theme.main],
      '-45deg'
    )};
  border-image-slice: 1;
`;
export default function WebcamOutline() {
  return (
    <div style={{ position: 'relative' }}>
      <GlobalBackground />
      <Box />
      <Logo>LFurLeon</Logo>
    </div>
  );
}
