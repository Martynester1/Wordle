// Seznam slov pro hru
let words = [
  "APPLE", "TABLE", "CHAIR", "HOUSE", "WATER", "LIGHT", "SMILE", "BRAIN",
  "HEART", "PLANT", "RIVER", "CLOUD", "GREEN", "SWEET", "SHARP", "QUIET",
  "YOUNG", "MONEY", "TRAIN", "BEACH", "PHONE", "MUSIC", "WATCH", "WRITE",
  "READS", "SPEAK", "LEARN", "TEACH", "WORKS", "PLAYS", "HELLO",
  "EARLY", "LATER", "TODAY", "NIGHT", "SLEEP", "DREAM", "HAPPY", "ANGRY",
  "TIRED", "CLEAN", "DIRTY", "CLOSE", "START", "BEGIN", "PLACE", "WORLD",
  "ENJOY", "THANK", "SOUND", "BLEND", "POINT", "FOUND", "BREAK", "GREAT",
  "BRAVE", "STILL", "SHIFT", "THINK", "RIGHT", "THERE", "WHERE", "UNDER",
  "ABOVE", "ALONE", "ALIVE", "BRING", "BUILD", "GUESS", "FEELS", "SOLVE",
  "MATCH", "SWEAR", "LAUGH", "CRASH", "GRASS", "FLAME", "WHEEL", "STONE",
  "BRICK", "BLAST", "FLYER", "PILOT", "WORRY", "POWER", "MAGIC", "OCEAN",
  "RANCH", "FIELD", "LEMON", "BERRY", "CHIEF", "PRIDE", "PRIZE", "PRICE",
  "VALUE", "BOUND", "FLOAT", "FRAME", "SHINE", "SHORE", "TIGER", "GHOST"
];


let game;

function setup() {
  const canvas = createCanvas(1200, 600); // vytvoří canvas
  canvas.parent("game-container");
  textAlign(CENTER, CENTER);
  textFont("Press Start 2P");
  textSize(25);
  game = new Game(); // vytvoří objekt hry
}

function draw() {
  background(0);
  text("WORDLE", width / 2, 30);
  game.draw(); // vykreslí samotnou hru
}
// Spouští se při stisku klávesy
function keyPressed() {
  game.handleKey(key, keyCode);
}
// Vyhodnocení pokusu
function evaluateGuess(guess, solution) {
  let result = Array(5).fill("gray");
  let sol = solution.split("");// rozdělí řešení na písmena
 // zelená písmena na správném místě
  for (let i = 0; i < 5; i++) {
    if (guess[i] === solution[i]) {
      result[i] = "green";
      sol[i] = null;
    }
  }
// žlutá písmena na špatném místě
  for (let i = 0; i < 5; i++) {
    if (result[i] === "gray") {
      let idx = sol.indexOf(guess[i]);
      if (idx !== -1) {
        result[i] = "yellow";
        sol[idx] = null;
      }
    }
  }
  return result;// vrátí pole s barvami pro každý Tile
}
// Převede stav písmena na barvu
function getColor(type) {
  if (type === "green") return color(0, 143, 0);
  if (type === "yellow") return color(170, 170, 0);
  return color(32, 32, 32);
}

