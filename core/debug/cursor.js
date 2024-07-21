export default class Cursor extends Phaser.GameObjects.Text {
    constructor(scene) {
        super(scene, 0, 0, "", {})
    }
    update() {
        this.x = this.scene.input.mousePointer.worldX;
        this.y = this.scene.input.mousePointer.worldY;
        this.text = "x:" + this.x + " y:" + this.y;
    }
}