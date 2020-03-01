
import 'phaser';
import PersonalInformation from '../controller/personInformation';

export default class Final extends Phaser.Scene {

    constructor () {
        super('final')
    }

    preload() {
        this.load.image('corona', 'assets/coronavirus.jpg');
    }

    create() {
        // Set Background
        this.add.image(window.innerWidth/2, window.innerHeight/5, 'corona');
    }

    update () {
    }
}