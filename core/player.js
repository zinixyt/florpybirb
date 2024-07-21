export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(1);
        this.setGravityY(500);
        
        this.jump = this.jump.bind(this);
        this.scene.input.keyboard.on('keydown-SPACE', this.jump);
    }
    
    map(current, in_min, in_max, out_min, out_max) {
        let mapped;
        return mapped = ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
    }
    
    jump() {
        this.setVelocityY(-150);
    }

    static preload(scene) {
        scene.load.image('player', './assets/player.png');
    }

    update() {
        let birbHeightSpeedFactor = this.map(this.body.velocity.y, -150, 150, -1, 1);
        let birbRotation = this.map(birbHeightSpeedFactor, -1, 1, -45, 45);
        this.body.rotation = birbRotation
        console.log(birbHeightSpeedFactor)
        
    }

    isOutOfBounds() {
        return this.y > this.scene.cameras.main.worldView.bottom;
    }
}