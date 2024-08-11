import { Ship, Player } from "./battleship.js";

const userInterface = (function () {
   let player1 = new Player("Player 1");
   let player2 = new Player("Player 2");

   const gameLog = document.getElementById("game-log");
   let playerTurn;
   let gameOver = false;

   let typeOfGame;

   function renderGameboards() {
      const gameboardOne = document.getElementById("gameboard-one");
      const gameboardTwo = document.getElementById("gameboard-two");

      gameboardOne.innerHTML = "";
      gameboardTwo.innerHTML = "";

      // Render the board for the player whose turn it is
      if (typeOfGame == "twoPlayerGame") {
         createBoard(gameboardOne, player1, playerTurn === player1);
         createBoard(gameboardTwo, player2, playerTurn === player2);
      } else if (typeOfGame === "computerGame") {
         createBoard(gameboardOne, player1, true);
         createBoard(gameboardTwo, player2, false);
      }
   }

   function createBoard(container, player, showShips) {
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
               if (showShips) {
                  space.classList.add("ship-space");
               } else {
                  space.classList.remove("ship-space");
               }
            }

            space.addEventListener("click", () => {
               // Check if game is over
               if (gameOver) {
                  gameLog.textContent =
                     "Game over. Please refresh to play again!";
                  return;
               }

               // Check for type of game and if player gameboard is of the computer
               if (typeOfGame === "computerGame" && player === player2) {
                  handlePlayerMove(player2, i, j);
                  // Handle computer move if game isn't over
                  if (!gameOver) {
                     setTimeout(() => {
                        handleComputerMove();
                        renderGameboards();
                        checkGameEnd(player1);
                     }, 300);
                  }
               } else if (typeOfGame === "twoPlayerGame") {
                  if (playerTurn === player1 && player === player2) {
                     handlePlayerMove(player, i, j);
                     playerTurn = player2;
                     showOverlay();
                  } else if (playerTurn === player2 && player === player1) {
                     handlePlayerMove(player, i, j);
                     playerTurn = player1;
                     showOverlay();
                  } else {
                     gameLog.textContent =
                        "You can only attack the opponent's board!";
                  }
               }
            });

            row.appendChild(space);
         }

         container.appendChild(row);
      }
   }

   // Function to handle player move to reduce reduntant code
   function handlePlayerMove(opponent, x, y) {
      let spaceStatus = opponent.playerGameboard.gameboardSpaces[x][y];
      if (spaceStatus === "miss" && spaceStatus === "ship already hit") {
         gameLog.textContent = "This space has already been attacked!";
         return;
      }

      gameLog.textContent = opponent.playerGameboard.receiveAttack([x, y]);
      renderGameboards();
      checkGameEnd(opponent);
   }

   // Two player logic

   const twoPlayerButton = document.getElementById("two-player");
   const overlay = document.getElementById("overlay");
   const continueButton = document.getElementById("continue");

   // Show overlay
   function showOverlay() {
      overlay.classList.remove("hide");
   }

   // Hide overlay
   function hideOverlay() {
      overlay.classList.add("hide");
   }

   // Two player start game
   function startTwoPlayerGame(p1, p2) {
      player1 = p1;
      player2 = p2;
      player1.playerGameboard.randomizeShipPlacement();
      player2.playerGameboard.randomizeShipPlacement();
      playerTurn = player1;
      gameOver = false;
      typeOfGame = "twoPlayerGame";
      renderGameboards();
      hideOverlay();
   }

   // Add event listener to buttons
   twoPlayerButton.addEventListener("click", () => {
      startTwoPlayerGame(player1, player2);
      newGame.style.display = "none";
      twoPlayerButton.style.display = "none";
   });
   continueButton.addEventListener("click", () => {
      hideOverlay();
      renderGameboards();
   });

   function checkGameEnd(player) {
      if (player.playerGameboard.ships.every((ship) => ship.isSunk())) {
         gameOver = true;
         gameLog.textContent = `${player.name} has lost!`;
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
      return (
         player1.playerGameboard.gameboardSpaces[x][y] === null ||
         player1.playerGameboard.gameboardSpaces[x][y] instanceof Ship
      );
   }

   function getComputerChoice() {
      let x = Math.floor(Math.random() * 10);
      let y = Math.floor(Math.random() * 10);
      return [x, y];
   }

   function startComputerGame(p1, p2) {
      player1 = p1;
      player2 = p2;
      player1.playerGameboard.randomizeShipPlacement();
      player2.playerGameboard.randomizeShipPlacement();
      playerTurn = player1;
      gameOver = false;
      typeOfGame = "computerGame";
      renderGameboards();
   }

   const newGame = document.getElementById("randomize");
   newGame.addEventListener("click", () => {
      startComputerGame(player1, player2);
      newGame.style.display = "none";
      twoPlayerButton.style.display = "none";
   });

   return {};
})();
