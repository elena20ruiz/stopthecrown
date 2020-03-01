
import 'phaser';
import PersonalInformation from '../controller/personInformation';

export default class Final extends Phaser.Scene {

    constructor () {
        super('final')
    }

    preload() {
        this.load.image('corona', 'assets/coronavirus.jpg');
        this.load.audio('lose', 'assets/music/lose.mp3');
    }

    create() {
        
        let lose = this.sound.add('lose-sound', { mute: false, volume: 1.5, rate: 1, detune: 0, seek: 0, loop: false, delay: 0 });
        lose.play();

        // Set Background
        this.add.image(window.innerWidth/2, window.innerHeight/5, 'corona');

        this.finalMessageLose = new Phaser.GameObjects.Text(this, window.innerWidth/8, window.innerHeight/7, 'ALL YOUR CITY HAS BEEN INFECTED 😷', { fill: '#000000', fontSize: '60px', fontStyle: 'bold'});
        this.add.existing(this.finalMessageLose);

        this.add.circle(window.innerWidth/2, window.innerHeight/1.8, 200, 0xB08C8C);  
        this.advice1 = new Phaser.GameObjects.Text(this, window.innerWidth/2.3, window.innerHeight/2.5, 'Remember to:', { fill: '#000000', fontSize: '30px', fontStyle: 'bold'});
        this.add.existing(this.advice1);
        this.advice2 = new Phaser.GameObjects.Text(this, window.innerWidth/2.5, window.innerHeight/2, 'Clean your hands usually', { fill: '#000000', fontSize: '20px', fontStyle: 'bold'});
        this.add.existing(this.advice2);
        this.advice3 = new Phaser.GameObjects.Text(this, window.innerWidth/2.5, window.innerHeight/1.8, 'Avoid physicall contact', { fill: '#000000', fontSize: '20px', fontStyle: 'bold'});
        this.add.existing(this.advice3);

        this.meme = new Phaser.GameObjects.Text(this, window.innerWidth/1.4, window.innerHeight/1.1, 'VAMOS A MORIR TODOS', { fill: '#000000', fontSize: '30px'});
        this.add.existing(this.meme);
    }

    update () {
    }
}