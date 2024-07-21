export default class ded extends Phaser.Scene {
    constructor() {
        super('ded');
    }

    preload() {
        this.load.image('bg', './assets/ded.png');
    }

    create() {
        let background = this.add.image(0, 0, 'bg').setScale(1).setOrigin(0.5,0.5);

        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(0, 0);

        this.startButton = this.add.text(0, 248, "Restart", { fontSize: "48px" })
            .setOrigin(0.5, 0.5)
            .setInteractive();
        this.startButton.once("pointerdown", this._startGame, this);
        this.startButton.on("pointerover", this._hoverStartButton, this);
        this.startButton.on("pointerout", this._endHover, this);
    }

    update() {}

    _startGame() {
        this.scene.switch("level");
    }

    _hoverStartButton() {
        this.startButton.setTint("0xffcc00");
    }

    _endHover() {
        this.startButton.clearTint();
    }
}