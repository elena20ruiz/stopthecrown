
import 'phaser';
import personInformation from '../controller/personInformation';


export default class Airport extends Phaser.Scene {

    constructor() { super('airport') }

    preload() {
        // TODO: Load backgrounds 
        // - Main background
        // - Passport background
        // - Boarding pass background

        this.load.image('bg', 'assets/background.jpg');
    }

    create() { 
        // Set Background
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db");
        this.add.image(window.innerWidth/2, window.innerHeight/5, 'bg');

        // Set left column
        this.leftcolumn = new Phaser.GameObjects.Rectangle(this, window.innerWidth+150,  window.innerHeight/2, window.innerWidth, window.innerHeight, 0xA1A1A1, 0.8);
        this.add.existing(this.leftcolumn);

        // Set passport card with the information
        this.passport = new Phaser.GameObjects.Rectangle(this, window.innerWidth/1.25, window.innerHeight-500, window.innerWidth/3, window.innerHeight-300, 0xFFFFFF);
        this.add.existing(this.passport);

        // Set the boarding card with the information



        // Set the rules

        // Init punctuation
        // Add person and documents info
        var person = undefined;
        person =  personInformation.nextPerson([]);
        console.log(person);

    }// create

    update() {

        // Check click

        // Check if fail or not -> 
        // If fails -> go to the other scene

        // If pass -> next person
    }
}