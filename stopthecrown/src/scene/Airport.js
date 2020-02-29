
import 'phaser';
import personInformation from '../controller/personInformation';


export default class Airport extends Phaser.Scene {

    constructor() { super('airport') }

    preload() {
        // TODO: Load backgrounds 
        // - Main background
        // - Passport background
        // - Boarding pass background

        this.load.image('logo', 'assets/background.jpg');
    }

    create() {

        // TODO: Append backgrounds
        var logo = this.add.image(400, 150, 'logo');

        // Init punctuation
        // Add person and documents info
        console.log(personInformation.nextPerson())

    }// create

    update() {

        // Check click

        // Check if fail or not -> 
        // If fails -> go to the other scene

        // If pass -> next person
    }
}