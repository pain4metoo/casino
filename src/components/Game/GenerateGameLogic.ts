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

export class GenerateSpinCycle {
  private static currentBet: number = 0.01;

  private static symbolsInColumn: number = 6;
  private static maxRowCount: number = 5;
  private static symbolsCount: number = 10;
  private static rowCounter: number = 0;
  private static columnCounter: number = 0;
  private static isWinSpin: boolean = false;
  private static currentWinSum: number = 0;
  private static winCounter: number = 0;

  private static xStartDefault: number = 350;
  private static yStartDefault: number = -550;
  private static yEndDefault: number = 50;
  private static defaultOffSet: number = 100;

  private static xStart: number = this.xStartDefault;
  private static yStart: number = this.yStartDefault;
  private static yEnd: number = this.yEndDefault;

  private static columnsInNeedOfSymbols: Array<number> = [];
  private static gameField: Array<Array<number>> = [];
  private static defaultField: Array<Array<number>> = [
    [1, 2, 3, 4, 5, 6],

    [6, 5, 4, 3, 2, 1],

    [10, 9, 8, 7, 2, 1],

    [10, 5, 8, 9, 9, 3],

    [10, 10, 6, 7, 5, 4],
  ];

  private static stagesPlayingField: IStagesPlayingField = {
    startingStage: [],
    initStage: [],
    winStage: [],
    omitStage: [],
    additionStage: [],
  };

  public static getWinCount(): number {
    return this.winCounter;
  }

  public static getWinAmount(): number {
    return this.currentWinSum;
  }
  public static changeCurrentBet(newBet: number) {
    if (newBet > 0 && newBet <= 1000) {
      this.currentBet = newBet;
    } else {
      throw new Error('Incorrect bet');
    }
  }

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

  public static clearLastResults(): void {
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
    this.currentWinSum = 0;
    this.winCounter = 0;

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

    this.createSymbolsPosition();
  }

  private static generateRandomNumber(): number {
    const randomSymbol = Math.ceil(Math.random() * this.symbolsCount);

    return randomSymbol;
  }

  private static createSymbolsPosition(isStartingField?: boolean): void {
    const currField = isStartingField ? this.defaultField : this.gameField;
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

    this.checkWinSymbols(this.stagesPlayingField.initStage);
  }

  private static calculateCoordinate(axisInfo: IAxisInfo): number {
    switch (axisInfo.axis) {
      case 'X':
        if (axisInfo.rowCounter < this.maxRowCount) {
          this.xStart += this.defaultOffSet;
          this.yStart -= this.defaultOffSet;
          if (axisInfo.rowCounter === 0) {
            this.xStart = this.xStartDefault;
            this.yStart += this.defaultOffSet;
          }
        } else {
          this.rowCounter = 0;
          this.xStart = this.xStartDefault;
        }

        return this.xStart;
      case 'Y':
        if (axisInfo.columnCounter < this.symbolsInColumn) {
          this.yEnd += this.defaultOffSet;
          this.yStart += this.defaultOffSet;
          if (axisInfo.columnCounter === 0) {
            this.yEnd = this.yEndDefault;
            this.yStart -= this.defaultOffSet;
          }
        } else {
          this.yEnd = this.yEndDefault;
          this.columnCounter = 0;
          this.yStart = this.yStart + this.yStartDefault;
        }

        return this.yEnd;
    }

    return this.xStart;
  }

