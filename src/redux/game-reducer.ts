import GenerateSpinCycle, {
  ISymbol,
} from '../components/Game/GenerateGameLogic';

interface IGameField {
  gameField: Array<Array<ISymbol>>;

  isRunning: boolean;
  isSpin: boolean;
  isWin: boolean;
  isRemoveSymbolsStage: boolean;
  isOmitSymbols: boolean;
}

const initiatState: IGameField = {
  gameField: [],
  isRunning: false,
  isSpin: false,
  isWin: false,
  isRemoveSymbolsStage: false,
  isOmitSymbols: false,
};

const gameReducer = (state = initiatState, action: any) => {
  switch (action.type) {
    case 'SET-SPIN':
      return {
        state,
        gameField: [...action.gameField],
        isSpin: true,
        isRunning: true,
        isWin: false,
        isOmitSymbols: false,
      };

    case 'CHECK-WIN':
      let isWin = false;

      for (let i = 0; i < action.gameField.length; i++) {
        for (let g = 0; g < action.gameField[i].length; g++) {
          if (action.gameField[i][g].isWin) {
            isWin = true;
            return {
              ...state,
              gameField: [...action.gameField],
              isRunning: true,
              isWin,
            };
          }
        }
      }

      return {
        ...state,
        isWin: false,
        isRunning: false,
        isOmitSymbols: false,
        isRemoveSymbolsStage: false,
      };

    case 'REMOVE-SYMBOL':
      return {
        ...state,
        isRunning: true,
        isWin: true,
        isRemoveSymbolsStage: action.flag,
      };

    case 'OMIT-SYMBOLS':
      return {
        ...state,
        gameField: [...action.gameField],
        isRunning: true,
        isWin: true,
        isOmitSymbols: true,
        isRemoveSymbolsStage: false,
      };

    case 'ADDITIONAL-SYMBOLS-STAGE':
      return {
        ...state,
        gameField: [...action.gameField],
      };
    case 'SET-ISSPIN-CLICK':
      return {
        ...state,
        isSpin: action.flag,
      };
    case 'SET-RUNNING-SPIN':
      return {
        ...state,
        isRunning: action.flag,
      };

    default:
      return state;
  }
};

export const setSpinAction = (gameField: Array<Array<ISymbol>>) => ({
  type: 'SET-SPIN',
  gameField,
});

export const checkWinCombination = (gameField: Array<Array<ISymbol>>) => ({
  type: 'CHECK-WIN',
  gameField,
});

export const setIsSpinClickAction = (flag: boolean) => ({
  type: 'SET-ISSPIN-CLICK',
  flag,
});

export const setSpinIsRunningAction = (flag: boolean) => ({
  type: 'SET-RUNNING-SPIN',
  flag,
});

const omitSymbolsAction = (gameField: Array<Array<ISymbol>>) => ({
  type: 'OMIT-SYMBOLS',
  gameField,
});

const removeSymbolsStage = (flag: boolean) => ({
  type: 'REMOVE-SYMBOL',
  flag,
});

const generationAdditionalSymbolsStage = (
  gameField: Array<Array<ISymbol>>,
) => ({
  type: 'ADDITIONAL-SYMBOLS-STAGE',
  gameField,
});

export const setSpinThunk = () => {
  return (dispatch: any) => {
    GenerateSpinCycle.spinCycle().then((res: Array<Array<ISymbol>>) => {
      dispatch(setSpinAction(res));
    });
  };
};

export const checkWinThunk = () => {
  return (dispatch: any) => {
    GenerateSpinCycle.checkWinSymbols().then((res: Array<Array<ISymbol>>) => {
      dispatch(checkWinCombination(res)); // check win combinations
      setTimeout(() => {
        dispatch(removeSymbolsStage(true));
        setTimeout(() => {
          GenerateSpinCycle.omitSymbols().then((res: Array<Array<ISymbol>>) => {
            dispatch(omitSymbolsAction(res));

            setTimeout(() => {
              GenerateSpinCycle.generationAdditionalSymbols().then(
                (res: Array<Array<ISymbol>>) => {
                  dispatch(generationAdditionalSymbolsStage(res));
                },
              );
            }, 1000);
          });
        }, 500);
      }, 1000);
    });
  };
};

export default gameReducer;
