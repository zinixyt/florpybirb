export default class menu extends Phaser.Scene {
    constructor() {
        super('menu');
    }

    preload() {
        this.load.image('sky', './levels/level/sky.gif');
    }

    create() {
        // let background = this.add.image(0, 0, 'menu').setScale(1);
        // let title = this.add.image(0, 0, "title").setScale(0.2);

        this.cameras.main.setZoom(1);
        this.cameras.main.centerOn(0, 0);

        this.startButton = this.add.text(0, 0, "Start Flapping", { fontSize: "72px" })
            .setOrigin(0.5, 0.5)
            .setInteractive();
        this.startButton.once("pointerdown", this._startGame, this);
        this.startButton.on("pointerover", this._hoverStartButton, this);
        this.startButton.on("pointerout", this._endHover, this);

        let controls = this.add.text(0, 120, "You jump by pressing SPACE on your keyboard")
            .setOrigin(0.5, 0.5);
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