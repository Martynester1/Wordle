class Board {
  constructor(rows, cols) {  // Vytvoří celou tabulku (board) pro hru
    this.rows = rows;        // počet řádků
    this.cols = cols;        // počet sloupců
    this.currentRow = 0;   // aktuální řádek, do kterého hráč píše
    this.tiles = [];

    let cell = 60;
    let startX = width / 2 - (cols * cell - 10) / 2;
    let startY = 70;
    // vytvoření jednotlivých Tile pro všechny řádky a sloupce
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
   // Nastaví písmena aktuálního řádku podle textu
  setCurrentRow(text) {
    for (let i = 0; i < this.cols; i++) {
      this.tiles[this.currentRow][i].setLetter(text[i] || "");
    }
  }
  // Uzamkne řádek (po Enteru) a nastaví barvy podle výsledku
  lockRow(result) {
    for (let i = 0; i < this.cols; i++) {
      this.tiles[this.currentRow][i].setState(result[i]);// nastaví barvu písmena
    }
    this.currentRow++;
  }
  // Nakreslí celou tabulku s písmeny
  draw() {
    for (let row of this.tiles) {
      for (let tile of row) {
        tile.draw();
      }
    }
  }
}
