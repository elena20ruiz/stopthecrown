import 'phaser';

import Airport from './scene/Airport.js';
import Final from './scene/Final.js';
import Win from './scene/Win.js';
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    mode: Phaser.Scale.FIT,
    width: window.innerWidth,
	height: window.innerHeight,
    scene:  [Airport, Final, Win]
};

var game = new Phaser.Game(config);
