import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Typist from 'react-typist';
import 'react-typist/dist/Typist.css';

const falling = keyframes`
    60%,
    100% {
      transform: rotate(-40deg) translate3d(-560px, 0, 0);
      opacity: 0.5;
      width: 0;
    }
  }
`;
const Star = styled.div`
  width: 3px;
  height: 3px;
  position: absolute;
  background: #fff;
  transform: rotate(45deg);
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  z-index: 0;
`;
const FallingStar = styled.div`
  z-index: 9;
  width: 190px;
  height: 2px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 1) 33%,
    rgba(255, 255, 255, 0) 100%
  );
  position: absolute;
  border-radius: 50%;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-name: ${falling};
  animation-timing-function: cubic-bezier(0.33, 0.19, 0.26, 1.3);
  top: -70px;
  transform: rotate(-45deg) translate3d(0, 0, 0);
  will-change: transform, width, opacity;
  left: ${props => props.left}%;
  animation-delay: ${props => props.delay}s;
  animation-duration: ${props => props.duration}s;
`;
const Stars = Array.from(new Array(190)).map((s, i) => (
  <Star key={i} left={rand(10, 100)} top={rand(0, 100)} />
));
const FallingStars = Array.from(new Array(4)).map((s, i) => (
  <FallingStar left={rand(10, 100)} delay={rand(1, 30)} duration={rand(1, 4)} />
));
export default function NightScene() {
  const [lastwords, setL] = useState('#hardestpart ');

  const [currentTypist, setTypist] = useState(initTypist());

  function initTypist(c) {
    const cursor = {
      show: true,
      blink: true,
      element: c ? c : '❤',
      hideWhenDone: false,
      hideWhenDoneDelay: 1000
    };
    const types = {
      0: <Typist.Delay ms={3000} />,
      1: 'Good Night',
      2: <Typist.Delay ms={3000} />,
      3: <Typist.Backspace count={10} />,
      4: 'おやすみなさい',
      5: <Typist.Delay ms={3000} />,
      6: <Typist.Backspace count={10} />,
      7: lastwords,
      8: <Typist.Delay ms={10000} />,
      9: <Typist.Backspace count={lastwords.length} />
    };
    return (
      <Typist
        cursor={cursor}
        onTypingDone={() => {
          setTimeout(() => {
            const nT = initTypist();
            setTypist('');
            setTypist(nT);
          }, 5000);
        }}
        className='good-night'
      >
        {Object.values(types).map(c => c)}
      </Typist>
    );
  }

  return (
    <div className='night-container'>
      {currentTypist}
      <div className='moon'>
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className='mountain'>
        <span />
        <span />
        <span />
      </div>
      <div className='mountain-right'>
        <div className='mountain'>
          <span />
          <span />
          <span />
        </div>
      </div>
      <div className='mountain-small'>
        <div className='mountain'>
          <span> </span>
          <span> </span>
          <span> </span>
        </div>
      </div>
      <div className='path' />
      <div className='weak-light' />
      <div className='weak' />
      <div className='bottom'>
        <div className='tree'>
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='body' />
        </div>
        <div className='tree'>
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='body' />
        </div>
        <div className='tree'>
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='body' />
        </div>
        <div className='tree'>
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='body' />
        </div>
        <div className='tree'>
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='body' />
        </div>
        <div className='tree'>
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='body' />
        </div>
        <div className='tree'>
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='body' />
        </div>
        <div className='tree'>
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='body' />
        </div>
        <div className='tree'>
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='body' />
        </div>
        <div className='tree'>
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='body' />
        </div>
        <div className='tree'>
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='body' />
        </div>
        <div className='tree'>
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='body' />
        </div>
        <div className='tree'>
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='body' />
        </div>
        <div className='tree'>
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='body' />
        </div>
        <div className='tree'>
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='bough' />
          <div className='body' />
        </div>
      </div>
      <div className='path-detail-left' />
      <div className='stars'>{Stars}</div>
      {FallingStars}
    </div>
  );
}
function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
