import { Dispatch, createSlice } from '@reduxjs/toolkit';
import GenerateSpinCycle, {
  ISymbol,
  Stages,
} from '../components/Game/GenerateGameLogic';
import SlotApi from '../api/slot/slot-api';
import { updateUserBalance } from './auth-reducer';

interface IInitialState {
  startingField: Array<Array<ISymbol>>;
  gameField: Array<Array<ISymbol>>;
  isPlayAnim: boolean;
  isGameOn: boolean;
  isStartGame: boolean;
  isInitStage: boolean;
  isRemoveSymbolsStage: boolean;
  isAdditionStage: boolean;
  balance: number;
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
  balance: 0,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGenerateDefauldField(state, action) {
      if (action.payload.isStartGame) {
        state.isStartGame = true;
      } else {
        state.isStartGame = false;
      }

      state.startingField = action.payload.startingField;
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

export const placeBetThunk = (bet: number, balance: number) => {
  return async (dispatch: Dispatch) => {
    const newBalance = await SlotApi.placeBet(bet, balance);

    dispatch(updateUserBalance({ balance: newBalance }));
  };
};

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
  setGenerateDefauldField,
  initStage,
  winStage,
  removeSymbolsStage,
  omitStage,
  additionStage,
  setGameOnState,
} = gameSlice.actions;

export default gameSlice.reducer;
