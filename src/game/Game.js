import React, { Component } from 'react';
import GameComponent from '../reusable/GameComponent';

class Game extends Component {
  create() {
    console.log("Game created");
    this.add.image(400, 300, 'sky');

    var particles = this.add.particles('red');

    var emitter = particles.createEmitter({
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD'
    });

    var logo = this.physics.add.image(400, 100, 'logo');

    logo.setVelocity(100, 200);
    logo.setBounce(1, 1);
    logo.setCollideWorldBounds(true);

    emitter.startFollow(logo);
  }

  preload() {
    console.log("Game preload");
    this.load.setBaseURL('http://localhost:3000');

    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser.png');
    this.load.image('red', 'assets/particles/red.png');
  }

  render() {
    return (
      <GameComponent
        id='Game'
        width={800}
        height={600}
        create={this.create}
        preload={this.preload}
      />
    );
  }
};

export default Game;
