import { Ship, Player } from "./battleship.js";

const userInterface = (function () {
   // Declare player variables
   let player1, player2;

   // Get gameLog
   const gameLog = document.getElementById("game-log");

   // Declare player turn
   let playerTurn;

   function renderGameboards() {
      const gameboardOne = document.getElementById("gameboard-one");
      const gameboardTwo = document.getElementById("gameboard-two");

      gameboardOne.innerHTML = ""; // Clear existing content
      gameboardTwo.innerHTML = ""; // Clear existing content

      createBoard(gameboardOne, player1);
      createBoard(gameboardTwo, player2);
   }

   // Split rendering and creating the board to not duplicate event listeners

   function createBoard(container, player) {
      for (let i = 0; i < 10; i++) {
         let row = document.createElement("div");
         row.classList.add("gameboard-row");

         for (let j = 0; j < 10; j++) {
            let space = document.createElement("div");

            // Store space in variable for easier readability
            let spaceStatus = player.playerGameboard.gameboardSpaces[i][j];

            if (spaceStatus === null) {
               space.innerHTML = "";
               space.classList.remove("ship-space");
            } else if (spaceStatus === "miss") {
               space.innerHTML = "*";
               space.classList.remove("ship-space");
            } else if (spaceStatus === "ship already hit") {
               space.innerHTML = "X";
               space.classList.remove("ship-space");
            } else {
               space.innerHTML = "";
               space.classList.add("ship-space");
            }

            // Event listener
            space.addEventListener("click", () => {
               if (playerTurn === player) {
                  if (spaceStatus !== "miss" && spaceStatus !== "ship already hit") {
                     gameLog.textContent = player.playerGameboard.receiveAttack([i, j]);
                     renderGameboards();
                     playerTurn = (playerTurn === player1) ? player2 : player1;
                  } else {
                     gameLog.textContent = "This space has already been attacked!";
                  }
               } else {
                  gameLog.textContent = "Not your turn right now!";
               }
            });

            row.appendChild(space);
         }

         container.appendChild(row);
      }
   }

   // Set player objects to player1 and player2 variables then initial render gameboard
   function startGame(p1, p2) {
      player1 = p1;
      player2 = p2;
      playerTurn = player2;
      renderGameboards();
   }

   return { startGame };
})();

// Mocking Players
const player1 = new Player("Player 1");
const player2 = new Player("Player 2");

// Create ships for Player 1
const carrier1 = new Ship(5);
const battleship1 = new Ship(4);
const cruiser1 = new Ship(3);
const submarine1 = new Ship(3);
const destroyer1 = new Ship(2);

// Create ships for Player 2
const carrier2 = new Ship(5);
const battleship2 = new Ship(4);
const cruiser2 = new Ship(3);
const submarine2 = new Ship(3);
const destroyer2 = new Ship(2);

// Place Player 1's ships
player1.playerGameboard.placeShip(
   carrier1,
   [1, 1],
   [1, 2],
   [1, 3],
   [1, 4],
   [1, 5]
); // Horizontal
player1.playerGameboard.placeShip(battleship1, [3, 0], [4, 0], [5, 0], [6, 0]); // Vertical
player1.playerGameboard.placeShip(cruiser1, [7, 2], [7, 3], [7, 4]); // Horizontal
player1.playerGameboard.placeShip(submarine1, [2, 7], [3, 7], [4, 7]); // Vertical
player1.playerGameboard.placeShip(destroyer1, [6, 6], [6, 7]); // Horizontal

// Place Player 2's ships
player2.playerGameboard.placeShip(
   carrier2,
   [0, 0],
   [0, 1],
   [0, 2],
   [0, 3],
   [0, 4]
); // Horizontal
player2.playerGameboard.placeShip(battleship2, [1, 8], [2, 8], [3, 8], [4, 8]); // Vertical
player2.playerGameboard.placeShip(cruiser2, [5, 1], [5, 2], [5, 3]); // Horizontal
player2.playerGameboard.placeShip(submarine2, [8, 3], [9, 3], [9, 4]); // Vertical
player2.playerGameboard.placeShip(destroyer2, [2, 5], [2, 6]); // Horizontal

// Render gameboards
userInterface.startGame(player1, player2);
