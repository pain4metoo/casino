import GenerateSpinCycle, {
  ISymbol,
  Stages,
} from '../components/Game/GenerateGameLogic';

interface IInitialState {
  startingField: Array<Array<ISymbol>>;
  gameField: Array<Array<ISymbol>>;
  isGameOn: boolean;
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
  isGameOn: false,
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
  setGameOnState = 'SET-GAME-ON-STATE',
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
      if (action.flag) {
        return {
          ...state,
          gameField: [],
          isAdditionStage: false,
          isRemoveSymbolsStage: false,
        };
      }
      return {
        ...state,
        gameField: GenerateSpinCycle.createCopyObjects(action.gameField),
        isInitStage: true,
      };

    case reducerTypes.winStage:
      return {
        ...state,
        gameField: GenerateSpinCycle.createCopyObjects(action.gameField),
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
      };
    case reducerTypes.additionStage:
      return {
        ...state,
        gameField: GenerateSpinCycle.createCopyObjects(action.gameField),
        isAdditionStage: true,
      };
    case reducerTypes.setGameOnState:
      return {
        ...state,
        isGameOn: action.flag,
      };
    default:
      return state;
  }
};

export const spinCycleThunk = (isInitStage: boolean) => {
  return (dispatch: any) => {
    dispatch(setGameOnAction(true));
    if (isInitStage) {
      dispatch(initStageAction(true));

      setTimeout(() => {
        dispatch(initStageAction(false));
      }, 0);
    } else {
      if (GenerateSpinCycle.getIsWinSpin()) {
        setTimeout(() => {
          dispatch(winStageAction());

          setTimeout(() => {
            dispatch(removeSymbolsStage());

            setTimeout(() => {
              dispatch(omitStageAction());

              setTimeout(() => {
                dispatch(additionalStageAction());

                setTimeout(() => {
                  if (GenerateSpinCycle.checkWinAfterAdditionStage()) {
                    dispatch(spinCycleThunk(false));
                  } else {
                    dispatch(setGameOnAction(false));
                  }
                }, 1000);
              }, 1000);
            }, 500);
          }, 1000);
        }, 1000);
      } else {
        setTimeout(() => {
          dispatch(setGameOnAction(false));
        }, 1000);
      }
    }
  };
};

export const setGameOnAction = (flag: boolean) => {
  return {
    type: reducerTypes.setGameOnState,
    flag,
  };
};

export const setGenerateDefauldField = () => {
  return {
    type: reducerTypes.setGenerateDefauldField,
    startingField: GenerateSpinCycle.generateDefaultField(),
  };
};

export const initStageAction = (flag: boolean) => {
  return {
    type: reducerTypes.initStage,
    gameField: GenerateSpinCycle.spinCycle(),
    flag,
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
