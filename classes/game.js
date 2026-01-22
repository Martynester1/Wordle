class Game {
  constructor() {
    this.round = 1;       // číslo kola
    this.score = 0;       // aktuální výhry
    this.record = 0;      // nejlepší počet výher
    this.totalTries = 0;  // celkový počet pokusů

    this.invalidWord = false;  // true pokud hráč zadá neplatné slovo
    this.checkingWord = false; // true když se kontroluje slovo
    this.gameOver = false;     // true pokud hra skončila

    this.startRound(); // spustí první kolo
  }

  // funkce, která kontroluje, jestli je slovo skutečné
  // Když pošleme slovo do API a dostaneme odpověď "ok" (res.ok),
  // znamená to, že slovo existuje. Pokud API odpoví chybou nebo
  // se slovo nenajde, funkce vrátí false, což značí neplatné slovo.
  async isValidWord(word) {
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`);
      return res.ok; // true = slovo existuje, false = neexistuje
    } catch (e) {
      return false; 
    }
  }

  // spustí nové kolo
  startRound() {
    this.solution = random(words);  // náhodně vybere slovo
    this.board = new Board(6, 5);   // vytvoří novou tabulku (6 řádků, 5 písmen)
    this.currentText = "";           // aktuální text, který hráč píše
    this.gameOver = false;           // hra není u konce
    this.result = "";                // win/lose výsledek
    this.invalidWord = false;        // zatím žádná chyba
  }

  // funkce, která reaguje na stisk kláves
  async handleKey(key, keyCode) {

    // pokud je hra u konce nebo se kontroluje slovo
    if (this.gameOver || this.checkingWord) {
      // restart po stisku R
      if (this.gameOver && (key === "r" || key === "R")) {
        this.round = 1;
        this.score = 0;
        this.totalTries = 0;
        this.startRound();
        return;
      }
      // pokračování dalšího kola po stisku SPACE, pokud vyhrál
      if (this.gameOver && key === " " && this.result === "win") {
        this.round++;
        this.startRound();
        return;
      }
      return; 
    }

    // mazání (BACKSPACE)
    if (keyCode === BACKSPACE) {
      this.currentText = this.currentText.slice(0, -1); // odstraní poslední písmeno
      this.board.setCurrentRow(this.currentText);        // aktualizuje zobrazení
      this.invalidWord = false;                          // odstraní chybu
      return;
    }

    // potvrzení slova (ENTER)
    if (keyCode === ENTER && this.currentText.length === 5) {
      this.checkingWord = true;                         // začínáme kontrolu
      const valid = await this.isValidWord(this.currentText); // zkontroluje slovo
      this.checkingWord = false;                        // kontrola hotova

      if (!valid) {                                     // pokud slovo neexistuje
        this.invalidWord = true;                        // zobrazí hlášku
        return;
      }

      this.invalidWord = false;                         // slovo je validní

      let evaluation = evaluateGuess(this.currentText, this.solution); // vyhodnotí písmena
      this.board.lockRow(evaluation);                   // uzamkne řádek s barvami
      this.totalTries++;                                // přičte pokus

      // pokud hráč vyhrál
      if (this.currentText === this.solution) {
        this.gameOver = true;
        this.result = "win";
        this.score++;
      } 
      // pokud hráč prohrál a došly mu pokusy
      else if (this.board.currentRow === 6) {
        this.gameOver = true;
        this.result = "lose";
        if (this.score > this.record) this.record = this.score; // uloží nejlepší skóre
        this.score = 0;
      }

      this.currentText = ""; // vymaže aktuální text
      return;
    }

    // psaní písmen
    if (key.length === 1 && key.match(/[a-z]/i)) {
      if (this.currentText.length < 5) {
        this.currentText += key.toUpperCase(); // přidá písmeno
        this.board.setCurrentRow(this.currentText); // aktualizuje řádek
        this.invalidWord = false; // odstraní chybu, pokud byla
      }
    }
  }
  draw() {
    this.board.draw();

    fill(204, 204, 0);
    text("      Round:\n      Tries:\nTotal tries:", width - 200, height - 540);

    fill(225, 0, 0);
    text(`${this.round}\n${this.board.currentRow}\n${this.totalTries}`, width - 30, height - 540);

    fill(204, 204, 0);
    text("Win streak:\n    Record:", 150, height - 555);

    fill(225, 0, 0);
    text(`${this.score}\n${this.record}`, 310, height - 555);

    fill(204, 204, 0);
    text("Solution:", width - 250, height - 20);

    if (this.invalidWord) {
      fill(255, 0, 0);
      text("Word not found", width / 2, height - 150);
      fill(204, 204, 0);
    }
   
    if (this.gameOver) {
      if (this.result === "win") {
        text("You WIN!", width / 2, height - 140);
        fill(225, 0, 0);
        text(this.solution, width - 70, height - 20);
        text("Press SPACE to next round", 333, height - 55);
      } else {
        text("You LOSE!", width / 2, height - 120);
        fill(225, 0, 0);
        text(this.solution, width - 70, height - 20);
      }
      text("Press R to restart", 245, height - 20);
      fill(204, 204, 0);
    }
  }
}


