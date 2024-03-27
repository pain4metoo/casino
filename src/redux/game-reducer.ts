import GenerateSpinCycle, {
  ISymbol,
  Stages,
} from '../components/Game/GenerateGameLogic';

interface IInitialState {
  gameField: Array<Array<ISymbol>>;
  isStartGame: boolean;
  isSpin: boolean;
  isWinStage: boolean;
  isOmitStage: boolean;
  isAdditionStage: boolean;
}

const initialState: IInitialState = {
  gameField: [],
  isStartGame: false,
  isSpin: false,
  isWinStage: false,
  isOmitStage: false,
  isAdditionStage: false,
};

enum reducerTypes {
  startingStage = 'STARTING-STAGE',
  initStage = 'INIT-STAGE',
  winStage = 'WIN-STAGE',
  omitStage = 'OMIT-STAGE',
  additionStage = 'ADDITION-STAGE',
}

const gameReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case reducerTypes.startingStage:
      return {
        ...state,
        isStartGame: action.flag,
        gameField: action.gameField,
      };
    case reducerTypes.initStage:
      return {
        ...state,
        gameField: action.gameField,
        isSpin: true,
      };
    case reducerTypes.winStage:
      return {
        ...state,
        gameField: action.gameField,
        isWinStage: true,
      };
    case reducerTypes.omitStage:
      return {
        ...state,
        gameField: action.gameField,
        isOmitStage: true,
      };
    case reducerTypes.additionStage:
      return {
        ...state,
        gameField: action.gameField,
        isAdditionStage: true,
      };
    default:
      return state;
  }
};

export const startGameAction = (flag: boolean) => {
  return {
    type: reducerTypes.startingStage,
    gameField: GenerateSpinCycle.generateDefaultField(),
    flag,
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
