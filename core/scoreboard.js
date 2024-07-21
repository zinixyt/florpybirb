export default class Scoreboard extends Phaser.GameObjects.Container {
    constructor(scene, x, y, currentScore = 0) {
        super(scene, x, y);

        // Set the variables
        this.currentScore = currentScore;
        this.highScore = parseInt(window.localStorage.getItem("flappy_highscore") ?? 0);

        // Create game objects
        this.scoreText = new Phaser.GameObjects.Text(scene, 0, 0, "Score: 0", { align: "center", color: "black", fontStyle: "Bold" , fontFamily: "Arial", fontSize: "72px"});
        this.scoreText.setScale(0.1,0.1);
        this.highScoreText = new Phaser.GameObjects.Text(scene, 0, 8, "High Score: " + this.highScore, { align: "center", color: "black", fontStyle: "Bold" , fontFamily: "Arial", fontSize: "72px"});
        this.highScoreText.setScale(0.1,0.1);
        this.scoreText.setOrigin(0.5, 0.5);
        this.highScoreText.setOrigin(0.5, 0.5);
        this.add(this.scoreText);
        this.add(this.highScoreText);
    }

    setScore(score) {
        this.currentScore = score;
        this.scoreText.setText("Score: " + score);
        if (this.currentScore > this.highScore) {
            this.highScore = this.currentScore;
            this.highScoreText.setText("High Score: " + this.highScore);
        }
    }

    addPoints(score = 1) {
        this.setScore(this.currentScore + score);
    }

    update() {
        //
    }
    
    saveHighscore() {
        window.localStorage.setItem("flappy_highscore", this.highScore.toString());
    }
}