import 'phaser';

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    mode: Phaser.Scale.FIT,
    width: window.innerWidth,
	height: window.innerHeight,
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


    this.load.image('logo', 'assets/background.jpg');
}

function create ()
{

    // TODO: Append backgrounds
    this.add.image(0, 0, 'logo').setOrigin(0, 0)
    // Init punctuation
    // Add person and documents info

}

function update() {

    // Check click

    // Check if fail or not -> 
    // If fails -> go to the other scene

    // If pass -> next person

}