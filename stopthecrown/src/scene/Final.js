
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
    }

    create() {
        
        let lose = this.sound.add('lose', { mute: false, volume: 1.5, rate: 1, detune: 0, seek: 0, loop: false, delay: 0 });
        lose.play();

        // Set Background
        this.add.image(window.innerWidth/2, window.innerHeight/2, 'corona');
        

        this.finalMessageLose = new Phaser.GameObjects.Text(this, window.innerWidth/5, window.innerHeight/8, 'ALL YOUR CITY HAS BEEN INFECTED 😷', {font:"60px Open Sans", fontStyle: "bold", fill: '#000000'});
        this.add.existing(this.finalMessageLose);

        
        this.add.image(window.innerWidth/1.8, window.innerHeight/1.8, 'banner');
        this.add.image(window.innerWidth/3, window.innerHeight/1.8, 'virus').setScale(.7); 
        this.advice1 = new Phaser.GameObjects.Text(this, window.innerWidth/2.1, window.innerHeight/2.5, 'Remember to:', {  font:"40px Open Sans", fill: '#000000', fontStyle: 'bold'});
        this.add.existing(this.advice1);
        this.advice2 = new Phaser.GameObjects.Text(this, window.innerWidth/2.1, window.innerHeight/2, 'Clean your hands usually', {  font:"30px Open Sans", fill: '#000000',  fontStyle: 'bold'});
        this.add.existing(this.advice2);
        this.advice3 = new Phaser.GameObjects.Text(this, window.innerWidth/2.1, window.innerHeight/1.8, 'Avoid physicall contact', {  font:"30px Open Sans", fill: '#000000', fontStyle: 'bold'});
        this.add.existing(this.advice3);

        this.meme = new Phaser.GameObjects.Text(this, window.innerWidth/1.4, window.innerHeight/1.1, 'VAMOS A MORIR TODOS', { fill: '#000000', fontSize: '30px'});
        this.add.existing(this.meme);
    }

    update () {
    }
}