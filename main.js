import Menu from './levels/menu/menu.js'
import Level from './levels/level/level.js'
import Ded from './levels/ded/ded.js';

var config = { //create configuration for game
    type: Phaser.AUTO,
    width: window.innerWidth, //size of window
    height: window.innerHeight,
    physics: {
        default: 'arcade', //the physics engine the game will use
        arcade: {
            debug: false
        }
    },
    scene: [Menu,Level,Ded],
    pixelArt: true,
    render: {
        antialias: false,
        pixelArt: true,
        roundPixels: true
    },
    audio: {
        disableWebAudio: true
    }
}

var game = new Phaser.Game(config); //create the game object
