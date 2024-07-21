export default class Pipe extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, height, speed = -50) {
        super(scene, x, y, "pipe_segment");

        this.scene.physics.world.enable(this);

        this.setDisplaySize(20, height);
        this.setVelocity(speed, 0);
        this.setOrigin(0.5,0.5);

        this.scored = false;
    }

    move() {
    }

    isOutOfBounds() {
        return !this.scene.cameras.main.worldView.contains(this.x, this.y);
    }
}