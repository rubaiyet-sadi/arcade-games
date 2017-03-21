import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs/Rx';

import { MinesweeperBoard, MinesweeperCell } from './minesweeper';
import { MinesweeperService } from './minesweeper.Service';


@Component({
    styleUrls: ['app/minesweeper/minesweeper.component.css'],
    templateUrl: 'app/minesweeper/minesweeper.component.html'
})
export class MinesweeperComponent implements OnInit {
    public pageTitle = 'Minesweeper';
    ticks = 0;
    wins = 0;
    losses = 0;
    minesweeperBoard: MinesweeperBoard;
    timer = Observable.timer(1000, 1000);

    constructor(private _mineSweeperService: MinesweeperService) { }
    ngOnInit(): void {
        this.initNewGame(9, 9, 10);
    }
    startNewGame(x: number, y: number, numberOfMines: number) {
        this.initNewGame(x, y, numberOfMines);
    }
    landOn(cell: MinesweeperCell) {
        if (cell.hasMine) {
            this.losses++;
        }
        this.minesweeperBoard.landOn(cell);
    }



    private initNewGame(x: number, y: number, numberOfMines: Number) {
        this.timer.subscribe(t => this.tickerFunc(t));
        this.minesweeperBoard =
            this._mineSweeperService.buildNewGame(9, 10);
    }

    tickerFunc(tick: number) {
        if (this.minesweeperBoard.isGameOver) {
            return;
        }
        this.ticks = tick;
  }
}
