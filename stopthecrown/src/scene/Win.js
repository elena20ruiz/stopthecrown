
import 'phaser';

export default class Win extends Phaser.Scene {

    constructor () {
        super('win')
    }

    preload() {
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        this.load.audio('lose', 'assets/music/lose.mp3');
        this.load.image('crown', 'assets/crown.png');
        this.load.image('hand', 'assets/hand.png');
        this.load.image('back', 'assets/back-win.png');
        this.load.image('banner', 'assets/banner.png');
    }

    create() {
        
        let lose = this.sound.add('lose', { mute: false, volume: 1.5, rate: 1, detune: 0, seek: 0, loop: false, delay: 0 });
        lose.play();

        // Set Background
        this.add.image(window.innerWidth/2, window.innerHeight/2, 'back');
        

        this.finalMessageLose = new Phaser.GameObjects.Text(this, window.innerWidth/5, window.innerHeight/8, 'CONGRATS! YOU STOP THE CROWN', {font:"60px Open Sans", fontStyle: "bold", fill: '#000000'});
        this.add.existing(this.finalMessageLose);

        this.add.image(window.innerWidth/2.3, window.innerHeight/1.8, 'banner').setScale(1.2);
        this.add.image(window.innerWidth/2.6, window.innerHeight/1.8, 'crown').setScale(.35); 
        this.add.image(window.innerWidth/2, window.innerHeight/1.8, 'hand').setScale(.7);
    }

    update () {
    }
}