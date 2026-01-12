class Board {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.currentRow = 0;
    this.tiles = [];

    let cell = 60;
    let startX = width / 2 - (cols * cell - 10) / 2;
    let startY = 70;

    for (let r = 0; r < rows; r++) {
      this.tiles[r] = [];
      for (let c = 0; c < cols; c++) {
        this.tiles[r][c] = new Tile(
          startX + c * cell,
          startY + r * cell
        );
      }
    }
  }

  setCurrentRow(text) {
    for (let i = 0; i < this.cols; i++) {
      this.tiles[this.currentRow][i].setLetter(text[i] || "");
    }
  }

  lockRow(result) {
    for (let i = 0; i < this.cols; i++) {
      this.tiles[this.currentRow][i].setState(result[i]);
    }
    this.currentRow++;
  }

  draw() {
    for (let row of this.tiles) {
      for (let tile of row) {
        tile.draw();
      }
    }
  }
}
