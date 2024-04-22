import { createSlice } from '@reduxjs/toolkit';
import GenerateSpinCycle, {
  ISymbol,
  Stages,
} from '../components/Game/GenerateGameLogic';

interface IInitialState {
  startingField: Array<Array<ISymbol>>;
  gameField: Array<Array<ISymbol>>;
  isPlayAnim: boolean;
  isGameOn: boolean;
  isStartGame: boolean;
  isInitStage: boolean;
  isRemoveSymbolsStage: boolean;
  isAdditionStage: boolean;
}

const initialState: IInitialState = {
  startingField: [],
  gameField: [],
  isPlayAnim: false,
  isGameOn: false,
  isStartGame: false,
  isInitStage: false,
  isRemoveSymbolsStage: false,
  isAdditionStage: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setIsPlayAnim(state, action) {
      state.isPlayAnim = action.payload.flag;
    },
    setGenerateDefauldField(state, action) {
      state.startingField = action.payload.startingField;
      state.isStartGame = true;
    },
    initStage(state, action) {
      if (action.payload.flag) {
        state.gameField = [];
        state.isAdditionStage = false;
        state.isRemoveSymbolsStage = false;
      } else {
        state.gameField = action.payload.gameField;
        state.isInitStage = true;
      }
    },
    winStage(state, action) {
      state.gameField = action.payload.gameField;
      state.isAdditionStage = false;
      state.isRemoveSymbolsStage = false;
    },
    removeSymbolsStage(state) {
      state.isRemoveSymbolsStage = true;
    },
    omitStage(state, action) {
      state.gameField = action.payload.gameField;
    },
    additionStage(state, action) {
      state.gameField = action.payload.gameField;
      state.isAdditionStage = true;
    },
    setGameOnState(state, action) {
      state.isGameOn = action.payload.flag;
    },
  },
});

export const spinCycleThunk = (isInitStage: boolean) => {
  return (dispatch: any) => {
    dispatch(setGameOnState({ flag: true }));
    if (isInitStage) {
      dispatch(initStage({ flag: true }));

      setTimeout(() => {
        dispatch(
          initStage({
            gameField: GenerateSpinCycle.spinCycle(),
            flag: false,
          }),
        );
      }, 0);
    } else {
      if (GenerateSpinCycle.getIsWinSpin()) {
        setTimeout(() => {
          dispatch(
            winStage({
              gameField: GenerateSpinCycle.getStage(Stages.WIN),
            }),
          );

          setTimeout(() => {
            dispatch(removeSymbolsStage());

            setTimeout(() => {
              dispatch(
                omitStage({
                  gameField: GenerateSpinCycle.getStage(Stages.OMIT),
                }),
              );

              setTimeout(() => {
                dispatch(
                  additionStage({
                    gameField: GenerateSpinCycle.getStage(Stages.ADDITION),
                  }),
                );

                setTimeout(() => {
                  if (GenerateSpinCycle.checkWinAfterAdditionStage()) {
                    dispatch(spinCycleThunk(false));
                  } else {
                    dispatch(setGameOnState({ flag: false }));
                  }
                }, 1000);
              }, 1000);
            }, 500);
          }, 1000);
        }, 1000);
      } else {
        setTimeout(() => {
          dispatch(setGameOnState({ flag: false }));
        }, 1000);
      }
    }
  };
};

export const {
  setIsPlayAnim,
  setGenerateDefauldField,
  initStage,
  winStage,
  removeSymbolsStage,
  omitStage,
  additionStage,
  setGameOnState,
} = gameSlice.actions;

export default gameSlice.reducer;
