import { Ship } from "./index.js";
import { Gameboard } from "./index.js";

describe("Ship isSunk tests", () => {
   test("ship is sunk after one hit : false", () => {
      const ship = new Ship(5);
      ship.hit();
      expect(ship.isSunk()).toBe(false);
   });

   test("ship is sunk after 5 hits : true", () => {
      const ship = new Ship(5);
      ship.hit();
      ship.hit();
      ship.hit();
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBe(true);
   });
});

describe("Gameboard ship placement tests", () => {
   let gameboard;

   beforeEach(() => {
      gameboard = Gameboard();
   });

   test("ship placement", () => {
      const ship = new Ship(3);
      gameboard.placeShip(ship, [2, 4], [2, 5], [2, 6]);
      expect(gameboard.gameboardSpaces[2][4]).toEqual(ship);
   });

   test("ship placement throw error", () => {
      const ship = new Ship(3);
      expect(() => {
         gameboard.placeShip(ship, [2, 4], [2, 5], [2, 6], [2, 7]);
      }).toThrow("Number of coordinates must match ship length");
   });
});

describe("Gameboard receiveAttack tests", () => {
   let gameboard;

   beforeEach(() => {
      gameboard = Gameboard();
   });

   test("ship hits after attack", () => {
      const ship = new Ship(5);
      gameboard.placeShip(ship, [2, 4], [2, 5], [2, 6], [2, 7], [2, 8]);
      gameboard.receiveAttack([2, 4]);
      expect(ship.hits).toBe(1);
   });

   test("shot missed", () => {
      const ship = new Ship(5);
      gameboard.placeShip(ship, [2, 4], [2, 5], [2, 6], [2, 7], [2, 8]);
      expect(gameboard.receiveAttack([7, 7])).toBe("Missed!");
   });
});
