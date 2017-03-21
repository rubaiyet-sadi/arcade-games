
export class Position {
    x?: number;
    y?: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    getNearbyPositions() {
        let adjuscentCells: Position[] = [];
        if (!this.isValid()) {
            return adjuscentCells;
        }
        for (let i = this.x - 1; i <= this.x + 1; i++) {
            for (let j = this.y - 1; j <= this.y + 1; j++) {
                if (i === this.x && j === this.y) {
                    continue;
                }
                adjuscentCells.push(new Position(i, j));
            }
        }
        return adjuscentCells;
    }
    isValid() {
        return this.x != null && this.y != null;
    }
}
export class EmptyPosition extends Position {
    constructor() { super(null, null); }
}

export class MinesweeperCell {
    protected _isValid: boolean;
    position: Position;
    isCovered: boolean;
    hasMine: boolean;
    isFlaged: boolean;
    nearBy: number;

    private step: number;

    constructor(position: Position) {
        this.position = position;
        this.step = 1;
        this.isCovered = true;
        this.isFlaged = false;
        this.hasMine = false;
        this.nearBy = 0;
        this._isValid = true;
    }
    increaseNearby() {
        this.nearBy++;
    }
    isNearbyVisible() {
        return !this.hasMine && this.nearBy > 0 && !this.isCovered;
    }
    getNearByValue() {
        return this.nearBy > 0 ? this.nearBy : null;
    }
    isValid() { return this._isValid; }
}

export class InvalidCell extends MinesweeperCell {
    constructor() {
        super(new EmptyPosition());
        this._isValid = false;
    }
    increaseNearby() { }
}

export class UncoveredCell extends MinesweeperCell {
    constructor(position: Position) {
        super(position);
        this.isCovered = false;
    }
}

export class MineCell extends MinesweeperCell {
    constructor(position: Position) {
        super(position);
        this.hasMine = true;
    }
    increaseNearby() { }
}

export class SafeCell extends MinesweeperCell {
    constructor(position: Position) {
        super(position);
    }
}


export class MinesweeperBoard {
    rowSize: number;
    columnSize: number;
    isGameOver: boolean;

    private numberOfMines: number;
    private cells: MinesweeperCell[][];

    constructor(rowSize: number, columnSize: number, numberOfMines: number) {
        this.rowSize = rowSize;
        this.columnSize = columnSize;
        this.numberOfMines = numberOfMines;
        this.isGameOver = false;
        this.initCells();
    }

    private initCells() {
        this.cells = [];
        for (let i = 0; i < this.rowSize; i++) {
            this.setRow(i, []);
            for (let j = 0; j < this.columnSize; j++) {
                let position = new Position(i, j);
                let cell = new MinesweeperCell(position);

                this.setCell(cell);
            }
        }
    }

    getCell(x?: number, y?: number) {
        return this.isOutOfBoard(x, y)
            ? new InvalidCell()
            : this.cells[x][y];
    }
    private setCell(cell: MinesweeperCell) {
        this.cells[cell.position.x][cell.position.y] = cell;
    }

    private setRow(x: number, cells: MinesweeperCell[]) {
        this.cells[x] = cells;
    }

    private isOutOfBoard(x?: number, y?: number) {
        return x == null || x < 0 || x >= this.rowSize ||
            y == null || y < 0 || y >= this.columnSize;
    }

    landOn(cell: MinesweeperCell) {
        if (cell.hasMine) {
            this.isGameOver = true;
            this.revealAll();
        } else {
            this.reveal(cell);
        }
    }
    reveal(cell: MinesweeperCell) {
        cell = this.getCell(cell.position.x, cell.position.y);
        if (!cell.isValid || !cell.isCovered || cell.hasMine) {
            return;
        }
        cell.isCovered = false;

        if (cell.nearBy > 0) {
            return;
        }

        for (let position of cell.position.getNearbyPositions()) {
            let nearByCell = this.getCell(position.x, position.y);
            if (nearByCell.isValid && nearByCell.isCovered) {
                this.reveal(nearByCell);
            }
        }
    }

    revealAll() {
        for (let row of this.cells) {
            for (let cell of row) {
                cell.isCovered = false;
            }
        }
    }


    setFlagged(x: number, y: number) {
        // if (!this.isValidCell(x, y)) return;
    }


    setMine(x: number, y: number) {
        let cell = new MineCell(new Position(x, y));
        this.setCell(cell);
        this.updateNearbyCount(cell);
    }

    private updateNearbyCount(cell: MinesweeperCell) {
        let nearbyPositions = cell.position.getNearbyPositions();
debugger;
        for (let position of nearbyPositions) {
            this.getCell(position.x, position.y).increaseNearby();
        }
    }

   
}


