import React, { useState, useEffect } from 'react';
import Particles from 'react-particles-js';

export default function ParticlesScreen({ socket }) {
  let [number, setNumber] = useState(100);
  let [color, setColor] = useState('#509FFF');
  let [direction, setDirection] = useState('bottom');
  const particleParams = {
    particles: {
      number: {
        value: number
      },
      line_linked: {
        color,
        width: 3
      },
      size: {
        value: 1
      },
      move: {
        enable: true,
        speed: 5,
        direction: direction,
        out_mode: 'bounce',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    }
  };

  return <Particles params={particleParams} />;
}
