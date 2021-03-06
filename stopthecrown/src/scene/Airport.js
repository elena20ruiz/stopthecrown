
import 'phaser';
import personInformation from '../controller/personInformation';


export default class Airport extends Phaser.Scene {

    constructor() { super('airport') }

    preload() {
        this.load.image('bg', 'assets/background_1.png');
        this.load.image('person-1', 'src/data/people/man-1.png');
        this.load.image('person-2', 'src/data/people/man-2.png');
        this.load.image('person-3', 'src/data/people/man-3.png');
        this.load.image('person-4', 'src/data/people/man-4.png');
        this.load.image('person-5', 'src/data/people/man-5.png');
        this.load.image('person-6', 'src/data/people/man-6.png');
        this.load.image('green-button', '/assets/green-button.png');
        this.load.image('red-button', '/assets/red-button.png');
        this.load.image('info', '/assets/info-back.png');
        this.load.image('score', '/assets/score.png');
        this.load.image('medical', '/assets/medical.png');
        this.load.audio('song', 'assets/music/basic-soundtrack.mp3');
        this.load.audio('intro', 'assets/music/landing.mp3');
        this.load.audio('lose', 'assets/music/lose.mp3');
    }

    create() { 
        // Music sound starts
        let intro = this.sound.add('intro', { mute: false, volume: 2, rate: 1, detune: 0, seek: 0, loop: false, delay: 0 });
        intro.play();
        let background = this.sound.add('song', { mute: false, volume: 1.5, rate: 1, detune: 0, seek: 0, loop: true, delay: 0 });
        background.play();

        // Add person and documents info
        var person = undefined;
        var score = 0;
        person =  personInformation.nextPerson({},1);
        
        // Set Background
        this.add.image(window.innerWidth/2, window.innerHeight/2, 'bg');

        // Set left column
        this.leftcolumn = new Phaser.GameObjects.Rectangle(this, window.innerWidth+150,  window.innerHeight/2, window.innerWidth, window.innerHeight, 0xA1A1A1, 0.8);
        this.add.existing(this.leftcolumn);

        // Set passport card with the information
        this.passport = new Phaser.GameObjects.Rectangle(this, window.innerWidth/1.25, window.innerHeight/4.8, window.innerWidth/3, window.innerHeight/3, 0xFFFFFF);
        this.add.existing(this.passport);

        this.passportTitle = new Phaser.GameObjects.Text(this, (window.innerWidth/1.25)/1.2, (window.innerHeight/3.6)/4, 'PASSENGER PASSPORT', { fill: '#000000', fontSize: '25px', fontStyle: 'bold'});
        this.add.existing(this.passportTitle);

        this.IDPassport = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 50, 'ID:', { fill: '#000000', fontSize: '20px'});

