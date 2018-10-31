import React from 'react';
import GameComponent from '../reusable/GameComponent';
import { _1DTetris, Pause, TextClick } from './scenes';

const Game = () => {
  const width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth;

  const height = window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight;

  // const scenes = [ _1DTetris, Pause ];
  const scenes = [ TextClick, _1DTetris, Pause ];

  return (
    <GameComponent
      id='Game'
      width={width}
      height={height-5} // FIXME
      scene={scenes}
    />
  );
};

export default Game;
