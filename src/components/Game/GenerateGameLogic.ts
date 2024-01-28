export interface ISymbol {
  id: number;
  xStart: number;
  yEnd: number;
  isWin: boolean;
  width: number;
  height: number;
}

enum Axis {
  x = 'X',
  y = 'Y',
}

interface IAxisInfo {
  axis: Axis;
  rowCounter: number;
  columnCounter: number;
}

class GenerateSpinCycle {
  private static symbolsInColumn: number = 6;
  private static maxRowCount: number = 5;
  private static symbolsCount: number = 10;
  private static gameField: Array<Array<number>>;
  private static xStart: number = 350;
  private static yEnd: number = 550;
  private static rowCounter: number = 0;
  private static columnCounter: number = 0;
  private static resultGameField: Array<Array<ISymbol>> = [];
  private static winCombinationCount: { [id: number]: number } = {};

  public static async spinCycle(): Promise<Array<Array<ISymbol>>> {
    this.clearLastResults();
    this.generateGameField();
    this.createSymbolsPosition();

    return this.resultGameField;
  }

  private static clearLastResults(): void {
    this.gameField = [];
    this.resultGameField = [];
    this.winCombinationCount = {};
  }

  private static async generateGameField(): Promise<void> {
    const newGameField: Array<Array<number>> = [];

    for (let i = 0; i < this.symbolsInColumn; i++) {
      // generate column
      newGameField.push([]);
      for (let g = 0; g < this.maxRowCount; g++) {
        // generate numbers
        newGameField[i].push(this.generateRandomNumber());
      }
    }

    this.gameField = newGameField.slice();
  }

  private static generateRandomNumber(): number {
    const randomSymbol = Math.ceil(Math.random() * this.symbolsCount);

    return randomSymbol;
  }

  private static async createSymbolsPosition(): Promise<void> {
    const symbolsPositionArr: Array<Array<ISymbol>> = [];

    this.gameField.forEach((arr: Array<number>, i) => {
      symbolsPositionArr.push([]);

      const yEnd = this.calculateCoordinate({
        axis: Axis.y,
        rowCounter: this.rowCounter,
        columnCounter: this.columnCounter,
      });

      for (let g = 0; g < arr.length; g++) {
        const xStart = this.calculateCoordinate({
          axis: Axis.x,
          rowCounter: this.rowCounter,
          columnCounter: this.columnCounter,
        });

        this.winCombinatinCounter(arr[g]);

        const symbolInfo: ISymbol = {
          id: arr[g],
          xStart: xStart,
          yEnd: yEnd,
          isWin: false,
          width: 100,
          height: 100,
        };

        symbolsPositionArr[i].push(symbolInfo);
        this.rowCounter++;
      }
      this.columnCounter++;
    });

    this.resultGameField = symbolsPositionArr.reverse();
  }

  private static winCombinatinCounter(id: number) {
    if (!this.winCombinationCount[id]) {
      this.winCombinationCount[id] = 1;
    } else {
      this.winCombinationCount[id] += 1;
    }
  }

  private static calculateCoordinate(axisInfo: IAxisInfo): number {
    switch (axisInfo.axis) {
      case 'X':
        if (axisInfo.rowCounter < this.maxRowCount) {
          this.xStart += 100;
          if (axisInfo.rowCounter === 0) {
            this.xStart = 350;
          }
        } else {
          this.rowCounter = 0;
          this.xStart = 350;
        }

        return this.xStart;
      case 'Y':
        if (axisInfo.columnCounter < this.symbolsInColumn) {
          this.yEnd -= 100;
          if (axisInfo.columnCounter === 0) {
            this.yEnd = 550;
          }
        } else {
          this.yEnd = 550;
          this.columnCounter = 0;
        }

        return this.yEnd;
    }

    return this.xStart;
  }

  private static getGameField(): Array<Array<number>> {
    return this.gameField.reverse();
  }

  public static async checkWinSymbols(): Promise<Array<Array<ISymbol>>> {
    const currentWinSymbols: Array<number | undefined> = Object.entries(
      this.winCombinationCount,
    )
      .map(el => {
        if (el[1] >= 5) {
          // Check the number of characters
          return +el[0]; // return the number id
        }
      })
      .filter(el => el);

    return this.resultGameField.map((arr: Array<ISymbol>) => {
      return arr.map((symbol: ISymbol) => {
        if (currentWinSymbols.includes(symbol.id)) {
          return {
            ...symbol,
            isWin: true,
          };
        } else {
          return symbol;
        }
      });
    });
  }
}

export default GenerateSpinCycle;
