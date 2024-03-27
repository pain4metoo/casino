export interface ISymbol {
  idForReactKey: number;
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

export enum Stages {
  STARTING = 'startingStage',
  INIT = 'initStage',
  WIN = 'winStage',
  OMIT = 'omitStage',
  ADDITION = 'additionStage',
}

interface IAxisInfo {
  axis: Axis;
  rowCounter: number;
  columnCounter: number;
}

interface IStagesPlayingField {
  startingStage: Array<Array<ISymbol>>;
  initStage: Array<Array<ISymbol>>;
  winStage: Array<Array<ISymbol>>;
  omitStage: Array<Array<ISymbol>>;
  additionStage: Array<Array<ISymbol>>;
}

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

  private static winCombinationCount: { [id: number]: number } = {};
  private static columnsInNeedOfSymbols: Array<number> = [];
  private static gameField: Array<Array<number>>;
  private static defaultField: Array<Array<number>> = [
    [1, 2, 3, 4, 5, 6],

    [1, 2, 3, 4, 5, 6],

    [1, 2, 3, 4, 5, 6],

    [1, 2, 3, 4, 5, 6],

    [7, 8, 9, 10, 10, 10],
  ];

  private static stagesPlayingField: IStagesPlayingField = {
    startingStage: [],
    initStage: [],
    winStage: [],
    omitStage: [],
    additionStage: [],
  };

  public static getStage(stage: Stages): Array<Array<ISymbol>> {
    return this.stagesPlayingField[stage];
  }

  public static spinCycle(): Array<Array<ISymbol>> {
    this.clearLastResults();
    this.generateGameField();

    return this.stagesPlayingField.initStage;
  }

  private static clearLastResults(): void {
    this.gameField = [];
    this.winCombinationCount = {};
    this.columnsInNeedOfSymbols = [];
    this.xStart = this.xStartDefault;
    this.yStart = this.yStartDefault;
    this.yEnd = this.yEndDefault;
    this.rowCounter = 0;
    this.columnCounter = 0;
    this.stagesPlayingField.initStage = [];
    this.stagesPlayingField.winStage = [];
    this.stagesPlayingField.omitStage = [];
    this.stagesPlayingField.additionStage = [];
  }

  public static generateDefaultField(): Array<Array<ISymbol>> {
    this.createSymbolsPosition(true);

    return this.stagesPlayingField[Stages.STARTING];
  }

  private static generateGameField(): void {
    const newGameField: Array<Array<number>> = [
      [2, 6, 9, 9, 8, 4],

      [2, 9, 5, 7, 8, 8],

      [4, 6, 7, 4, 9, 8],

      [5, 9, 4, 7, 5, 7],

      [4, 5, 7, 10, 6, 4],
    ];

    // for (let i = 0; i < this.maxRowCount; i++) {
    //   // generate column
    //   newGameField.push([]);
    //   for (let g = 0; g < this.symbolsInColumn; g++) {
    //     // generate numbers
    //     newGameField[i].push(this.generateRandomNumber());
    //   }
    // }

    this.gameField = newGameField;

    console.log('generateGameField', newGameField);
    // debugger;

    this.createSymbolsPosition();
  }

  private static generateRandomNumber(): number {
    const randomSymbol = Math.ceil(Math.random() * this.symbolsCount);

    return randomSymbol;
  }

  private static createSymbolsPosition(isStartingField?: boolean): void {
    const currField = isStartingField ? this.defaultField : this.gameField;
    const symbolsPositionArr: Array<Array<ISymbol>> = [];
    let idForReactKey = 0;

    currField.forEach((arr: Array<number>, i) => {
      symbolsPositionArr.push([]);

      const xStart = this.calculateCoordinate({
        axis: Axis.x,
        rowCounter: this.rowCounter,
        columnCounter: this.columnCounter,
      });

      for (let g = 0; g < arr.length; g++) {
        idForReactKey += 1;
        const yEnd = this.calculateCoordinate({
          axis: Axis.y,
          rowCounter: this.rowCounter,
          columnCounter: this.columnCounter,
        });

        this.winCombinatinCounter(arr[g]);

        const symbolInfo: ISymbol = {
          idForReactKey,
          id: arr[g],
          xStart: xStart,
          yStart: isStartingField ? this.yEnd : this.yStart,
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

    if (isStartingField) {
      this.stagesPlayingField.startingStage = symbolsPositionArr;
      this.clearLastResults();
      return;
    }

    this.stagesPlayingField.initStage = symbolsPositionArr;

    console.log('createSymbolsPosition', this.stagesPlayingField.initStage);
    // debugger;

    this.checkWinSymbols();
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

  public static async checkWinSymbols(): Promise<void> {
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

    const fieldAfterCheckWin = this.getStage(Stages.INIT).map(
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

    this.stagesPlayingField.winStage = fieldAfterCheckWin;

    console.log('checkWinSymbols', this.stagesPlayingField.winStage);
    // debugger;

    this.omitSymbols();
  }

  public static async omitSymbols(): Promise<void> {
    const currentField: Array<Array<ISymbol>> = this.createCopyObjects(
      this.getStage(Stages.WIN),
    );

    const yOmit = 100;

    for (let i = 0; i < currentField.length; i++) {
      let yoffset = 0;

      for (let g = currentField[i].length - 1; g >= 0; g--) {
        let currentSymbol: any = currentField[i][g];

        if (currentSymbol.isWin) {
          yoffset += yOmit;
        } else {
          if (!currentSymbol.isWin && yoffset > 0) {
            const offsetFromEndArr = yoffset / yOmit;
            currentSymbol.yStart =
              this.stagesPlayingField.winStage[i][g + offsetFromEndArr].yStart;

            currentSymbol.yEnd =
              this.stagesPlayingField.winStage[i][g + offsetFromEndArr].yEnd;
          }
        }

        if (g === 0) {
          this.columnsInNeedOfSymbols.push(yoffset / yOmit);
        }
      }
    }

    this.stagesPlayingField.omitStage = currentField.map(
      (arr: Array<ISymbol>) => arr.filter((sym: ISymbol) => !sym.isWin),
    ); // delete win symbols

    console.log('omitSymbols', this.stagesPlayingField.omitStage);
    // debugger;

    this.generationAdditionalSymbols();
  }

  public static async generationAdditionalSymbols(): Promise<void> {
    const currentField: Array<Array<ISymbol>> = this.createCopyObjects(
      this.getStage(Stages.OMIT),
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
            idForReactKey: 0, // TODO
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

    this.stagesPlayingField.additionStage = currentField;

    console.log(
      'generationAdditionalSymbols',
      this.stagesPlayingField.additionStage,
    );
  }

  private static createCopyObjects(
    arr: Array<Array<ISymbol>>,
  ): Array<Array<ISymbol>> {
    return arr.map((array: Array<ISymbol>) =>
      array.map((symbol: ISymbol) => ({ ...symbol })),
    );
  }
}

export default GenerateSpinCycle;