        this.namePassport = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 80, 'Name:', { fill: '#000000', fontSize: '20px'});

        this.lastNamePassport = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 110, 'Last Name:', { fill: '#000000', fontSize: '20px'});

        this.citizenshipPassport = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 140, 'Citizenship:', { fill: '#000000', fontSize: '20px'});

        this.birthplacePassport = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 170, 'Birthplace:', { fill: '#000000', fontSize: '20px'});

        this.birthdayPassport = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/3.6)/4) + 200, 'Birthday:', { fill: '#000000', fontSize: '20px'});

        // Set the boarding card with the information

        this.boardingPass = new Phaser.GameObjects.Rectangle(this, window.innerWidth/1.25, window.innerHeight/2.15, window.innerWidth/3, window.innerHeight/7.5, 0xFFFFFF);
        this.add.existing(this.boardingPass);

        this.boardingTitle = new Phaser.GameObjects.Text(this, (window.innerWidth/1.25)/1.2, (window.innerHeight/2.05)/1.15, 'BOARDING PASS', { fill: '#000000', fontSize: '25px', fontStyle: 'bold'});
        this.add.existing(this.boardingTitle);

        this.boardingOrigin = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/2.05)/1.15) + 50, 'Origin:', { fill: '#000000', fontSize: '20px'});

        // Set the rules

        this.rulesCard = new Phaser.GameObjects.Rectangle(this, window.innerWidth/1.25, window.innerHeight/1.35, window.innerWidth/3, window.innerHeight/3, 0xB08C8C);
        this.add.existing(this.rulesCard);

        this.rulesTitle = new Phaser.GameObjects.Text(this, (window.innerWidth/1.25)/1.2, (window.innerHeight/1.35)/1.22, 'RULES', { fill: '#000000', fontSize: '25px', fontStyle: 'bold'});
        this.add.existing(this.rulesTitle);

        // Load the person icon
        this.personImage = this.add.image(window.innerWidth/2.8, window.innerHeight/1.9, `person-${person.person}`).setScale(.7)
        this.updateInformation(person);

        let people_passed = 0;
        let people_quarantained = 0;


        this.add.image(window.innerWidth/2.8, window.innerHeight/1.16, 'info').setScale(.4);        
        this.quarantine_text = this.add.text(window.innerWidth/3.9, window.innerHeight/1.18, 'hi', { fill: '#000000', fontSize: '20px'});
        this.pass_text = this.add.text(window.innerWidth/2.5, window.innerHeight/1.18, 'bye', { fill: '#000000', fontSize: '20px'})
    
        // Buttons
        this.add.image(window.innerWidth/4.1 + 90, window.innerHeight/1.3  + 20, 'red-button').setScale(.4);
        this.quarantine = new Phaser.GameObjects.Text(this, window.innerWidth/4.1, window.innerHeight/1.3, 'Quarantine', { fill: '#000000',fontSize: '30px', fontStyle: 'bold'});
        this.add.image(window.innerWidth/2.3, window.innerHeight/1.3 + 20, 'green-button').setScale(.4);
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
                    background.stop();
                    if (intro.isPlaying) intro.stop();
                    this.scene.start('final');
                }
            } 
            else {
                score += 10;
                if (score === 500) {
                    background.stop();
                    if (intro.isPlaying) intro.stop();
                    this.scene.start('win'); 
                }
            }
            this.setDinamicText(score, this.scoreText, '');
            person =  personInformation.nextPerson(person.rules, Math.floor(score/100) + 1);
            // if(score % 100 === 0) {
            //     var rulesAux = Object.keys(person.rules);
            //     var newRule = rulesAux[rulesAux.length - 1];
            //     this.setNewRule( person.rules[newRule]["description"]);
            // }
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
                background.stop();
                if (intro.isPlaying) intro.stop();
                this.scene.start('final');
            } else {
                score += 10;
                if (score === 500) {
                    background.stop();
                    if (intro.isPlaying) intro.stop();
                    this.scene.start('win'); 
                }
            }
            this.setDinamicText(score, this.scoreText, '');
            person =  personInformation.nextPerson(person.rules, Math.floor(score/100) + 1);
            // if(score % 100 === 0) {
            //     var rulesAux = Object.keys(person.rules);
            //     var newRule = rulesAux[rulesAux.length - 1];
            //     console.log( person.rules[newRule]);
            //     this.setNewRule( person.rules[newRule]["description"]);
            // }
            this.updateInformation(person);

        });
  
        this.setDinamicText(people_passed, this.pass_text, 'Pass');
        this.setDinamicText(people_quarantained, this.quarantine_text, 'Quarantained');


        // Set score
        this.add.image((window.innerWidth/9)/1.05, (window.innerHeight/9)/0.85, 'score').setScale(.3)
        this.scoreText = this.add.text((window.innerWidth/9)/1.1, (window.innerHeight/9)/1, '', { boundsAlignH: "center", boundsAlignV: "middle" ,fill: '#000000', fontSize: '35px', fontStyle: 'bold'});
        this.setDinamicText(score, this.scoreText, '');

        // Button for medical thing
        this.add.image((window.innerWidth/9)/1.05, window.innerHeight/4.3, 'medical').setScale(.3)
        this.medicalButton = new Phaser.GameObjects.Text(this, window.innerWidth/12,  window.innerHeight/5, 'Medical\nInformation', { fill: '#000000', fontSize: '25px', fontStyle: 'bold'});
        this.add.existing(this.medicalButton);

        this.medicalBox = new Phaser.GameObjects.Rectangle(this, window.innerWidth/7.2, window.innerHeight/2.1, window.innerWidth/5, window.innerHeight/3, 0xFFFFFF);
        this.add.existing(this.medicalBox).setVisible(false);

        this.medicalTitle = new Phaser.GameObjects.Text(this, (window.innerWidth/7.2)/2.9, (window.innerHeight/2.4)/1.2, 'MEDICAL INFORMATION', { fill: '#000000', fontSize: '25px', fontStyle: 'bold'});
        this.add.existing(this.medicalTitle).setVisible(false);

        this.medicalTemperature = this.add.text((window.innerWidth/7.2)/2.9, ((window.innerHeight/2.4)/1.2) + 50, 'Temperature:', { fill: '#000000', fontSize: '20px'});
        this.setDinamicText(person.medical.temperature, this.medicalTemperature, 'Temperature:');
        this.medicalTemperature.setVisible(false);

        this.medicalDissease = this.add.text((window.innerWidth/7.2)/2.9, ((window.innerHeight/2.4)/1.2) + 80, 'Disease:', { fill: '#000000', fontSize: '20px'});
        this.setDinamicText(person.medical.disease, this.medicalDissease, 'Disease:');
        this.medicalDissease.setVisible(false);

        this.medicalButton
          .setInteractive({ useHandCursor: true })
          .on('pointerover', () => this.enterButtonHoverState(this.medicalButton) )
          .on('pointerout', () => this.enterButtonRestState(this.medicalButton, '#000') )
          .on('pointerdown', () => this.enterButtonActiveState(this.medicalButton) )
          .on('pointerup', () => {
              this.add.existing(this.medicalBox).setVisible(true);
              this.add.existing(this.medicalTitle).setVisible(true);
              this.medicalTemperature.setVisible(true);
              this.medicalDissease.setVisible(true);
        });

    }

    update() {   }

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
            this.add.existing(this.medicalTitle).setVisible(false);
            this.setDinamicText(person.medical.temperature, this.medicalTemperature, 'Temperature:');
            this.medicalTemperature.setVisible(false);
            this.setDinamicText(person.medical.disease, this.medicalDissease, 'Disease:');
            this.medicalDissease.setVisible(false);
        }
        
        console.log(person)
        let rules = Object.keys(person.rules);
        console.log(rules)

        if (this.rule != undefined){
            this.rule.destroy();
        }
        if (this.rule2 != undefined){
            this.rule2.destroy();
        }
        if (this.rule3 != undefined){
            this.rule3.destroy();
        }
        if (this.rule4 != undefined){
            this.rule4.destroy();
        }
        if (this.rule5 != undefined){
            this.rule5.destroy();
        }
        if (rules.length === 1) {
            this.rule = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 50, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[0], this.rule, `${1}-`);
        }
        else if (rules.length === 2) {
            this.rule = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 50, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[0], this.rule, `${1}-`);
            this.rule2 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 80, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[1], this.rule2, `${2}-`);
        }
        else if (rules.length === 3) {
            this.rule = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 50, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[0], this.rule, `${1}-`);
            this.rule2 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 80, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[1], this.rule2, `${2}-`);
            this.rule3 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 110, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[2], this.rule3, `${3}-`);
        }
        else if (rules.length === 4) {
            this.rule = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 50, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[0], this.rule, `${1}-`);
            this.rule2 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 80, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[1], this.rule2, `${2}-`);
            this.rule3 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 110, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[2], this.rule3, `${3}-`);
            this.rule4 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 140, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[3], this.rule4, `${4}-`);
        }
        else if (rules.length === 5) {
            this.rule = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 50, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[0], this.rule, `${1}-`);
            this.rule2 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 80, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[1], this.rule2, `${2}-`);
            this.rule3 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 110, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[2], this.rule3, `${3}-`);
            this.rule4 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 140, 'rule:', { fill: '#000000', fontSize: '20px'});           
            this.setDinamicText(rules[3], this.rule4, `${4}-`);
            this.rule5 = this.add.text((window.innerWidth/1.25)/1.2, ((window.innerHeight/1.35)/1.22) + 170, 'rule:', { fill: '#000000', fontSize: '20px'});           
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
        button.setStyle({ fill: '#fff'});
    }

    enterButtonRestState(button, color) {
        button.setStyle({ fill: color});
    }

    enterButtonActiveState(button) {
        button.setStyle({ fill: '#0ff' });
    }

    // setNewRule(description) {
    //     this.newRule = new Phaser.GameObjects.Rectangle(this,  window.innerWidth/2.8, window.innerHeight/1.9,  window.innerWidth/3, window.innerHeight/3, 0xFFFFFF)
    //     this.add.existing(this.newRule);

    //     this.newRuleTitle = new Phaser.GameObjects.Text(this,  window.innerWidth/4, window.innerHeight/2.5,   'New rule!', { fill: '#000000', fontSize: '25px', fontStyle: 'bold'});
    //     this.add.existing(this.newRuleTitle);

    //     // Put description
    //     this.newRuleDescription = this.add.text(this,  window.innerWidth/2.8, window.innerHeight/1.9,  'description', { fill: '#000000', fontSize: '20px', fontStyle: 'bold'});
    //     this.setDinamicText(description, this.newRuleDescription, '');


    //     // Button
    //     this.newRuleX = new Phaser.GameObjects.Text(this, window.innerWidth/2, window.innerHeight/2.5, 'X', { fill: '#000000',  fontSize: '30px', fontStyle: 'bold'});
    //     this.add.existing(this.newRuleX);
    // }

}