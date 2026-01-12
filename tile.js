class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.letter = "";
    this.state = "gray";
  }

  setLetter(letter) {
    this.letter = letter;
  }

  setState(state) {
    this.state = state;
  }

  draw() {
    fill(getColor(this.state));
    stroke(0);
    rect(this.x, this.y, this.size, this.size);

    fill(225);
    noStroke();
    text(this.letter, this.x + this.size / 2, this.y + this.size / 2);
  }
}