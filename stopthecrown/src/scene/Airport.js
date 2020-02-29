
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
        // TODO: Append backgrounds

        let people_passed = 0;
        let people_quarantained = 0;

        this.quarantine_text = this.add.text(100, 200, 'hi');
        this.pass_text = this.add.text(100,300, 'bye')
    
        this.quarantine = new Phaser.GameObjects.Text(this, 100, 100, 'Quarantine', { fill: '#f00'});
        this.pass = new Phaser.GameObjects.Text(this, 200, 100, 'Pass', { fill: '#0f0'});

        this.add.existing(this.pass);
        this.add.existing(this.quarantine);

        this.quarantine
          .setInteractive({ useHandCursor: true })
          .on('pointerover', () => this.enterButtonHoverState(this.quarantine) )
          .on('pointerout', () => this.enterButtonRestState(this.quarantine, '#f00') )
          .on('pointerdown', () => this.enterButtonActiveState(this.quarantine) )
          .on('pointerup', () => {
            this.updateClickCountText(++people_quarantained, this.quarantine_text, 'Quarantained');
            this.enterButtonHoverState(this.quarantine);
        });
    
        this.pass
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.enterButtonHoverState(this.pass) )
        .on('pointerout', () => this.enterButtonRestState(this.pass, '#0f0') )
        .on('pointerdown', () => this.enterButtonActiveState(this.pass) )
        .on('pointerup', () => {
            this.updateClickCountText(++people_passed, this.pass_text, 'Pass');
            this.enterButtonHoverState(this.pass);
        });
  
        this.updateClickCountText(people_passed, this.pass_text, 'Pass');
        this.updateClickCountText(people_quarantained, this.quarantine_text, 'Quarantained');

        // Init score
        let score = 0;

        // Add person and documents info
        var person = undefined;
        person =  personInformation.nextPerson([]);
        console.log(person);
        // console.log(personInformation.nextPerson())

    }// create

    update() {


        // Check click

        // Check if fail or not -> 
        // If fails -> go to the other scene

        // If pass -> next person
    }


    updateClickCountText(clickCount, textItem, test) {
        textItem.setText(test + ` ${clickCount}`);
    }

    enterButtonHoverState(button) {
        button.setStyle({ fill: '#ff0'});
    }

    enterButtonRestState(button, color) {
        button.setStyle({ fill: color});
    }

    enterButtonActiveState(button) {
        button.setStyle({ fill: '#0ff' });
    }
    
}