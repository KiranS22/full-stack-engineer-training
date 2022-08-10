const prompt = require("prompt-sync")({ sigint: true });

const hat = "^";
const hole = "O";
const fieldCharacter = "░";
const pathCharacter = "*";

class Field {
  //constructor is a default method.
  constructor(field = [[]]) {
    this.field = field;
  }
  //Every method inside class should go below this.
  //While writing class methods, we don't need function keyword.
  print() {
    let board = this.field.map((b) => b.join(""));
    // console.log(board)
    board = board.join("\n");
    console.log(board);
  }

  playGame() {
    let row = 0;
    let col = 0;

    while (this.field[row][col] == pathCharacter) {
      let userPrompt = prompt("which way would you like to move?");
      if (userPrompt == "r") {
        if (col < this.field[row].length - 1) {
          col++;
          console.log("move right");
        } else {
          console.log("you can not move right any further");
        }
      } else if (userPrompt == "l") {
        col > 0 ? col-- : console.log("you can not move left any further");
      } else if (userPrompt == "d") {
        row < this.field.length - 1
          ? row++
          : console.log("you can not move down any further");
      } else if (userPrompt == "u") {
        row > 0 ? row-- : console.log("you can not move up any further");
      } else {
        console.log("Invalid Movment Please type either  u, d, l or r");
      }
      if (this.field[row][col] === hat) {
        console.log("Congratulations. You won!");
        this.reset();
      } else if (this.field[row][col] === hole) {
        console.log('You fell down a hole, Game Over!"');
        this.reset();
      } else {
        this.field[row][col] = pathCharacter;
        this.print();
      }
    }
  }
  static generateField(rows, cols, holes) {
    let newField = [];
    for (let i = 0; i < rows; i++) {
      newField.push([]);
      for (let j = 0; j < cols; j++) {
        newField[i].push(fieldCharacter);
      }
    }
    newField[0][0] = pathCharacter;

    let hatX = Math.floor(Math.random() * rows);
    let hatY = Math.floor(Math.random() * cols);
    newField[hatY][hatX] = hat;

    for (let k = holes; k > 0; k--) {
      let holeX = hatX;
      let holeY = hatY;
      while (holeX === hatX) {
        holeX = Math.floor(Math.random() * rows);
      }
      while (holeY === hatY) {
        holeY = Math.floor(Math.random() * cols);
      }
      newField[holeY][holeX] = hole;
    }
    return newField;
  }
  reset() {
    let resetPrompt = prompt("Press 1 to Play Again OR any key to exit");
    if (resetPrompt == "1") {
      this.playGame();
    } else {
      console.log("You have exited the game!");
    }
  }
}

let colPrompt = prompt("Please enter the number of columns: ");
let rowPrompt = prompt("Please emter number of rows:");
let holePrompt = prompt("Please enter number of holes:");
let newField = Field.generateField(
  Number(rowPrompt),
  Number(colPrompt),
  Number(holePrompt)
);

const myField = new Field(newField);
//myField.instructions()
myField.print();
myField.playGame();
