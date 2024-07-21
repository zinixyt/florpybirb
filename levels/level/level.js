import Player from '../../core/player.js';
import Pipe from '../../core/pipe.js';
import Cursor from '../../core/debug/cursor.js';
import Scoreboard from '../../core/scoreboard.js';

export default class level extends Phaser.Scene {
    constructor() {
        super('level');

        this.pipes = [];
        this.pipeCooldown = 3000;
        this.speed = -50;
    }

    preload() {
        this.load.image('sky', './levels/level/sky.gif');
        this.load.image('player', './assets/player.png');
        this.load.image('pipe_segment', './assets/pipe_segment.png');
        Player.preload(this);

        this._handleCreatePipe = this._handleCreatePipe.bind(this);
        this.time.addEvent({
            delay: this.pipeCooldown,
            callback: this._handleCreatePipe,
            callbackScope: this,
            loop: false
        });
        this._handlePlayerCollision = this._handlePlayerCollision.bind(this);

        this.cameras.main.setZoom(6);
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 2000, 2000, 'sky');
        this.background.setDepth(-1);

        let top = this.cameras.main.worldView.top;
        let left = this.cameras.main.worldView.left;
        let screenWidth = this.cameras.main.worldView.right - left;
        let screenHeight = this.cameras.main.worldView.bottom - top;
        this.player = new Player(this, screenWidth / 2, screenHeight / 2);
        this.cameras.main.centerOn(screenWidth / 2, screenHeight / 2);

        this.debug = {
            cursor: new Cursor(this),
        };
        // this.add.existing(this.debug.cursor);

        this.scoreboard = new Scoreboard(this, screenWidth / 2, 20);
        this.scoreboard.setDepth(1);
        this.add.existing(this.scoreboard);
    }

    update() {
        this.debug.cursor.update();

        this.player.update()
        this.background.tilePositionX += 0.5;

        for (let pipe of this.pipes) {
            if (pipe.scored == false && pipe.x <= this.player.x) {
                pipe.scored = true;
                this.scoreboard.addPoints();
                console.log(pipe);
            }
            if (pipe.x < -100) {
                this._removePipe(pipe);
            }
        }
        this.physics.collide(this.pipes, this.player, this._handlePlayerCollision);
        if (this.player.isOutOfBounds()) {
            this._handleGameOver("fell");
        }
    }

    // Handles the timer
    _handleCreatePipe() {
        this._generateObstacle();
        this.time.addEvent({
            delay: this.pipeCooldown,
            callback: this._handleCreatePipe,
            callbackScope: this,
            loop: false
        });
        this.speed -= 5;
    }

    // Generates the 2 pipes at a random clearance
    _generateObstacle() {
        let max = (this.cameras.main.worldView.bottom - this.cameras.main.worldView.top) / 4;
        let offset = Phaser.Math.Between(max,-max);
        this._createObstacle(offset);
    }

    // Create the 2 pipe objects
    _createObstacle(offset) {
        let max = (this.cameras.main.worldView.bottom - this.cameras.main.worldView.top) / 3;
        let gap_distance = max;
        let x = this.cameras.main.worldView.right;

        //attempt - fixed it
        let top_y = this.cameras.main.worldView.top;
        let bottom_y = this.cameras.main.worldView.bottom;
        let top_pipe = this._createPipe(x, top_y-offset, (bottom_y-top_y)-gap_distance);
        let bottom_pipe = this._createPipe(x, bottom_y - offset, (bottom_y - top_y) - gap_distance);
        bottom_pipe.scored = true;
    }

    // Creates the pipe object
    _createPipe(x, y, height) {
        let pipe = new Pipe(this, x, y, height, this.speed);
        pipe.setDepth(0);
        this.pipes.push(this.add.existing(pipe));
        return pipe;
    }

    _removePipe(pipe) {
        let pi = this.pipes.indexOf(pipe);
        this.pipes.splice(pi, 1);
        pipe.destroy();
    }

    _handlePlayerCollision() {
        this._handleGameOver("hit_pipe");
    }

    _handleGameOver(reason) {
        console.log("Reason for loss: " + reason);
        this.scoreboard.saveHighscore();
        this.scene.stop();
        this.scene.switch("ded");
    }
}