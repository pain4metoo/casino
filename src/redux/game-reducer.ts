import GenerateSpinCycle, {
  ISymbol,
  Stages,
} from '../components/Game/GenerateGameLogic';

interface IInitialState {
  startingField: Array<Array<ISymbol>>;
  gameField: Array<Array<ISymbol>>;
  isStartGame: boolean;
  isInitStage: boolean;
  isWinStage: boolean;
  isRemoveSymbolsStage: boolean;
  isOmitStage: boolean;
  isAdditionStage: boolean;
}

const initialState: IInitialState = {
  startingField: [],
  gameField: [],
  isStartGame: false,
  isInitStage: false,
  isWinStage: false,
  isRemoveSymbolsStage: false,
  isOmitStage: false,
  isAdditionStage: false,
};

enum reducerTypes {
  initStage = 'INIT-STAGE',
  winStage = 'WIN-STAGE',
  removeSymbolsStage = 'REMOVE-SYMBOLS-STAGE',
  omitStage = 'OMIT-STAGE',
  additionStage = 'ADDITION-STAGE',
  setGenerateDefauldField = 'SET-GENERATE-DEFAULT-FIELD',
  clearLastResults = 'CLEAR-LAST-RESULTS',
}

const gameReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case reducerTypes.setGenerateDefauldField:
      return {
        ...state,
        startingField: GenerateSpinCycle.createCopyObjects(
          action.startingField,
        ),
        isStartGame: true,
      };
    case reducerTypes.initStage:
      return {
        ...state,
        gameField: GenerateSpinCycle.createCopyObjects(action.gameField),
        isInitStage: true,
        isAdditionStage: false,
        isRemoveSymbolsStage: false,
      };

    case reducerTypes.winStage:
      return {
        ...state,
        gameField: GenerateSpinCycle.createCopyObjects(action.gameField),
        isWinStage: true,
        isAdditionStage: false,
        isRemoveSymbolsStage: false,
      };
    case reducerTypes.removeSymbolsStage:
      return {
        ...state,
        isRemoveSymbolsStage: true,
      };
    case reducerTypes.omitStage:
      return {
        ...state,
        gameField: GenerateSpinCycle.createCopyObjects(action.gameField),
        isOmitStage: true,
      };
    case reducerTypes.additionStage:
      return {
        ...state,
        gameField: GenerateSpinCycle.createCopyObjects(action.gameField),
        isAdditionStage: true,
      };

    case reducerTypes.clearLastResults:
      return {
        ...state,
        isInitStage: true,
        isAdditionStage: false,
        isRemoveSymbolsStage: false,
      };

    default:
      return state;
  }
};

export const setGenerateDefauldField = () => {
  return {
    type: reducerTypes.setGenerateDefauldField,
    startingField: GenerateSpinCycle.generateDefaultField(),
  };
};

export const spinCycleThunk = (isInitStage: boolean) => {
  return (dispatch: any) => {
    if (isInitStage) {
      dispatch(initStageAction());
    } else {
      if (GenerateSpinCycle.getIsWinSpin()) {
        setTimeout(() => {
          dispatch(winStageAction());
          // debugger;
          setTimeout(() => {
            dispatch(removeSymbolsStage());
            // debugger;
            setTimeout(() => {
              dispatch(omitStageAction());
              // debugger;
              setTimeout(() => {
                dispatch(additionalStageAction());
                // debugger;
                setTimeout(() => {
                  if (GenerateSpinCycle.checkWinAfterAdditionStage()) {
                    dispatch(spinCycleThunk(false));
                    // debugger;
                  }
                }, 1000);
              }, 1000);
            }, 500);
          }, 1000);
        }, 700);
      }
    }
  };
};

export const clearLastResults = () => {
  return {
    type: reducerTypes.clearLastResults,
  };
};

export const initStageAction = () => {
  return {
    type: reducerTypes.initStage,
    gameField: GenerateSpinCycle.spinCycle(),
  };
};

export const winStageAction = () => {
  return {
    type: reducerTypes.winStage,
    gameField: GenerateSpinCycle.getStage(Stages.WIN),
  };
};

export const removeSymbolsStage = () => {
  return {
    type: reducerTypes.removeSymbolsStage,
  };
};

export const omitStageAction = () => {
  return {
    type: reducerTypes.omitStage,
    gameField: GenerateSpinCycle.getStage(Stages.OMIT),
  };
};

export const additionalStageAction = () => {
  return {
    type: reducerTypes.additionStage,
    gameField: GenerateSpinCycle.getStage(Stages.ADDITION),
  };
};

export default gameReducer;

// 1) spinStage
// 2) showWinSymbolsStage
// 3) removeWinSymbolsStage
// 4) omitSymbolsStage
// 5) additionalSymbolsStage
// 6) ... repeat from 2 stage ...
