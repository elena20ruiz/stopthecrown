import 'phaser';

import Airport from './scene/Airport.js';
import Final from './scene/Final';
var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene:  [Airport, Final]
};

var game = new Phaser.Game(config);


