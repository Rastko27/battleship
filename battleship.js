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

function Gameboard () {
   // Initialize 10x10 gameboard
   let gameboardSpaces = [];
   for (let i = 0; i < 10; i++) {
      gameboardSpaces[i] = [];
      for (let j = 0; j < 10; j++) {
         gameboardSpaces[i][j] = null;
      }
   }

   let ships = [];

   // Place ship at coordinate
   function placeShip(ship, ...coordinates) {
      if (ship.size !== coordinates.length) {
         throw Error("Number of coordinates must match ship length");
      }

      for (let i = 0; i < ship.size; i++) {
         let x = coordinates[i][0];
         let y = coordinates[i][1];
         gameboardSpaces[x][y] = ship;
      }

      // Track ships
      ships.push(ship);
   }

   // Recieve attack function
   function receiveAttack(coordinates) {
      let x = coordinates[0];
      let y = coordinates[1];
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

   function areAllShipsSunk() {
      return ships.every(ship => ship.isSunk());
   }

   return { gameboardSpaces, placeShip, receiveAttack, areAllShipsSunk };
};

export class Player {
   constructor(name) {
      this.name = name;
      this.playerGameboard = Gameboard();
   }
}