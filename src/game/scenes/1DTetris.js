import Phaser from 'phaser';

const kBlockSize = 32;
const kTextSize = 16;

const kInitialX = 400;
const kInitialY = 80;
const kWidth = kBlockSize * 8;
const kHeight = kBlockSize * 16;

const kMaxBlocks = 50;
const kImages = [
  'bnet', 'protoss', 'sc2', 'terran', 'zerg',
];

class _1DTetris extends Phaser.Scene {
  constructor() {
    super({key: '1DTetris' });

    this.blocks = [];
    this.currentBlock = null;
    this.score = 0;
    this.collisionsSoFar = 0;
    this.gameOver = false;

    this.checkCollisions = this.checkCollisions.bind(this);
    this.restart = this.restart.bind(this);
  }

  preload() {
    this.load.setBaseURL(window.location.origin);

    kImages.forEach(img => this.load.image(img, `assets/rectangles/${img}.png`));
  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();

    this.add.text(64, kTextSize * 2, 'Falling Pieces \\o/, to test keyboard input, pause and physics.\nLet 50 pieces drop or run out of space in the top to finish the game.',
                 { font: `${kTextSize}px Monospace`, fill: '#fff' });

    this.textPieces = this.add.text(64, kTextSize * 5, `Pieces: 0/${kMaxBlocks}`,
                                    { font: `${kTextSize}px Monospace`, fill: '#aaf' });

    this.textScore = this.add.text(64, kTextSize * 6, `Score: 0 points`,
                                   { font: `${kTextSize}px Monospace`, fill: '#aaf' });

    this.add.text(64, kTextSize * 8, 'Controls:\n P: Pause\n R: Restart\n Keyboard arrows moves block',
                  { font: `${kTextSize}px Monospace`, fill: '#dfd' });

    this.input.keyboard.on('keydown_P', () => {
      if (this.gameOver) {
        return;
      }
      this.scene.pause();
      this.scene.launch('Pause');
    });

    this.input.keyboard.on('keydown_R', () => {
      this.restart();
    });

    this.add.graphics()
      .fillStyle(0x7e8d8f, 1)
      .fillRect(kInitialX, kInitialY, kWidth, kHeight);

    this.impact.world.setBounds(kInitialX, kInitialY, kWidth, kHeight, 1);

    this.addRect();
  }

  update() {
    if (this.currentBlock === null) {
      return;
    }

    if (this.currentBlock.y >= kInitialX + kHeight + kBlockSize / 2) {
      this.currentBlock = null;
      return;
    }

    const velocity = this.cursors.down.isDown ? 300 : 100;
    this.currentBlock.setMaxVelocity(velocity).setVelocity(0, velocity);

    if (this.cursors.left.isDown) {
      this.currentBlock.setVelocityX(-100);
    } else if (this.cursors.right.isDown) {
      this.currentBlock.setVelocityX(100);
    }
  }

  addRect() {
    const img = kImages[Phaser.Math.Between(0, kImages.length-1)];

    this.currentBlock = this.impact.add.image(500, 100, img)
      .setActiveCollision()
      .setBounce(0.5)
      .setFriction(100, 40)
      .setCollideCallback(this.collide, this)
      .setMaxVelocity(100)
      .setVelocity(0, 100);

    this.currentBlock.counter = 0;
    this.blocks.push(this.currentBlock);

    this.textPieces.text = `Pieces: ${this.blocks.length}/${kMaxBlocks}`;
  }

  collide(bodyA, bodyB) {
    ++this.collisionsSoFar;

    if (this.blocks.length === kMaxBlocks)
    {
      this.currentBlock = null;
      setTimeout(this.checkCollisions, 2000);
    }
    else if (bodyA.pos.y <= 100)
    {
      this.currentBlock = null;
      this.checkCollisions();
    }
    else if (this.blocks.length < kMaxBlocks)
    {
      this.addRect();
    }

    bodyA.gameObject.setCollideCallback(null);
    bodyA.gameObject.setCollideCallback(null);

    this.score += bodyB.gameObject ? 1 : 5;
    this.textScore.text = `Score: ${this.score} points`;
  }

  checkCollisions() {
    if (this.collisionsSoFar !== 0) {
      this.collisionsSoFar = 0;
      setTimeout(this.checkCollisions, 1000);
      return;
    }

    this.gameOver = true;
    this.add.text(225, 280, 'Game Over',
                  { font: `96px Monospace`, fill: '#fff' });

    this.blocks.forEach(block =>
      block
        .setCollideCallback(null)
        .setBounce(0)
        .setVelocity(0, 0)
        .setFixedCollision());
  }

  restart() {
    this.blocks = [];
    this.currentBlock = null;
    this.score = 0;
    this.collisionsSoFar = 0;
    this.gameOver = false;
    this.scene.restart();
  }
};

export default _1DTetris;
