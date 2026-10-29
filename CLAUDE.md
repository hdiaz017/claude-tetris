# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands
Since this is a vanilla JavaScript project with no build process, there are no build or lint commands.

**Running the game:**
The easiest way to run the game is using a local static server:
- Using Python: `python3 -m http.server 8000`
- Using Node.js: `npx serve .`
Then open `http://localhost:8000` in a browser.

Alternatively, open `index.html` directly in a browser.

## Architecture & Structure
The project is a simple client-side application consisting of three main files:

- `index.html`: Defines the DOM structure, including the main game canvas (`#board`), a preview canvas for the next piece, and UI overlays for Pause and Game Over.
- `style.css`: Provides a dark/retro arcade aesthetic using CSS variables, flexbox, and backdrop filters.
- `game.js`: Contains all game logic, including:
    - **Game State**: Board represented as a 2D array (`ROWS` x `COLS`).
    - **Piece Management**: Tetromino definitions, rotation logic (transposition + row reversal), and wall-kick implementation (`tryRotate`).
    - **Game Loop**: Driven by `requestAnimationFrame`, managing timing for piece drops (`dropInterval`) and rendering.
    - **Physics & Rules**: Collision detection (`collide`), line clearing (`clearLines`), and a scoring system based on lines cleared and levels.
    - **Rendering**: Uses the Canvas 2D API to draw the grid, fixed blocks, the active piece, and a "ghost piece" projection.
