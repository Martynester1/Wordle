class Tile {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 50;
    this.letter = "";
    this.state = "gray"; // stav políčka (gray = šedé, yellow = žluté, green = zelené)
  }
 // Nastaví písmeno do políčka
  setLetter(letter) {
    this.letter = letter;
  }
 // Nastaví barvu/stav políčka (gray, yellow, green)
  setState(state) {
    this.state = state;
  }
 // Nakreslí políčko na canvas
  draw() {
    fill(getColor(this.state));
    stroke(0);
    rect(this.x, this.y, this.size, this.size);

    fill(225);
    noStroke();
    text(this.letter, this.x + this.size / 2, this.y + this.size / 2);
  }
}