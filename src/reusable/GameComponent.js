import React, { Component } from 'react';
import Phaser from 'phaser';

class GameComponent extends Component {
  componentDidMount() {
    const { id, width, height, create, preload } = this.props;

    var config = {
      type: Phaser.AUTO,
      parent: id,
      // pixelArt: true,
      width,
      height,
      physics: {
          default: 'arcade',
          arcade: {
              gravity: { y: 200 }
          }
      },
      scene: {
        create,
        preload,
      }
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
