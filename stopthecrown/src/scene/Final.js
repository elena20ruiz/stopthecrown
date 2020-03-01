
import 'phaser';

export default class Final extends Phaser.Scene {

    constructor () {
        super('final')
    }

    preload() {
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        this.load.audio('lose', 'assets/music/lose.mp3');
        this.load.image('corona', 'assets/back-fail.png');
        this.load.image('virus', 'assets/virus.png');
        this.load.image('banner', 'assets/banner.png');
        this.load.image('restart', 'assets/restart.png');
    }

    create() {
        
        let lose = this.sound.add('lose', { mute: false, volume: 1.5, rate: 1, detune: 0, seek: 0, loop: false, delay: 0 });
        lose.play();

        // Set Background
        this.add.image(window.innerWidth/2, window.innerHeight/2, 'corona');
        

        this.finalMessageLose = new Phaser.GameObjects.Text(this, window.innerWidth/5, window.innerHeight/8, 'ALL YOUR CITY HAS BEEN INFECTED 😷', {font:"60px Open Sans", fontStyle: "bold", fill: '#000000'});
        this.add.existing(this.finalMessageLose);

        this.add.image(window.innerWidth/1.4, window.innerHeight/1.1, 'restart').setScale(0.8);
        this.restartButton = new Phaser.GameObjects.Text(this, window.innerWidth/1.4 - 25, window.innerHeight/1.1 - 30, 'Restart', {font:"40px Open Sans",  fill: '#000000', fontSize: '40px', fontStyle: 'bold'});
        this.add.existing(this.restartButton);

        this.restartButton
          .setInteractive({ useHandCursor: true })
          .on('pointerover', () => this.enterButtonHoverState(this.restartButton) )
          .on('pointerout', () => this.enterButtonRestState(this.restartButton, '#000') )
          .on('pointerdown', () => this.enterButtonActiveState(this.restartButton) )
          .on('pointerup', () => {
            location.reload();
        });

        this.add.image(window.innerWidth/1.8, window.innerHeight/1.8, 'banner');
        this.add.image(window.innerWidth/3, window.innerHeight/1.8, 'virus').setScale(.7); 
        this.advice1 = new Phaser.GameObjects.Text(this, window.innerWidth/2.1, window.innerHeight/2.5, 'Remember to:', {  font:"40px Open Sans", fill: '#000000', fontStyle: 'bold'});
        this.add.existing(this.advice1);
        this.advice2 = new Phaser.GameObjects.Text(this, window.innerWidth/2.1, window.innerHeight/2, 'Clean your hands usually', {  font:"30px Open Sans", fill: '#000000',  fontStyle: 'bold'});
        this.add.existing(this.advice2);
        this.advice3 = new Phaser.GameObjects.Text(this, window.innerWidth/2.1, window.innerHeight/1.8, 'Avoid physicall contact', {  font:"30px Open Sans", fill: '#000000', fontStyle: 'bold'});
        this.add.existing(this.advice3);
        this.advice4 = new Phaser.GameObjects.Text(this, window.innerWidth/2.1, window.innerHeight/1.6, 'If you feel sick, stay home', { font:"30px Open Sans", fill: '#000000', fontStyle: 'bold'});
        this.add.existing(this.advice4);

        this.meme = new Phaser.GameObjects.Text(this, window.innerWidth/12, window.innerHeight/1.1, 'VAMOS A MORIR TODOS', { fill: '#000000', fontSize: '30px'});
        this.add.existing(this.meme);
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