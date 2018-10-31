import Phaser from 'phaser';

class Pause extends Phaser.Scene {
  constructor() {
    super({key: 'Pause' });
  }

  create() {
    this.input.keyboard.once('keydown_P', () => {
      this.scene.stop();
      this.scene.resume('1DTetris');
    }, this);

    this.text = this.add.text(225, 280, 'Game Paused',
                              { font: `96px Monospace`, fill: '#fff' });

    this.timeCounter = 0;
  }

  update() {
    if (++this.timeCounter === 60) {
        this.timeCounter = 0;
        this.text.visible = !this.text.visible;
    }
  }
};

export default Pause;
