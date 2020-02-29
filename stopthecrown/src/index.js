import 'phaser';
import informationFactory from './controller/informationFactory';


var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
    // TODO: Load backgrounds 
    // - Main background
    // - Passport background
    // - Boarding pass background


    this.load.image('logo', 'assets/logo.png');
}

function create ()
{

    // TODO: Append backgrounds
    var logo = this.add.image(400, 150, 'logo');

    this.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: 'Power2',
        yoyo: true,
        loop: -1
    });

    // Init punctuation
    // Add person and documents info

}

function update() {

    // Check click

    // Check if fail or not -> 
    // If fails -> go to the other scene

    // If pass -> next person

}