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
  isGameOn: boolean;
  isStartGame: boolean;
  isInitStage: boolean;
  isRemoveSymbolsStage: boolean;
  isAdditionStage: boolean;
  bet: number;
  winAmount: number;
  isNotEnoughMoney: boolean;
  isWinMusic: boolean;
  isOnSound: boolean;
  isStoneFallSound: boolean;
  isDarkGame: boolean;
}

const initialState: IInitialState = {
  startingField: [],
  gameField: [],
  isGameOn: false,
  isStartGame: false,
  isInitStage: false,
  isRemoveSymbolsStage: false,
  isAdditionStage: false,
  bet: 0.1,
  winAmount: 0,
  isNotEnoughMoney: false,
  isWinMusic: false,
  isOnSound: true,
  isStoneFallSound: false,
  isDarkGame: false,
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setGenerateDefauldField(state, action) {
      state.isStartGame = true;
      state.startingField = action.payload.startingField;
    },
    initStage(state, action) {
      if (action.payload.flag) {
        state.gameField = [];
        state.isAdditionStage = false;
        state.isRemoveSymbolsStage = false;
        state.winAmount = 0;
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
    setBet(state, action) {
      state.bet = action.payload.bet;
    },
    updateWinAmount(state, action) {
      state.winAmount = action.payload.winAmount;
    },
    restartGame(state) {
      state.gameField = [];
      state.startingField = [];
      state.isGameOn = false;
      state.isStartGame = false;
      state.isInitStage = false;
      state.isRemoveSymbolsStage = false;
      state.isAdditionStage = false;
      state.bet = 0.1;
      state.winAmount = 0;
      state.isDarkGame = false;
    },
    checkAmountMoney(state, action) {
      state.isNotEnoughMoney = action.payload.flag;
    },
    playWinMusic(state, action) {
      state.isWinMusic = action.payload.flag;
    },
    playStoneFallSound(state, action) {
      state.isStoneFallSound = action.payload.flag;
    },
    setSoundState(state, action) {
      state.isOnSound = action.payload.flag;
    },
    showDarkSlot(state, action) {
      state.isDarkGame = action.payload.flag;
    },
  },
});

export const placeBetThunk = (bet: number) => {
  return async (dispatch: Dispatch) => {
    const newBalance = await SlotApi.placeBet(bet);

    dispatch(updateUserBalance({ balance: newBalance }));
  };
};

export const spinCycleThunk = (isInitStage: boolean) => {
  return (dispatch: any) => {
    dispatch(showDarkSlot({ flag: false }));
    dispatch(setGameOnState({ flag: true }));
    dispatch(playStoneFallSound({ flag: true }));
    if (isInitStage) {
      dispatch(initStage({ flag: true }));
      dispatch(playStoneFallSound({ flag: false }));
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
        if (GenerateSpinCycle.getWinCount() >= 2) {
          dispatch(showDarkSlot({ flag: true }));
        }
        setTimeout(() => {
          dispatch(playWinMusic({ flag: true }));
          dispatch(
            winStage({
              gameField: GenerateSpinCycle.getStage(Stages.WIN),
            }),
          );

          SlotApi.updateBalance(GenerateSpinCycle.getWinAmount()).then(res => {
            dispatch(
              updateUserBalance({
                balance: res,
              }),
            );
          });

          dispatch(
            updateWinAmount({ winAmount: GenerateSpinCycle.getWinAmount() }),
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
                    dispatch(showDarkSlot({ flag: false }));
                    dispatch(setGameOnState({ flag: false }));
                    dispatch(playWinMusic({ flag: false }));
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
  setBet,
  updateWinAmount,
  restartGame,
  checkAmountMoney,
  playWinMusic,
  setSoundState,
  playStoneFallSound,
  showDarkSlot,
} = gameSlice.actions;

export default gameSlice.reducer;
