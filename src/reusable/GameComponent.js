import React, { Component } from 'react';
import Phaser from 'phaser';

class GameComponent extends Component {
  componentDidMount() {
    const { id, width, height, scene } = this.props;

    var config = {
      type: Phaser.AUTO,
      parent: id,
      backgroundColor: '#244d2f',
      // pixelArt: true,
      width,
      height,
      scene,
      physics: {
        default: 'impact',
        impact: {
          gravity: 100,
          debug: false,
        }
      },
    };

    this.game = new Phaser.Game(config);
  }

  render() {
    return (
      <div id={this.props.id} />
    );
  }
};

export default GameComponent;
