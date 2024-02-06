export interface ISymbol {
  id: number;
  xStart: number;
  yStart: number;
  yEnd: number;
  isWin: boolean;
  width: number;
  height: number;
  isAddSymbol: boolean;
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
  private static yStart: number = 0;
  private static yEnd: number = 550;
  private static rowCounter: number = 0;
  private static columnCounter: number = 0;
  private static resultGameField: Array<Array<ISymbol>> = [];
  private static winCombinationCount: { [id: number]: number } = {};
  private static columnsInNeedOfSymbols: Array<number> = [];

  public static async spinCycle(): Promise<Array<Array<ISymbol>>> {
    this.clearLastResults();
    this.generateGameField();
    this.createSymbolsPosition();

    console.log('spinCycle', this.resultGameField.slice());
    debugger;
    return this.resultGameField.slice();
  }

  private static clearLastResults(): void {
    this.gameField = [];
    this.resultGameField = [];
    this.winCombinationCount = {};
    this.columnsInNeedOfSymbols = [];
    this.xStart = 350;
    this.yStart = 0;
    this.yEnd = 550;
    this.rowCounter = 0;
    this.columnCounter = 0;
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

    console.log('generateGameField', newGameField.slice());
    debugger;
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
          yStart: this.yStart,
          yEnd: yEnd,
          isWin: false,
          width: 100,
          height: 100,
          isAddSymbol: false,
        };

        symbolsPositionArr[i].push(symbolInfo);
        this.rowCounter++;
      }
      this.columnCounter++;
    });

    console.log('createSymbolsPosition', symbolsPositionArr.slice());
    debugger;
    this.resultGameField = symbolsPositionArr.slice();
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
          this.yStart -= 1000;
          this.yEnd -= 100;
          if (axisInfo.columnCounter === 0) {
            this.yEnd = 550;
          }
        } else {
          this.yStart = 0;
          this.yEnd = 550;
          this.columnCounter = 0;
        }

        return this.yEnd;
    }

    return this.xStart;
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

    const fieldAfterCheckWin = this.resultGameField.map(
      (arr: Array<ISymbol>) => {
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
      },
    );

    console.log('checkWinSymbols', fieldAfterCheckWin.slice());
    debugger;

    this.resultGameField = fieldAfterCheckWin.slice();

    return this.resultGameField;
  }

  public static async omitSymbols(): Promise<Array<Array<ISymbol>> | any> {
    const currentField = this.resultGameField.slice().reverse(); // reverse for sync symbols position
    const yOmit = 100;

    for (let i = 0; i < currentField.length - 1; i++) {
      let yoffset = 0;
      let shiftCharacterInArray = 0;
      for (let g = currentField.length - 1; g >= 0; g--) {
        const currentSymbol = currentField[g][i];

        if (currentSymbol.isWin) {
          currentSymbol.isAddSymbol = true;
          yoffset += yOmit;
          [currentField[g][i], currentField[g + shiftCharacterInArray][i]] = [
            currentField[g + shiftCharacterInArray][i],
            currentField[g][i],
          ];
        } else {
          if (!currentSymbol.isWin && yoffset > 0) {
            currentSymbol.yEnd += yoffset;
            shiftCharacterInArray += yoffset / yOmit;
          }
          if (!currentSymbol.isWin && yoffset === 0) {
            currentSymbol.yStart = currentSymbol.yEnd;
          }
        }
        if (g === 0) {
          this.columnsInNeedOfSymbols.push(yoffset / yOmit);
        }
      }
    }

    console.log('omitSymbols', currentField.slice());
    debugger;

    this.resultGameField = currentField.slice().reverse();

    return this.resultGameField;
  }

  public static async goodnessOfCharacters(): Promise<Array<Array<ISymbol>>> {
    const currentField = this.resultGameField.slice().reverse();
    const yOmit = 100;
    const correctNumForY = 50;

    for (let i = 0; i < currentField.length - 1; i++) {
      for (let g = currentField.length - 1; g >= 0; g--) {
        const currentSymbol = currentField[g][i];

        if (currentSymbol.isAddSymbol) {
          currentSymbol.yEnd =
            yOmit * this.columnsInNeedOfSymbols[i] - correctNumForY;

          this.columnsInNeedOfSymbols[i] -= 1;
          currentSymbol.isWin = false;
          currentSymbol.isAddSymbol = false;
        }
      }
    }

    console.log('goodnessOfCharacters', currentField.slice());
    debugger;

    this.resultGameField = currentField.slice().reverse();

    return this.resultGameField;
  }
}

export default GenerateSpinCycle;
