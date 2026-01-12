let words = [
  "APPLE", "TABLE", "CHAIR", "HOUSE", "WATER", "LIGHT", "SMILE", "BRAIN",
  "HEART", "PLANT", "RIVER", "CLOUD", "GREEN", "SWEET", "SHARP", "QUIET",
  "YOUNG", "MONEY", "TRAIN", "BEACH", "PHONE", "MUSIC", "WATCH", "WRITE",
  "READS", "SPEAK", "LEARN", "TEACH", "WORKS", "PLAYS", "LIVES", "HELLO",
  "EARLY", "LATER", "TODAY", "NIGHT", "SLEEP", "DREAM", "HAPPY", "ANGRY",
  "TIRED", "CLEAN", "DIRTY", "CLOSE", "START", "BEGIN", "PLACE", "WORLD",
  "ENJOY", "THANK"
];

let game;

function setup() {
  const canvas = createCanvas(1200, 600);
  canvas.parent("game-container");
  textAlign(CENTER, CENTER);
  textFont("Press Start 2P");
  textSize(25);
  game = new Game();
}

function draw() {
  background(0);
  text("WORDLE", width / 2, 30);
  game.draw();
}

function keyPressed() {
  game.handleKey(key, keyCode);
}

function evaluateGuess(guess, solution) {
  let result = Array(5).fill("gray");
  let sol = solution.split("");

  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      result[i] = "green";
      sol[i] = null;
    }
  }

  for (let i = 0; i < 5; i++) {
    if (result[i] === "gray") {
      let idx = sol.indexOf(guess[i]);
      if (idx !== -1) {
        result[i] = "yellow";
        sol[idx] = null;
      }
    }
  }
  return result;
}

function getColor(type) {
  if (type === "green") return color(0, 143, 0);
  if (type === "yellow") return color(170, 170, 0);
  return color(32, 32, 32);
}
