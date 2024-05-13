import * as PIXI from 'pixi.js';
import { Dispatch, createSlice } from '@reduxjs/toolkit';
import {
  createGameDataArrows,
  createGameDataSpinBtnOff,
  createGameDataSymbolsWin,
  loadCriticalData,
} from '../components/Game/textures-create';
import { gameData } from '../components/Game/textures';

interface IinitialState {
  isShowPreloader: boolean;
  isShowLoadProgress: boolean;
  isEndLoadData: boolean;
  loadProgress: number;
}

const initialState: IinitialState = {
  isShowPreloader: false,
  isShowLoadProgress: false,
  isEndLoadData: false,
  loadProgress: 0,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    togglePreloader(state, action) {
      state.isShowPreloader = action.payload.flag;
    },
    setLoadData(state, action) {
      state.isShowLoadProgress = action.payload.flag;
    },
    setEndLoadData(state, action) {
      state.isEndLoadData = action.payload.flag;
    },
    updateProgress(state, action) {
      state.loadProgress = action.payload.value;
    },
  },
});

export const loadingThunk = () => {
  return async (dispatch: Dispatch) => {
    await loadCriticalData();

    dispatch(togglePreloader({ flag: true }));

    await PIXI.Assets.load(gameData.bgLoadingAnubis);

    dispatch(togglePreloader({ flag: false }));
    dispatch(setLoadData({ flag: true }));

    const itemsKeyForLoading: Array<string> = [];

    for (const key in gameData) {
      const el = key as keyof typeof gameData;
      if (Array.isArray(gameData[el])) {
        for (let i = 0; i < gameData[el].length; i++) {
          PIXI.Assets.add({ alias: `${key}${i}`, src: gameData[el][i] });

          itemsKeyForLoading.push(key + i);
        }
      } else {
        PIXI.Assets.add({ alias: key, src: gameData[el] });
        itemsKeyForLoading.push(key);
      }
    }

    await PIXI.Assets.load(itemsKeyForLoading, progress => {
      dispatch(updateProgress({ value: progress }));

      if (progress === 1) {
        dispatch(setLoadData({ flag: false }));
      }
    });

    await createGameDataArrows();
    await createGameDataSpinBtnOff();
    await createGameDataSymbolsWin();

    dispatch(setEndLoadData({ flag: true }));
  };
};

export const { togglePreloader, setLoadData, setEndLoadData, updateProgress } =
  loadingSlice.actions;

export default loadingSlice.reducer;
