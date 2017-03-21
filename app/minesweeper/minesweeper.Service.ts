import { Position, MinesweeperBoard, MinesweeperCell } from './minesweeper';

import { Injectable } from '@angular/core';


@Injectable()
export class MinesweeperService {
    buildNewGame(size: number, numberOfMines: number) {
        let minesweeperBoard = new MinesweeperBoard(size, size, numberOfMines);
        this.fillMines(minesweeperBoard, numberOfMines);
        return minesweeperBoard;
    }

    fillMines(boardGame: MinesweeperBoard, numberOfMines: number) {

        // boardGame.setMine(2, 6);
        // boardGame.setMine(2, 4);
        // boardGame.setMine(2, 5);

        // boardGame.setMine(1, 1);
        // boardGame.setMine(4, 6);
        // boardGame.setMine(4, 4);
        // boardGame.setMine(4, 5);
        // boardGame.setMine(2, 8);
        // return;

        let currentMines = 0;

        while (currentMines < numberOfMines)
        {
            let x = this.getRandom(boardGame.rowSize);
            let y = this.getRandom(boardGame.columnSize);
            if (boardGame.getCell(x, y).hasMine){
                continue;
            }
            currentMines++;
            boardGame.setMine(x, y);
        }
    }
    getRandom(limit: number) {
        return Math.floor(Math.random() * 1000) % limit;
    }
}
