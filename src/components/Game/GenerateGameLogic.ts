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

export enum Stages {
  LOADING = 'loadingStage',
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
  loadingStage: Array<Array<ISymbol>>;
  startingStage: Array<Array<ISymbol>>;
  initStage: Array<Array<ISymbol>>;
  winStage: Array<Array<ISymbol>>;
  omitStage: Array<Array<ISymbol>>;
  additionStage: Array<Array<ISymbol>>;
}

export class GenerateSpinCycle {
  private static symbolsInColumn: number = 6;
  private static maxRowCount: number = 5;
  private static symbolsCount: number = 10;
  private static rowCounter: number = 0;
  private static columnCounter: number = 0;
  private static isWinSpin: boolean = false;

  private static xStart: number = 350;
  private static yStart: number = -550;
  private static yEnd: number = 50;

  private static xStartDefault: number = 350;
  private static yStartDefault: number = -550;
  private static yEndDefault: number = 50;

  private static columnsInNeedOfSymbols: Array<number> = [];
  private static gameField: Array<Array<number>> = [];
  private static defaultField: Array<Array<number>> = [
    [1, 2, 3, 4, 5, 6],

    [6, 5, 4, 3, 2, 1],

    [10, 9, 8, 7, 2, 1],

    [10, 5, 8, 9, 9, 3],

    [10, 10, 6, 7, 5, 4],
  ];

