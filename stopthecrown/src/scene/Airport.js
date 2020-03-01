
import 'phaser';
import personInformation from '../controller/personInformation';


export default class Airport extends Phaser.Scene {

    constructor() { super('airport') }

    preload() {
        this.load.image('bg', 'assets/background.jpg');
        this.load.image('person-1', 'src/data/people/man-1.png');
        this.load.image('person-2', 'src/data/people/man-2.png');
        this.load.image('person-3', 'src/data/people/man-3.png');
        this.load.image('person-4', 'src/data/people/man-4.png');
        this.load.image('person-5', 'src/data/people/man-5.png');
        this.load.image('person-6', 'src/data/people/man-6.png');
        this.load.image('button', '/assets/button.png');
        this.load.image('info', '/assets/info.png');
    }

    create() { 

        // Add person and documents info
        var person = undefined;
        var score = 0;
        person =  personInformation.nextPerson({},1);
        
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

        this.namePassport = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 80, 'Name:', { fill: '#000000', fontSize: '20px'});

        this.lastNamePassport = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 110, 'Last Name:', { fill: '#000000', fontSize: '20px'});

        this.citizenshipPassport = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 140, 'Citizenship:', { fill: '#000000', fontSize: '20px'});

        this.birthplacePassport = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 170, 'Birthplace:', { fill: '#000000', fontSize: '20px'});

        this.birthdayPassport = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 200, 'Birthday:', { fill: '#000000', fontSize: '20px'});

        // Set the boarding card with the information

        this.boardingPass = new Phaser.GameObjects.Rectangle(this, window.innerWidth/1.25, window.innerHeight/2.1, window.innerWidth/3, window.innerHeight/7.5, 0xFFFFFF);
        this.add.existing(this.boardingPass);

        this.boardingTitle = new Phaser.GameObjects.Text(this, (window.innerWidth/1.25)/1.2, (window.innerHeight/2.05)/1.15, 'BOARDING PASS', { fill: '#000000', fontSize: '25px', fontStyle: 'bold'});
        this.add.existing(this.boardingTitle);

        this.boardingOrigin = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/2.05)/1.15) + 50, 'Origin:', { fill: '#000000', fontSize: '20px'});

        // Set the rules

        this.rulesCard = new Phaser.GameObjects.Rectangle(this, window.innerWidth/1.25, window.innerHeight/1.35, window.innerWidth/3, window.innerHeight/3, 0xB08C8C);
        this.add.existing(this.rulesCard);

        this.rulesTitle = new Phaser.GameObjects.Text(this, (window.innerWidth/1.25)/1.2, (window.innerHeight/1.35)/1.22, 'RULES', { fill: '#000000', fontSize: '25px', fontStyle: 'bold'});
        this.add.existing(this.rulesTitle);

        let rules = Object.keys(person.rules);


        // Load the person icon
        this.personImage = this.add.image(window.innerWidth/2.8, window.innerHeight/2.3, `person-${person.person}`).setScale(.6);
        this.updateInformation(person);

        let people_passed = 0;
        let people_quarantained = 0;


        this.add.image(window.innerWidth/3, window.innerHeight/1.16, 'info').setScale(.4);        
        this.quarantine_text = this.add.text(window.innerWidth/3.9, window.innerHeight/1.18, 'hi', { fill: '#000000', fontSize: '20px'});
        this.pass_text = this.add.text(window.innerWidth/2.5, window.innerHeight/1.18, 'bye', { fill: '#000000', fontSize: '20px'})
    
        // Buttons
        this.add.image(window.innerWidth/3.9 + 90, window.innerHeight/1.3  + 20, 'button').setScale(.4);
        this.quarantine = new Phaser.GameObjects.Text(this, window.innerWidth/3.9, window.innerHeight/1.3, 'Quarantine', { fill: '#000000',fontSize: '30px', fontStyle: 'bold'});
        this.add.image(window.innerWidth/2.5 + 50, window.innerHeight/1.3 + 20, 'button').setScale(.4);
        this.pass = new Phaser.GameObjects.Text(this, window.innerWidth/2.5, window.innerHeight/1.3, 'Pass', { fill: '#000000',  fontSize: '30px', fontStyle: 'bold'});

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

            if (person.coronavirus == false) {
                score -= 10;
                if (score < 0){
                    this.scene.start('final');
                }
            } 
            else {
                score += 10;
            }
            this.setDinamicText(score, this.scoreText, 'Score');
            person =  personInformation.nextPerson(person.rules, Math.floor(score/100) + 1);
            console.log(person);
            this.updateInformation(person);

        });
    
        this.pass
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => this.enterButtonHoverState(this.pass) )
        .on('pointerout', () => this.enterButtonRestState(this.pass, '#000') )
        .on('pointerdown', () => this.enterButtonActiveState(this.pass) )
        .on('pointerup', () => {
            this.setDinamicText(++people_passed, this.pass_text, 'Pass');
            this.enterButtonHoverState(this.pass);

            if (person.coronavirus === true) {
                this.scene.start('final');
            } else {
                score += 10;
            }
            this.setDinamicText(score, this.scoreText, 'Score');
            person =  personInformation.nextPerson(person.rules, Math.floor(score/100) + 1);
            console.log
            this.updateInformation(person);

        });
  
        this.setDinamicText(people_passed, this.pass_text, 'Pass');
        this.setDinamicText(people_quarantained, this.quarantine_text, 'Quarantained');


        // Set score
        this.scoreBox = new Phaser.GameObjects.Rectangle(this, window.innerWidth/9,  window.innerHeight/9, window.innerWidth/7, window.innerHeight/7, 0xA1A1A1, 0.8);
        this.add.existing(this.scoreBox);
        this.scoreText = this.add.text((window.innerWidth/9)/1.9, (window.innerHeight/9)/1.3, 'SCORE', { fill: '#000000', fontSize: '40px', fontStyle: 'bold'});
        this.setDinamicText(score, this.scoreText, 'SCORE');

        // Button for medical thing
        this.medicalButton = new Phaser.GameObjects.Text(this, window.innerWidth/25,  window.innerHeight/5, 'Medical Information', { fill: '#000000', backgroundColor: '#A1A1A1', fontSize: '25px', fontStyle: 'bold'});
        this.add.existing(this.medicalButton);

        this.medicalBox = new Phaser.GameObjects.Rectangle(this, window.innerWidth/7.2, window.innerHeight/2.4, window.innerWidth/5, window.innerHeight/3, 0xFFFFFF);
        this.add.existing(this.medicalBox).setVisible(false);

        this.medicalButton
          .setInteractive({ useHandCursor: true })
          .on('pointerover', () => this.enterButtonHoverState(this.medicalButton) )
          .on('pointerout', () => this.enterButtonRestState(this.medicalButton, '#000') )
          .on('pointerdown', () => this.enterButtonActiveState(this.medicalButton) )
          .on('pointerup', () => {
              console.log("h")
              this.add.existing(this.medicalBox).setVisible(true);
        });

    }

    update() {

        // Check click

        // Check if fail or not -> 
        // If fails -> go to the other scene

        // If pass -> next person
    }

    updateInformation(person){
        this.setDinamicText(person.passport.id, this.IDPassport, 'ID:');
        this.setDinamicText(person.passport.name, this.namePassport, 'Name:');
        this.setDinamicText(person.passport.lastName, this.lastNamePassport, 'Last Name:');
        this.setDinamicText(person.passport.citizenship, this.citizenshipPassport, 'Citizenship:');
        this.setDinamicText(person.passport.birthPlace, this.birthplacePassport, 'Birthplace:');
        this.setDinamicText(person.boardingPass.origin, this.boardingOrigin, "Origin:");
        this.setDinamicText(person.passport.birthday, this.birthdayPassport, 'Birthday:');
        this.setDinamicImage(person.person, this.personImage);
        if (this.medicalBox !== undefined) {
            this.medicalBox.setVisible(false);
        }
        
        console.log(person)
        let rules = Object.keys(person.rules);
        console.log(rules)

        if (rules.length === 1) {
            this.rule = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 50, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[0], this.rule, `${1}-`);
        }
        else if (rules.length === 2) {
            this.rule = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 50, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[0], this.rule, `${1}-`);
            this.rule2 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 54, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[1], this.rule2, `${2}-`);
        }
        else if (rules.length === 3) {
            this.rule = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 50, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[0], this.rule, `${1}-`);
            this.rule2 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 54, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[1], this.rule2, `${2}-`);
            this.rule3 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 58, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[2], this.rule3, `${3}-`);
        }
        else if (rules.length === 4) {
            this.rule = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 50, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[0], this.rule, `${1}-`);
            this.rule2 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 54, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[1], this.rule2, `${2}-`);
            this.rule3 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 58, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[2], this.rule3, `${3}-`);
            this.rule4 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 62, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[3], this.rule4, `${4}-`);
        }
        else if (rules.length === 5) {
            this.rule = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 50, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[0], this.rule, `${1}-`);
            this.rule2 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 54, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[1], this.rule2, `${2}-`);
            this.rule3 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 58, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[2], this.rule3, `${3}-`);
            this.rule4 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 62, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[3], this.rule4, `${4}-`);
            this.rule5 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 68, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[4], this.rule5, `${5}-`);
        }
    }

    setDinamicText(information, textItem, staticText) {
        textItem.setText(staticText + ` ${information}`);
    }
    
    setDinamicImage(person, imageItem) {
        imageItem.setTexture(`person-${person}`);
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