export class Ship {
   constructor(size) {
      this.size = size;
      this.hits = 0;
   }

   hit() {
      this.hits++;
   }

   isSunk() {
      if (this.hits >= this.size) {
         return true;
      } else {
         return false;
      }
   }
}

function Gameboard() {
   // Initialize 10x10 gameboard
   let gameboardSpaces = [];
   for (let i = 0; i < 10; i++) {
      gameboardSpaces[i] = [];
      for (let j = 0; j < 10; j++) {
         gameboardSpaces[i][j] = null;
      }
   }

   // Ships tracking
   let ships = [];

   // Place ship at coordinate
   function placeShip(ship, ...coordinates) {
      if (ship.size !== coordinates.length) {
         throw Error("Number of coordinates must match ship length");
      }

      for (let i = 0; i < ship.size; i++) {
         let [x, y] = coordinates[i];
         gameboardSpaces[x][y] = ship;
      }

      // Add ship
      ships.push(ship);
   }

   // Recieve attack function
   function receiveAttack([x, y]) {
      if (gameboardSpaces[x][y] instanceof Ship) {
         let shipHit = gameboardSpaces[x][y];
         shipHit.hit();
         gameboardSpaces[x][y] = "ship already hit";
         return `Ship hit! Ship health: ${shipHit.size - shipHit.hits}`;
      } else if (gameboardSpaces[x][y] === "ship already hit") {
         return "Ship already hit there!";
      } else if (gameboardSpaces[x][y] === "miss") {
         return "That shot already missed!";
      } else {
         gameboardSpaces[x][y] = "miss";
         return "Missed!";
      }
   }

   // Generate random coordinates for ship placement
   function getRandomCoordinates(size, horizontal = true) {
      const x = Math.floor(Math.random() * 10);
      const y = Math.floor(Math.random() * 10);

      let coordinates = [];
      for (let i = 0; i < size; i++) {
         if (horizontal) {
            if (y + i < 10) {
               coordinates.push([x, y + i]);
            } else {
               return getRandomCoordinates(size, horizontal); // Retry if out of bounds
            }
         } else {
            if (x + i < 10) {
               coordinates.push([x + i, y]);
            } else {
               return getRandomCoordinates(size, horizontal); // Retry if out of bounds
            }
         }
      }
      return coordinates;
   }

   // Randomize ship placement on the gameboard
   function randomizeShipPlacement() {
      const ships = [
         new Ship(5),
         new Ship(4),
         new Ship(3),
         new Ship(3),
         new Ship(2),
      ];

      ships.forEach((ship) => {
         let coordinates;
         let horizontal = Math.random() > 0.5; // Randomly choose orientation

         do {
            coordinates = getRandomCoordinates(ship.size, horizontal);
         } while (!canPlaceShip(coordinates));

         placeShip(ship, ...coordinates);
      });
   }

   // Check if a ship can be placed at the given coordinates
   function canPlaceShip(coordinates) {
      // Check if all coordinates are within bounds and not already occupied
      for (const [x, y] of coordinates) {
         if (
            x < 0 ||
            x >= 10 ||
            y < 0 ||
            y >= 10 ||
            gameboardSpaces[x][y] !== null
         ) {
            return false;
         }
      }

      // Check the surrounding area
      const directions = [
         [-1, -1],
         [-1, 0],
         [-1, 1],
         [0, -1],
         [0, 1],
         [1, -1],
         [1, 0],
         [1, 1],
      ];

      for (const [x, y] of coordinates) {
         for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (
               nx >= 0 &&
               nx < 10 &&
               ny >= 0 &&
               ny < 10 &&
               gameboardSpaces[nx][ny] instanceof Ship
            ) {
               return false;
            }
         }
      }

      return true;
   }

   return {
      gameboardSpaces,
      placeShip,
      receiveAttack,
      randomizeShipPlacement,
      ships,
   };
}

export class Player {
   constructor(name) {
      this.name = name;
      this.playerGameboard = Gameboard();
   }
}
