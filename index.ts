#!/usr/bin/env node

class PuzzleGame {
    private boardSize: number;
    private board: number[][];
    private emptyTile: { row: number; col: number };
  
    constructor(size: number) {
      this.boardSize = size;
      this.board = this.generateBoard();
      this.emptyTile = { row: this.boardSize - 1, col: this.boardSize - 1 };
      this.shuffleBoard(1000); // Shuffle the board initially
    }
  
    private generateBoard(): number[][] {
      const board: number[][] = [];
      let counter = 1;
  
      for (let i = 0; i < this.boardSize; i++) {
        const row: number[] = [];
        for (let j = 0; j < this.boardSize; j++) {
          row.push(counter++);
        }
        board.push(row);
      }
  
      board[this.boardSize - 1][this.boardSize - 1] = 0; // Empty tile represented by 0
      return board;
    }
  
    private shuffleBoard(numMoves: number): void {
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
  
    private isValidMove(row: number, col: number): boolean {
      return row >= 0 && row < this.boardSize && col >= 0 && col < this.boardSize;
    }
  
    private swapTiles(row1: number, col1: number, row2: number, col2: number): void {
      const temp = this.board[row1][col1];
      this.board[row1][col1] = this.board[row2][col2];
      this.board[row2][col2] = temp;
    }
  
    public moveTile(row: number, col: number): void {
      if (this.isValidMove(row, col)) {
        if ((Math.abs(row - this.emptyTile.row) === 1 && col === this.emptyTile.col) ||
          (Math.abs(col - this.emptyTile.col) === 1 && row === this.emptyTile.row)) {
          this.swapTiles(row, col, this.emptyTile.row, this.emptyTile.col);
          this.emptyTile = { row, col };
          this.printBoard();
          if (this.isSolved()) {
            console.log("Congratulations! You solved the puzzle!");
          }
        } else {
          console.log("Invalid move!");
        }
      } else {
        console.log("Invalid move!");
      }
    }
  
    private isSolved(): boolean {
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
  
    public printBoard(): void {
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
  