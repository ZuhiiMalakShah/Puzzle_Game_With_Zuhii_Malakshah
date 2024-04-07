#!/usr/bin/env node
class PuzzleGame {
    boardSize;
    board;
    emptyTile;
    constructor(size) {
        this.boardSize = size;
        this.board = this.generateBoard();
        this.emptyTile = { row: this.boardSize - 1, col: this.boardSize - 1 };
        this.shuffleBoard(1000); // Shuffle the board initially
    }
    generateBoard() {
        const board = [];
        let counter = 1;
        for (let i = 0; i < this.boardSize; i++) {
            const row = [];
            for (let j = 0; j < this.boardSize; j++) {
                row.push(counter++);
            }
            board.push(row);
        }
        board[this.boardSize - 1][this.boardSize - 1] = 0; // Empty tile represented by 0
        return board;
    }
    shuffleBoard(numMoves) {
        const directions = [
            { row: 0, col: 1 }, // right
            { row: 0, col: -1 }, // left
            { row: 1, col: 0 }, // down
            { row: -1, col: 0 }, // up
        ];
        for (let i = 0; i < numMoves; i++) {
            const randomDirection = directions[Math.floor(Math.random() * directions.length)];
            const newRow = this.emptyTile.row + randomDirection.row;
            const newCol = this.emptyTile.col + randomDirection.col;
            if (this.isValidMove(newRow, newCol)) {
                this.swapTiles(this.emptyTile.row, this.emptyTile.col, newRow, newCol);
                this.emptyTile = { row: newRow, col: newCol };
            }
        }
    }
    isValidMove(row, col) {
        return row >= 0 && row < this.boardSize && col >= 0 && col < this.boardSize;
    }
    swapTiles(row1, col1, row2, col2) {
        const temp = this.board[row1][col1];
        this.board[row1][col1] = this.board[row2][col2];
        this.board[row2][col2] = temp;
    }
    moveTile(row, col) {
        if (this.isValidMove(row, col)) {
            if ((Math.abs(row - this.emptyTile.row) === 1 && col === this.emptyTile.col) ||
                (Math.abs(col - this.emptyTile.col) === 1 && row === this.emptyTile.row)) {
                this.swapTiles(row, col, this.emptyTile.row, this.emptyTile.col);
                this.emptyTile = { row, col };
                this.printBoard();
                if (this.isSolved()) {
                    console.log("Congratulations! You solved the puzzle!");
                }
            }
            else {
                console.log("Invalid move!");
            }
        }
        else {
            console.log("Invalid move!");
        }
    }
    isSolved() {
        let counter = 1;
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                if (this.board[i][j] !== counter++ % (this.boardSize * this.boardSize)) {
                    return false;
                }
            }
        }
        return true;
    }
    printBoard() {
        console.log("Current Board:");
        for (let i = 0; i < this.boardSize; i++) {
            console.log(this.board[i].join(" "));
        }
        console.log("\n");
    }
}
// Example Usage:
const puzzle = new PuzzleGame(3);
puzzle.printBoard();
puzzle.moveTile(2, 2);
puzzle.moveTile(2, 1);
puzzle.moveTile(2, 0);
puzzle.moveTile(1, 0);
puzzle.moveTile(0, 0);
export {};
