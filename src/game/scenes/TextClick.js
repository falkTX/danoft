import Phaser from 'phaser';

const kTargetClicks = 50;
const kTextSize = 64;

class TextClick extends Phaser.Scene {
  constructor() {
    super({key: 'TextClick' });

    this.clickedTimes = 0;
    this.timeoutFn = this.timeoutFn.bind(this);
  }

  create() {
    const koreanChars = [
        'ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅿ','ㅇ','ㆁ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ','ㆆ',
    ];

    this.add.text(64, kTextSize / 2, `Clicking text "game".\nClick randomly with the mouse ${kTargetClicks} times to win the game! :P\nPS: I know this part is boring, I made this as a test first, but left it here.\nThe real deal comes after this.`,
                 { font: `${kTextSize / 4}px Monospace`, fill: '#fff' });

    this.textScore = this.add.text(64, kTextSize * 7 / 4, `Score 0/${kTargetClicks}`,
                                   { font: `${kTextSize / 4}px Monospace`, fill: '#aaf' });

    this.input.on('pointerdown', (p) => {
      if (this.clickedTimes >= kTargetClicks) {
        return;
      }

      const char = koreanChars[Phaser.Math.Between(0, koreanChars.length-1)];
      this.add.text(p.x - kTextSize / 2, p.y - kTextSize / 2, char,
                    { font: `${kTextSize}px Monospace`, fill: '#0f0' });

      this.textScore.text = `Score ${++this.clickedTimes}/${kTargetClicks}`;

      if (this.clickedTimes === kTargetClicks) {
        this.timeoutFn();
      }
    });
  }

  timeoutFn() {
    const diff = (this.clickedTimes++) - kTargetClicks;
    const textWinnerContent = `You win! Starting next game in ${5 - diff}...`;

    switch (diff)
    {
    case 0:
      this.textWinner = this.add.text(64, kTextSize * 2, textWinnerContent, { font: `${kTextSize / 2}px Monospace`, fill: '#fff' });
      break;
    default:
      this.textWinner.text = textWinnerContent;
      break;
    case 5:
      this.scene.start('1DTetris');
      return;
    }

    setTimeout(this.timeoutFn, 1000);
  }
};

export default TextClick;
