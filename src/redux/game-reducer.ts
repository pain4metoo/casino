import GenerateSpinCycle, {
  ISymbol,
  Stages,
} from '../components/Game/GenerateGameLogic';

interface IInitialState {
  startingField: Array<Array<ISymbol>>;
  gameField: Array<Array<ISymbol>>;
  isStartGame: boolean;
  isSpin: boolean;
  isWinStage: boolean;
  isRemoveSymbolsStage: boolean;
  isOmitStage: boolean;
  isAdditionStage: boolean;
}

const initialState: IInitialState = {
  startingField: [],
  gameField: [],
  isStartGame: false,
  isSpin: false,
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
          gameField: GenerateSpinCycle.createCopyObjects(action.gameField),
          isSpin: true,
        };
      }

      return {
        ...state,
        isSpin: false,
        isWinStage: false,
        isOmitStage: false,
        isRemoveSymbolsStage: false,
        isAdditionStage: false,
      };
    case reducerTypes.winStage:
      return {
        ...state,
        gameField: GenerateSpinCycle.createCopyObjects(action.gameField),
        isWinStage: true,
      };
    case reducerTypes.removeSymbolsStage:
      return {
        ...state,
        isRemoveSymbolsStage: true,
        isWinStage: false,
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

export const spinCycleThunk = (flag: boolean) => {
  return (dispatch: any) => {
    dispatch(initStageAction(flag));
    if (GenerateSpinCycle.getIsWinSpin()) {
      setTimeout(() => {
        dispatch(winStageAction());
        setTimeout(() => {
          dispatch(removeSymbolsStage());
          setTimeout(() => {
            dispatch(omitStageAction());
            setTimeout(() => {
              dispatch(additionalStageAction());
              // setTimeout(() => {
              //   if (GenerateSpinCycle.checkWinAfterAdditionStage()) {
              //     dispatch(winStageAction());
              //   }
              // }, 1500);
            }, 1000);
          }, 500);
        }, 1000);
      }, 1500);
    }
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
