import { Ship } from "./index.js";

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

describe("Gameboard test methods", () => {
   
});