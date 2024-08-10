import { Ship, Player } from "./battleship.js";

const userInterface = (function () {
   let player1 = new Player("Player 1");
   let player2 = new Player("Player 2");

   const gameLog = document.getElementById("game-log");
   let playerTurn;
   let gameOver = false;

   function renderGameboards() {
      const gameboardOne = document.getElementById("gameboard-one");
      const gameboardTwo = document.getElementById("gameboard-two");

      gameboardOne.innerHTML = "";
      gameboardTwo.innerHTML = "";

      createBoard(gameboardOne, player1);
      createBoard(gameboardTwo, player2);
   }

   function createBoard(container, player) {
      for (let i = 0; i < 10; i++) {
         let row = document.createElement("div");
         row.classList.add("gameboard-row");

         for (let j = 0; j < 10; j++) {
            let space = document.createElement("div");
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

            if (player === player2) {
               space.addEventListener("click", () => {
                  if (gameOver) {
                     gameLog.textContent = "Game over. Please refresh to play again!";
                     return;
                  }
                  if (playerTurn === player2) {
                     if (spaceStatus !== "miss" && spaceStatus !== "ship already hit") {
                        gameLog.textContent = player2.playerGameboard.receiveAttack([i, j]);
                        renderGameboards();
                        checkGameEnd(player2);
                        playerTurn = player1;
                        if (gameOver) {
                           return;
                        } else {
                           setTimeout(() => {
                              handleComputerMove();
                              renderGameboards();
                              checkGameEnd(player1);
                              playerTurn = player2;
                           }, 300);
                        }
                     } else {
                        gameLog.textContent = "This space has already been attacked!";
                     }
                  } else {
                     gameLog.textContent = "Not your turn right now!";
                  }
               });
            }

            row.appendChild(space);
         }

         container.appendChild(row);
      }
   }

   function checkGameEnd(player) {
      if (player.playerGameboard.ships.every((ship) => ship.isSunk())) {
         gameOver = true;
         gameLog.textContent = `${player.name} has lost!`;
         // Remove the "New Game" button
         const newGameButton = document.getElementById("randomize");
         if (newGameButton) {
            newGameButton.remove();
         }
      }
   }

   function handleComputerMove() {
      let [x, y] = getComputerChoice();

      while (!isValidMove([x, y])) {
         [x, y] = getComputerChoice();
      }

      gameLog.textContent = player1.playerGameboard.receiveAttack([x, y]);
   }

   function isValidMove([x, y]) {
      return player1.playerGameboard.gameboardSpaces[x][y] === null;
   }

   function getComputerChoice() {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      return [x, y];
   }

   function startGame(p1, p2) {
      player1 = p1;
      player2 = p2;
      player1.playerGameboard.randomizeShipPlacement();
      player2.playerGameboard.randomizeShipPlacement();
      playerTurn = player2;
      gameOver = false;
      renderGameboards();
   }

   const newGame = document.getElementById("randomize");
   newGame.addEventListener("click", () => {
      startGame(player1, player2);
      // Optionally, you might want to hide the button after starting the game
      newGame.style.display = 'none';
   });

   return { startGame };
})();
