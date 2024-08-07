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

export function Gameboard () {
   // Initialize 10x10 gameboard
   let gameboardSpaces = [];
   for (let i = 0; i < 10; i++) {
      gameboardSpaces[i] = [];
      for (let j = 0; j < 10; j++) {
         gameboardSpaces[i][j] = null;
      }
   }

   //

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
   }

   // Recieve attack function
   function receiveAttack(coordinates) {
      let x = coordinates[0];
      let y = coordinates[1];
      if (gameboardSpaces[x][y] !== null) {
         let shipHit = gameboardSpaces[x][y];
         shipHit.hit();
         return `Ship hit! Ship health: ${shipHit.size - shipHit.hits}`;
      } else {
         gameboardSpaces[x][y] = "miss";
         return "Missed!";
      }
   }

   return { gameboardSpaces, placeShip, receiveAttack };
};
