
import 'phaser';

export default class Win extends Phaser.Scene {

    constructor () {
        super('win')
    }

    preload() {
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        this.load.audio('win', 'assets/music/winning.wav');
        this.load.image('crown', 'assets/crown.png');
        this.load.image('hand', 'assets/hand.png');
        this.load.image('back', 'assets/back-win.png');
        this.load.image('banner', 'assets/banner.png');
    }

    create() {
        
        let win = this.sound.add('win', { mute: false, volume: 1.5, rate: 1, detune: 0, seek: 0, loop: false, delay: 0 });
        win.play();

        // Set Background
        this.add.image(window.innerWidth/2, window.innerHeight/2, 'back');
        
        this.restartButton = new Phaser.GameObjects.Text(this, window.innerWidth/12,  window.innerHeight/4, 'RESTART', { fill: '#000000', fontSize: '40px', fontStyle: 'bold'});
        this.add.existing(this.restartButton);

        this.restartButton
          .setInteractive({ useHandCursor: true })
          .on('pointerover', () => this.enterButtonHoverState(this.restartButton) )
          .on('pointerout', () => this.enterButtonRestState(this.restartButton, '#000') )
          .on('pointerdown', () => this.enterButtonActiveState(this.restartButton) )
          .on('pointerup', () => {
            location.reload();
        });

        this.finalMessageLose = new Phaser.GameObjects.Text(this, window.innerWidth/5, window.innerHeight/8, 'CONGRATS! YOU STOP THE CROWN', {font:"60px Open Sans", fontStyle: "bold", fill: '#000000'});
        this.add.existing(this.finalMessageLose);

        this.add.image(window.innerWidth/2.3, window.innerHeight/1.8, 'banner').setScale(1.2);
        this.add.image(window.innerWidth/2.6, window.innerHeight/1.8, 'crown').setScale(.35); 
        this.add.image(window.innerWidth/2, window.innerHeight/1.8, 'hand').setScale(.7);
    }

    update () {
    }

    enterButtonHoverState(button) {
        button.setStyle({ fill: '#fff'});
    }

    enterButtonRestState(button, color) {
        button.setStyle({ fill: color});
    }

    enterButtonActiveState(button) {
        button.setStyle({ fill: '#0ff' });
    }
}