  private static fieldForLoadingRes: Array<Array<number>> = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  ];

  private static stagesPlayingField: IStagesPlayingField = {
    loadingStage: [],
    startingStage: [],
    initStage: [],
    winStage: [],
    omitStage: [],
    additionStage: [],
  };

  public static getStage(stage: Stages): Array<Array<ISymbol>> {
    return this.stagesPlayingField[stage];
  }

  public static getIsWinSpin(): boolean {
    return this.isWinSpin;
  }

  public static spinCycle(): Array<Array<ISymbol>> {
    this.clearLastResults();
    this.generateGameField();

    return this.stagesPlayingField.initStage;
  }

  private static clearLastResults(): void {
    this.gameField = [];
    this.columnsInNeedOfSymbols = [];

    this.xStart = this.xStartDefault;
    this.yStart = this.yStartDefault;
    this.yEnd = this.yEndDefault;

    this.symbolsInColumn = 6;
    this.maxRowCount = 5;
    this.symbolsCount = 10;
    this.rowCounter = 0;
    this.columnCounter = 0;
    this.isWinSpin = false;

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

    console.log('generateGameField', newGameField);
    // debugger;

    this.createSymbolsPosition();
  }

  public static generateFieldForLoading(): Array<Array<ISymbol>> {
    this.createSymbolsPosition(false, true);

    return this.stagesPlayingField.loadingStage;
  }

  private static generateRandomNumber(): number {
    const randomSymbol = Math.ceil(Math.random() * this.symbolsCount);

    return randomSymbol;
  }

  private static createSymbolsPosition(
    isStartingField?: boolean,
    isLoadingField?: boolean,
  ): void {
    const currField = isStartingField
      ? this.defaultField
      : isLoadingField
      ? this.fieldForLoadingRes
      : this.gameField;
    const symbolsPositionArr: Array<Array<ISymbol>> = [];

    currField.forEach((arr: Array<number>, i) => {
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

        const symbolInfo: ISymbol = {
          id: arr[g],
          xStart: xStart,
          yStart: isStartingField ? -100 : this.yStart,
          yEnd: yEnd,
          isWin: isLoadingField && i === 0 ? true : false,
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

    if (isLoadingField) {
      this.stagesPlayingField.loadingStage = symbolsPositionArr;
      this.clearLastResults();
      return;
    }

    this.stagesPlayingField.initStage = symbolsPositionArr;

    console.log('createSymbolsPosition', this.stagesPlayingField.initStage);
    // debugger;

    this.checkWinSymbols(this.stagesPlayingField.initStage);
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

  public static checkWinSymbols(gameField: Array<Array<ISymbol>>): boolean {
    const winSymbolsCount: { [id: string]: number } = {};

    for (let i = 0; i < gameField.length; i++) {
      for (let g = 0; g < gameField[i].length; g++) {
        if (!winSymbolsCount[gameField[i][g].id]) {
          winSymbolsCount[gameField[i][g].id] = 1;
        } else {
          winSymbolsCount[gameField[i][g].id] += 1;
        }
      }
    }

    const currentWinSymbols = Object.entries(winSymbolsCount)
      .map(el => {
        if (el[1] >= 5) {
          // Check the number of characters
          return +el[0]; // return the number id
        }
      })
      .filter(el => el) as Array<number>;

    if (currentWinSymbols.length > 0) {
      this.isWinSpin = true;
      this.winSymbols(gameField, currentWinSymbols);

      return true;
    }

    this.isWinSpin = false;
    return false;
  }

  public static async winSymbols(
    gameField: Array<Array<ISymbol>>,
    winSymbols: Array<number>,
  ): Promise<void> {
    const fieldAfterCheckWin = gameField.map((arr: Array<ISymbol>) => {
      return arr.map((symbol: ISymbol) => {
        if (winSymbols.includes(symbol.id)) {
          return {
            ...symbol,
            isWin: true,
          };
        } else {
          return { ...symbol, isWin: false };
        }
      });
    });

    this.stagesPlayingField.winStage = fieldAfterCheckWin;

    console.log('checkWinSymbols', this.stagesPlayingField.winStage);
    // debugger;

    this.omitSymbols();
  }

  public static async omitSymbols(): Promise<void> {
    this.columnsInNeedOfSymbols = [];
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
          if (yoffset > 0) {
            const offsetFromEndArr = yoffset / yOmit;

            currentSymbol.yEnd =
              this.stagesPlayingField.winStage[i][g + offsetFromEndArr].yEnd;
          }
          currentSymbol.yStart = currentSymbol.yEnd;
        }

        if (g === 0) {
          this.columnsInNeedOfSymbols.push(yoffset / yOmit);
        }
      }
    }

    this.stagesPlayingField.omitStage = currentField;

    // .map(
    //   (arr: Array<ISymbol>) => arr.filter((sym: ISymbol) => !sym.isWin),
    // ); // delete win symbols

    console.log('omitSymbols', this.stagesPlayingField.omitStage);
    // debugger;

    this.generationAdditionalSymbols();
  }

  public static async generationAdditionalSymbols(): Promise<void> {
    const currentField: Array<Array<ISymbol>> = this.createCopyObjects(
      this.getStage(Stages.OMIT),
    ).map((arr: Array<ISymbol>) => arr.filter((sym: ISymbol) => !sym.isWin));

    const yOmit = 100;

    for (let i = 0; i < this.columnsInNeedOfSymbols.length; i++) {
      let yCounter = this.columnsInNeedOfSymbols[i] * yOmit;
      if (this.columnsInNeedOfSymbols[i] > 0) {
        for (let g = 0; g < this.columnsInNeedOfSymbols[i]; g++) {
          const calcXStart =
            i === 0 ? this.xStartDefault : this.xStartDefault + 100 * i;

          const calcYStart = this.yStartDefault - yOmit * g - i * yOmit;

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

    this.stagesPlayingField.additionStage = currentField;

    console.log(
      'generationAdditionalSymbols',
      this.stagesPlayingField.additionStage,
    );
  }

  public static checkWinAfterAdditionStage(): boolean {
    return this.checkWinSymbols(this.stagesPlayingField.additionStage);
  }

  public static createCopyObjects(
    arr: Array<Array<ISymbol>>,
  ): Array<Array<ISymbol>> {
    return arr.map((array: Array<ISymbol>) =>
      array.map((symbol: ISymbol) => ({ ...symbol })),
    );
  }
}

export default GenerateSpinCycle;