  public static calculateWinSum(winSymbols: { [id: string]: number }): void {
    this.winCounter++;
    this.currentWinSum = 0;
    const copySymbols = { ...winSymbols };
    const intervalDefSymbols = 5;

    const winTableDefault = {
      symbolsDef: {
        5: 0.01,
        6: 0.01,
        7: 0.07,
        8: 0.08,
        9: 0.1,
        10: 0.5,
        11: 1,
        12: 1.5,
      },
      symbolsWin: {
        6: {
          5: 0.01,
          6: 0.012,
          7: 0.06,
          8: 0.1,
          9: 0.2,
          10: 0.3,
          11: 1.5,
          12: 2.0,
        },
        7: {
          5: 0.01,
          6: 0.012,
          7: 0.06,
          8: 0.1,
          9: 0.2,
          10: 0.3,
          11: 1.5,
          12: 2.0,
        },
        8: {
          5: 0.01,
          6: 0.012,
          7: 0.12,
          8: 0.2,
          9: 0.4,
          10: 0.6,
          11: 3,
          12: 4,
        },
        9: {
          5: 0.01,
          6: 0.012,
          7: 0.24,
          8: 0.4,
          9: 0.8,
          10: 1.2,
          11: 6,
          12: 8,
        },
        10: {
          5: 0.01,
          6: 0.012,
          7: 0.48,
          8: 0.8,
          9: 1.6,
          10: 2.4,
          11: 12,
          12: 16,
        },
      },
    };

    const calculate = (id: number, count: number): number => {
      const key = count as keyof typeof winTableDefault.symbolsDef;
      const keyId = id as keyof typeof winTableDefault.symbolsWin;

      if (id <= intervalDefSymbols) {
        return winTableDefault.symbolsDef[key] * this.currentBet * 10;
      } else {
        return winTableDefault.symbolsWin[keyId][key] * this.currentBet * 10;
      }
    };

    let winResult = 0;

    for (const id in copySymbols) {
      if (copySymbols[id] >= 5) {
        winResult += calculate(+id, copySymbols[id]);
      }
    }

    this.currentWinSum = +winResult.toFixed(2);
  }

  public static checkWinSymbols(gameField: Array<Array<ISymbol>>): boolean {
    this.currentWinSum = 0;
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

    this.calculateWinSum(winSymbolsCount);

    const currentWinSymbols = Object.entries({ ...winSymbolsCount })
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

    this.omitSymbols();
  }

  public static async omitSymbols(): Promise<void> {
    this.columnsInNeedOfSymbols = [];
    const currentField: Array<Array<ISymbol>> = this.createCopyObjects(
      this.getStage(Stages.WIN),
    );

    for (let i = 0; i < currentField.length; i++) {
      let yoffset = 0;

      for (let g = currentField[i].length - 1; g >= 0; g--) {
        let currentSymbol: any = currentField[i][g];

        if (currentSymbol.isWin) {
          yoffset += this.defaultOffSet;
        } else {
          if (yoffset > 0) {
            const offsetFromEndArr = yoffset / this.defaultOffSet;

            currentSymbol.yEnd =
              this.stagesPlayingField.winStage[i][g + offsetFromEndArr].yEnd;
          }
          currentSymbol.yStart = currentSymbol.yEnd;
        }

        if (g === 0) {
          this.columnsInNeedOfSymbols.push(yoffset / this.defaultOffSet);
        }
      }
    }

    this.stagesPlayingField.omitStage = currentField;

    this.generationAdditionalSymbols();
  }

  public static async generationAdditionalSymbols(): Promise<void> {
    let currentField: Array<Array<ISymbol>> = this.createCopyObjects(
      this.getStage(Stages.OMIT),
    );

    currentField = currentField.map((arr: Array<ISymbol>) =>
      arr.filter((sym: ISymbol) => !sym.isWin),
    );

    for (let i = 0; i < this.columnsInNeedOfSymbols.length; i++) {
      let yCounter = this.columnsInNeedOfSymbols[i] * this.defaultOffSet;
      if (this.columnsInNeedOfSymbols[i] > 0) {
        for (let g = 0; g < this.columnsInNeedOfSymbols[i]; g++) {
          const calcXStart =
            i === 0
              ? this.xStartDefault
              : this.xStartDefault + this.defaultOffSet * i;

          const calcYStart =
            this.yStartDefault -
            this.defaultOffSet * g -
            i * this.defaultOffSet;

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
          yCounter -= this.defaultOffSet;
        }
      }
    }

    this.stagesPlayingField.additionStage = currentField;
  }

  public static checkWinAfterAdditionStage(): boolean {
    const currentField = this.createCopyObjects(
      this.stagesPlayingField.additionStage,
    );

    currentField.forEach((arr: Array<ISymbol>) => {
      arr.forEach((symbols: ISymbol) => {
        symbols.yStart = symbols.yEnd;
      });
    });

    return this.checkWinSymbols(currentField);
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
