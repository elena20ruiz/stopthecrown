
import 'phaser';
import personInformation from '../controller/personInformation';


export default class Airport extends Phaser.Scene {

    constructor() { super('airport') }

    preload() {
        // TODO: Load backgrounds 
        // - Main background
        // - Passport background
        // - Boarding pass background

        this.load.image('logo', 'assets/logo.png');
    }

    create() {

        // TODO: Append backgrounds
        let score = 0;
        let people_passed = 0;
        let people_quarantained = 0;

        this.quarantine_text = this.add.text(100, 200, 'hi');
        this.pass_text = this.add.text(100,300, 'bye');
        this.score_text = this.add.text(400,400, '0');
    
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
            console.log(person);

            if (person.coronavirus == false) {
                score -= 10;
                if (score < 0){
                    this.scene.start('final');
                }
            } 
            else {
                score += 10;
                console.log('updated score');
            }

            this.score_text.setText(score);
            person =  personInformation.nextPerson([]);
            console.log(person);
            console.log(person.coronavirus);

        });
    
        this.pass
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.enterButtonHoverState(this.pass) )
        .on('pointerout', () => this.enterButtonRestState(this.pass, '#0f0') )
        .on('pointerdown', () => this.enterButtonActiveState(this.pass) )
        .on('pointerup', () => {
            this.updateClickCountText(++people_passed, this.pass_text, 'Pass');
            this.enterButtonHoverState(this.pass);
            
            if (person.coronavirus === true) {
                this.scene.start('final');
            } else {
                score += 10;
                console.log('updated score');
            }
            
            this.score_text.setText(score);
            person = personInformation.nextPerson([]);
            console.log(person);
            console.log(person.coronavirus);

        }, this);
  
        this.updateClickCountText(people_passed, this.pass_text, 'Pass');
        this.updateClickCountText(people_quarantained, this.quarantine_text, 'Quarantained');
    
        console.log(score);

        // Add person and documents info
        var person = undefined;
        person =  personInformation.nextPerson([]);
        console.log(person);
        console.log(person.coronavirus);
        
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