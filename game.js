class Game {
  constructor() {
    this.round = 1;
    this.score = 0;
    this.record = 0;
    this.totalTries = 0;
    this.startRound();
  }
  startRound(){
    this.solution = random(words);
    this.board = new Board(6, 5);
    this.currentText = "";
    this.gameOver = false;
    this.result = "";
    console.log("Solution:", this.solution);
  }

  

  handleKey(key, keyCode) {
    if (this.gameOver) {
        if (this.gameOver && (key === "r" || key === "R")) {
            this.round = 1;
            this.score = 0;
            this.totalTries = 0;
            this.startRound();
            return;
        }
        if (this.gameOver && (key === " " || key === "SPACE") && this.result === "win") {
            this.round++;
            this.startRound();
            return;
        }
    return;
    }

    if (keyCode === BACKSPACE) {
      this.currentText = this.currentText.slice(0, -1);
      this.board.setCurrentRow(this.currentText);
    }

    if (keyCode === ENTER && this.currentText.length === 5) {
      let evaluation = evaluateGuess(this.currentText, this.solution);
      this.board.lockRow(evaluation);
      this.totalTries++;
      if (this.currentText === this.solution) {
        this.gameOver = true;
        this.result = "win";
        this.score++;
      } else if (this.board.currentRow === 6) {
        this.gameOver = true;
        this.result = "lose";
        if (this.score > this.record) {
          this.record = this.score;
        }
        this.score = 0;
      }

      this.currentText = "";
      return;
    }

    if (key.length === 1 && key.match(/[a-z]/i)) {
      if (this.currentText.length < 5) {
        this.currentText += key.toUpperCase();
        this.board.setCurrentRow(this.currentText);
      }
    }
  }

  draw() {
    this.board.draw();
    fill(204, 204, 0);
    text("      Round:\n      Tries:\nTotal tries:", width - 200,height - 540);
    fill(225,0,0);
    text(`${this.round}\n${this.board.currentRow}\n${this.totalTries}`, width - 30, height - 540);
    fill(204, 204, 0);
    text("Win streak:\n    Record:", 150, height - 555);
    fill(225,0,0);
    text(`${this.score}\n${this.record}`, 310, height - 555);
    fill(204, 204, 0);
    text("Solution:", width - 250, height - 20);

    if (this.gameOver) {
      if (this.result === "win") {
        text("You WIN!", width / 2, height - 140);
        fill(225,0,0);
        text(this.solution, width - 70, height - 20);
        text("Press SPACE to next round", 333, height - 55);
      } else {
        text("You LOSE!", width / 2, height - 120);
        fill(225,0,0);
        text(this.solution, width - 70, height - 20);
      }
      text("Press R to restart", 245, height - 20);
      fill(204, 204, 0);
    }
  }
}