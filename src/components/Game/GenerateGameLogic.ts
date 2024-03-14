export interface ISymbol {
  id: number;
  xStart: number;
  yStart: number;
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

// interface IStagesPlayingField {
//   initStage: Array<Array<ISymbol>>;
//   winStage: Array<Array<ISymbol>>;
//   omitStage: Array<Array<ISymbol>>;
//   additionStage: Array<Array<ISymbol>>;
// }

class GenerateSpinCycle {
  private static symbolsInColumn: number = 6;
  private static maxRowCount: number = 5;
  private static symbolsCount: number = 10;
  private static rowCounter: number = 0;
  private static columnCounter: number = 0;

  private static xStart: number = 350;
  private static yStart: number = -550;
  private static yEnd: number = 50;

  private static xStartDefault: number = 350;
  private static yStartDefault: number = -550;
  private static yEndDefault: number = 50;

  private static resultGameField: Array<Array<ISymbol>> = [];
  private static winCombinationCount: { [id: number]: number } = {};
  private static columnsInNeedOfSymbols: Array<number> = [];
  private static gameField: Array<Array<number>>;

  // private static stagesPlayingField: IStagesPlayingField = {
  //   initStage: [],
  //   winStage: [],
  //   omitStage: [],
  //   additionStage: [],
  // };

  public static async spinCycle(): Promise<Array<Array<ISymbol>>> {
    this.clearLastResults();
    this.generateGameField();
    this.createSymbolsPosition();

    return this.resultGameField.slice();
  }

  private static clearLastResults(): void {
    this.gameField = [];
    this.resultGameField = [];
    this.winCombinationCount = {};
    this.columnsInNeedOfSymbols = [];
    this.xStart = this.xStartDefault;
    this.yStart = this.yStartDefault;
    this.yEnd = this.yEndDefault;
    this.rowCounter = 0;
    this.columnCounter = 0;
  }

  private static async generateGameField(): Promise<void> {
    const newGameField: Array<Array<number>> = [];

    for (let i = 0; i < this.maxRowCount; i++) {
      // generate column
      newGameField.push([]);
      for (let g = 0; g < this.symbolsInColumn; g++) {
        // generate numbers
        newGameField[i].push(this.generateRandomNumber());
      }
    }

    this.gameField = newGameField;

    console.log('generateGameField', this.gameField);
    // debuger;
  }

  private static generateRandomNumber(): number {
    const randomSymbol = Math.ceil(Math.random() * this.symbolsCount);

    return randomSymbol;
  }

  private static async createSymbolsPosition(): Promise<void> {
    const symbolsPositionArr: Array<Array<ISymbol>> = [];

    this.gameField.forEach((arr: Array<number>, i) => {
      symbolsPositionArr.push([]);

      const xStart = this.calculateCoordinate({
        axis: Axis.x,
        rowCounter: this.rowCounter,
        columnCounter: this.columnCounter,
      });

      for (let g = 0; g < arr.length; g++) {
        const yEnd = this.calculateCoordinate({
          axis: Axis.y,
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
        };

        symbolsPositionArr[i].push(symbolInfo);
        this.columnCounter++;
      }
      this.rowCounter++;
    });

    // this.stagesPlayingField.initStage = symbolsPositionArr;
    this.resultGameField = symbolsPositionArr;

    console.log('createSymbolsPosition', this.resultGameField);
    // debuger;
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
          this.yStart -= 100;
          if (axisInfo.rowCounter === 0) {
            this.xStart = 350;
            this.yStart += 100;
          }
        } else {
          this.rowCounter = 0;
          this.xStart = 350;
        }

        return this.xStart;
      case 'Y':
        if (axisInfo.columnCounter < this.symbolsInColumn) {
          this.yEnd += 100;
          this.yStart += 100;
          if (axisInfo.columnCounter === 0) {
            this.yEnd = 50;
            this.yStart -= 100;
          }
        } else {
          this.yEnd = 50;
          this.columnCounter = 0;
          this.yStart = this.yStart + this.yStartDefault;
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
            return { ...symbol, isWin: false };
          }
        });
      },
    );

    // this.stagesPlayingField.winStage = fieldAfterCheckWin;
    this.resultGameField = fieldAfterCheckWin;

    console.log('checkWinSymbols', this.resultGameField);
    // debuger;

    return this.resultGameField;
  }

  public static async omitSymbols(): Promise<Array<Array<ISymbol>>> {
    const copyCurrFieldForCoordinates: Array<Array<ISymbol>> =
      this.resultGameField.map((arr: Array<ISymbol>) =>
        arr.map((sym: ISymbol) => ({ ...sym })),
      );

    const currentField: Array<Array<ISymbol>> = this.resultGameField;

    const yOmit = 100;

    for (let i = 0; i < currentField.length; i++) {
      let yoffset = 0;
      // let queue: any = [];

      for (let g = currentField[i].length - 1; g >= 0; g--) {
        let currentSymbol: any = currentField[i][g];

        if (currentSymbol.isWin) {
          yoffset += yOmit;

          // queue.push(currentSymbol);
        } else {
          if (!currentSymbol.isWin && yoffset > 0) {
            const offsetFromEndArr = yoffset / yOmit;
            currentSymbol.yStart =
              copyCurrFieldForCoordinates[i][g + offsetFromEndArr].yStart;

            currentSymbol.yEnd =
              copyCurrFieldForCoordinates[i][g + offsetFromEndArr].yEnd;
          }
        }

        if (g === 0) {
          this.columnsInNeedOfSymbols.push(yoffset / yOmit);
        }
      }
      // currentField[i] = currentField[i].filter((obj: ISymbol) => !obj.isWin);
      // if (queue.length > 0) {
      //

      //   for (let d = queue.length - 1; d >= 0; d--) {
      //     queue[0].yStart = this.yStartDefault + yOmit * (queue.length - 1);
      //     queue[0].yEnd = this.yEndDefault + yOmit * (queue.length - 1);

      //     currentField[i].unshift(queue.shift());
      //   }
      // }
    }

    // this.stagesPlayingField.omitStage = currentField;
    this.resultGameField = currentField;

    console.log('omitSymbols', this.resultGameField);
    // debuger;

    return this.resultGameField;
  }

  public static async generationAdditionalSymbols(): Promise<
    Array<Array<ISymbol>>
  > {
    const currentField: Array<Array<ISymbol>> = this.resultGameField.map(
      (arr: Array<ISymbol>) => arr.filter((sym: ISymbol) => !sym.isWin),
    );

    const yOmit = 100;

    for (let i = 0; i < this.columnsInNeedOfSymbols.length; i++) {
      let yCounter = this.columnsInNeedOfSymbols[i] * yOmit;
      if (this.columnsInNeedOfSymbols[i] > 0) {
        for (let g = 0; g < this.columnsInNeedOfSymbols[i]; g++) {
          const calcXStart =
            i === 0 ? this.xStartDefault : this.xStartDefault + 100 * i;
          const calcYStart =
            i === 0 ? this.yStartDefault : this.yStartDefault - 100 * i;

          const calcYEnd = yCounter - 50;

          const newSymbol: ISymbol = {
            id: this.generateRandomNumber(),
            xStart: calcXStart,
            yStart: calcYStart,
            yEnd: calcYEnd,
            isWin: false,
            width: 100,
            height: 100,
          };

          currentField[i].unshift(newSymbol);
          yCounter -= 100;
        }
      }
    }

    // this.stagesPlayingField.additionStage = currentField;
    this.resultGameField = currentField;

    console.log('generationAdittionalSymbols', this.resultGameField);
    // debuger;

    return this.resultGameField;
  }
}

export default GenerateSpinCycle;
