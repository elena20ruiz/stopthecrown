
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
        this.passport = new Phaser.GameObjects.Rectangle(this, window.innerWidth/1.25, window.innerHeight/3.6, window.innerWidth/3, window.innerHeight/2.3, 0xFFFFFF);
        this.add.existing(this.passport);

        this.passportTitle = new Phaser.GameObjects.Text(this, (window.innerWidth/1.25)/1.2, (window.innerHeight/3.6)/4, 'PASSANGER PASSPORT', { fill: '#000000', fontSize: '25px', fontStyle: 'bold'});
        this.add.existing(this.passportTitle);

        this.IDPassport = new Phaser.GameObjects.Text(this, (window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 60, 'ID:', { fill: '#000000', fontSize: '20px', fontStyle: 'bold'});
        this.add.existing(this.IDPassport);

        this.namePassport = new Phaser.GameObjects.Text(this, (window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 100, 'Name:', { fill: '#000000', fontSize: '20px', fontStyle: 'bold'});
        this.add.existing(this.namePassport);

        this.lastNamePassport = new Phaser.GameObjects.Text(this, (window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 140, 'Last Name:', { fill: '#000000', fontSize: '20px', fontStyle: 'bold'});
        this.add.existing(this.lastNamePassport);

        this.citizenshipPassport = new Phaser.GameObjects.Text(this, (window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 180, 'Citizenship:', { fill: '#000000', fontSize: '20px', fontStyle: 'bold'});
        this.add.existing(this.citizenshipPassport);

        this.birthplacePassport = new Phaser.GameObjects.Text(this, (window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 220, 'Birthplace:', { fill: '#000000', fontSize: '20px', fontStyle: 'bold'});
        this.add.existing(this.birthplacePassport);

        this.birthdayPassport = new Phaser.GameObjects.Text(this, (window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 260, 'Birthday:', { fill: '#000000', fontSize: '20px', fontStyle: 'bold'});
        this.add.existing(this.birthdayPassport);

        // Set the boarding card with the information

        this.boardingPass = new Phaser.GameObjects.Rectangle(this, window.innerWidth/1.25, window.innerHeight/1.65, window.innerWidth/3, window.innerHeight/6.5, 0xFFFFFF);
        this.add.existing(this.boardingPass);

        this.boardingTitle = new Phaser.GameObjects.Text(this, (window.innerWidth/1.25)/1.2, (window.innerHeight/1.6)/1.15, 'BOARDING PASS', { fill: '#000000', fontSize: '25px', fontStyle: 'bold'});
        this.add.existing(this.boardingTitle);

        this.boardingOrigin = new Phaser.GameObjects.Text(this, (window.innerWidth/1.25)/1.2, ((window.innerHeight/1.6)/1.15) + 60, 'Origin:', { fill: '#000000', fontSize: '20px', fontStyle: 'bold'});
        this.add.existing(this.boardingOrigin);

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