
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
        this.load.image('person-0', 'src/data/people/man-1.png');
        this.load.image('person-1', 'src/data/people/man-2.png');
        this.load.image('person-2', 'src/data/people/man-3.png');
        this.load.image('person-3', 'src/data/people/man-4.png');
        this.load.image('person-4', 'src/data/people/man-5.png');
        this.load.image('person-5', 'src/data/people/man-6.png');
    }

    create() { 

        // Add person and documents info
        var person = undefined;
        person =  personInformation.nextPerson([]);
        
        console.log(person);
        // console.log(personInformation.nextPerson())

        // Set Background
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db");
        this.add.image(window.innerWidth/2, window.innerHeight/5, 'bg');

        // Set left column
        this.leftcolumn = new Phaser.GameObjects.Rectangle(this, window.innerWidth+150,  window.innerHeight/2, window.innerWidth, window.innerHeight, 0xA1A1A1, 0.8);
        this.add.existing(this.leftcolumn);

        // Set passport card with the information
        this.passport = new Phaser.GameObjects.Rectangle(this, window.innerWidth/1.25, window.innerHeight/4.4, window.innerWidth/3, window.innerHeight/3, 0xFFFFFF);
        this.add.existing(this.passport);

        this.passportTitle = new Phaser.GameObjects.Text(this, (window.innerWidth/1.25)/1.2, (window.innerHeight/3.6)/4, 'PASSANGER PASSPORT', { fill: '#000000', fontSize: '25px', fontStyle: 'bold'});
        this.add.existing(this.passportTitle);

        this.IDPassport = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 50, 'ID:', { fill: '#000000', fontSize: '20px'});
        this.setDinamicText(person.passport.id, this.IDPassport, 'ID:');

        this.namePassport = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 80, 'Name:', { fill: '#000000', fontSize: '20px'});
        this.setDinamicText(person.passport.name, this.namePassport, 'Name:');

        this.lastNamePassport = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 110, 'Last Name:', { fill: '#000000', fontSize: '20px'});
        this.setDinamicText(person.passport.lastName, this.lastNamePassport, 'Last Name:');

        this.citizenshipPassport = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 140, 'Citizenship:', { fill: '#000000', fontSize: '20px'});
        this.setDinamicText(person.passport.citizenship, this.citizenshipPassport, 'Citizenship:');

        this.birthplacePassport = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 170, 'Birthplace:', { fill: '#000000', fontSize: '20px'});
        this.setDinamicText(person.passport.birthPlace, this.birthplacePassport, 'Birthplace:');

        this.birthdayPassport = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 200, 'Birthday:', { fill: '#000000', fontSize: '20px'});
        this.setDinamicText(person.passport.birthday, this.birthdayPassport, 'Birthday:');

        // Set the boarding card with the information

        this.boardingPass = new Phaser.GameObjects.Rectangle(this, window.innerWidth/1.25, window.innerHeight/2.1, window.innerWidth/3, window.innerHeight/7.5, 0xFFFFFF);
        this.add.existing(this.boardingPass);

        this.boardingTitle = new Phaser.GameObjects.Text(this, (window.innerWidth/1.25)/1.2, (window.innerHeight/2.05)/1.15, 'BOARDING PASS', { fill: '#000000', fontSize: '25px', fontStyle: 'bold'});
        this.add.existing(this.boardingTitle);

        this.boardingOrigin = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/2.05)/1.15) + 50, 'Origin:', { fill: '#000000', fontSize: '20px'});
        this.setDinamicText(person.boardingPass.origin, this.boardingOrigin, "Origin:");

        // Set the rules

        this.rulesCard = new Phaser.GameObjects.Rectangle(this, window.innerWidth/1.25, window.innerHeight/1.35, window.innerWidth/3, window.innerHeight/3, 0xB08C8C);
        this.add.existing(this.rulesCard);

        this.rulesTitle = new Phaser.GameObjects.Text(this, (window.innerWidth/1.25)/1.2, (window.innerHeight/1.35)/1.22, 'RULES', { fill: '#000000', fontSize: '25px', fontStyle: 'bold'});
        this.add.existing(this.rulesTitle);

        console.log(person.rules.length)
        for (let i = 1; i <= person.rules.length; ++i) {
            this.rule = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 8, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(person.rules[i], this.rule, `${i}-`);
        }

        let people_passed = 0;
        let people_quarantained = 0;

        this.quarantine_text = this.add.text(window.innerWidth/5.5, window.innerHeight/1.2, 'hi', { fill: '#000000', fontSize: '20px', backgroundColor: '#FFFFFF' });
        this.pass_text = this.add.text(window.innerWidth/3, window.innerHeight/1.2, 'bye', { fill: '#000000', fontSize: '20px', backgroundColor: '#FFFFFF' })
    
        this.quarantine = new Phaser.GameObjects.Text(this, window.innerWidth/5.5, window.innerHeight/1.3, 'Quarantine', { fill: '#000000', backgroundColor: '#f00', fontSize: '30px', fontStyle: 'bold'});
        this.pass = new Phaser.GameObjects.Text(this, window.innerWidth/3, window.innerHeight/1.3, 'Pass', { fill: '#000000', backgroundColor: '#0f0', fontSize: '30px', fontStyle: 'bold'});

        this.add.existing(this.pass);
        this.add.existing(this.quarantine);

        this.quarantine
          .setInteractive({ useHandCursor: true })
          .on('pointerover', () => this.enterButtonHoverState(this.quarantine) )
          .on('pointerout', () => this.enterButtonRestState(this.quarantine, '#000') )
          .on('pointerdown', () => this.enterButtonActiveState(this.quarantine) )
          .on('pointerup', () => {
            this.setDinamicText(++people_quarantained, this.quarantine_text, 'Quarantained');
            this.enterButtonHoverState(this.quarantine);
        });
    
        this.pass
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.enterButtonHoverState(this.pass) )
        .on('pointerout', () => this.enterButtonRestState(this.pass, '#000') )
        .on('pointerdown', () => this.enterButtonActiveState(this.pass) )
        .on('pointerup', () => {
            this.setDinamicText(++people_passed, this.pass_text, 'Pass');
            this.enterButtonHoverState(this.pass);
        });
  
        this.setDinamicText(people_passed, this.pass_text, 'Pass');
        this.setDinamicText(people_quarantained, this.quarantine_text, 'Quarantained');

        // Set score
        let score = 0;

        // Load the person icon
        this.add.image(window.innerWidth/3.5, window.innerHeight/2.3, `person-${person.person}`).setScale(.6)
        

        

    }// create

    update() {

        // Check click

        // Check if fail or not -> 
        // If fails -> go to the other scene

        // If pass -> next person
    }


    setDinamicText(information, textItem, staticText) {
        textItem.setText(staticText + ` ${information}`);
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