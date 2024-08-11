# Battleship Game
===============

Welcome to the Battleship game repository! This project is a classic two-player game of Battleship, implemented using HTML, CSS, and JavaScript. The game allows for both player-vs-player and player-vs-computer modes.

Table of Contents
-----------------

-   [Project Overview](#project-overview)
-   [Features](#features)
-   [Setup](#setup)
-   [Usage](#usage)
-   [Testing](#testing)
-   [License](#license)

Project Overview
----------------

This repository contains the files necessary to run a simple Battleship game in your browser. The project includes:

-   `index.html`: The main HTML file that sets up the game's user interface.
-   `style.css`: The CSS file for styling the game's layout and appearance.
-   `battleship.js`: The JavaScript file containing the core logic for the game, including classes for `Ship`, `Gameboard`, and `Player`.
-   `main.js`: The JavaScript file responsible for the game's user interface interactions and game logic.
-   `index.test.js`: Unit tests for the `battleship.js` file, ensuring the correctness of game functionalities.
-   `package.json`: The npm package configuration, including testing scripts.
-   `LICENSE`: The project's license file.

Features
--------

-   **Two-Player Mode**: Play against another person on the same device.
-   **Computer Mode**: Play against an AI with basic decision-making capabilities.
-   **Ship Placement**: Randomized placement of ships on the game board.
-   **Attack Mechanics**: Users can click on the opponent's board to attack and receive feedback on hits or misses.
-   **Game Over Detection**: The game detects when a player has lost all their ships and displays the result.

Setup
-----

To get started with this project, follow these steps:

1.  **Clone the Repository:**

    bash

    Copy code

    `git clone https://github.com/yourusername/battleship.git
    cd battleship`

2.  **Install Dependencies:** If you plan to run the tests, you need to install the development dependencies:

    bash

    Copy code

    `npm install`

Usage
-----

1.  **Open the Game:** Open `index.html` in your web browser to start playing the game.

2.  **Start a Game:**

    -   Click on "New Game" to begin a player vs. computer game.
    -   Click on "Two Player Game" to start a game with another player.
3.  **Play the Game:**

    -   Click on the squares of the opponent's board to attack.
    -   The game will indicate hits, misses, and whether the game is over.
4.  **End of Game:**

    -   If you are playing against the computer, the game will automatically reset when one player loses.
    -   In two-player mode, you will see an overlay message prompting to pass the device to the other player.

Testing
-------

To run the tests for this project, use the following command:

bash

Copy code

`npm test`

This will run the Jest test suite and verify the functionality of the game logic.

License
-------

This project is licensed under the MIT License. See the <LICENSE> file for more details.

Check out live demo <https://rastko27.github.io/battleship/>

Made by Rastko Strbac @2024