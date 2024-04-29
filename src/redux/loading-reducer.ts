import * as PIXI from 'pixi.js';
import '@pixi/gif';
import { Dispatch, createSlice } from '@reduxjs/toolkit';
import {
  createGameDataSymbolsWin,
  gameDataDef,
  gameDataGif,
  loadCriticalData,
} from '../components/Game/Textures';
import { symbolsWin } from '../components/Game/Textures';

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

    await PIXI.Assets.load(gameDataDef.bgLoadingAnubis);

    dispatch(togglePreloader({ flag: false }));
    dispatch(setLoadData({ flag: true }));

    const itemsKeyForSymbolsDef: Array<string> = [];
    const itemsKeyForSymbolsWin: Array<string> = [];
    const itemsKeyForDefImg: Array<string> = [];
    const itemsKeyForGifImg: Array<string> = [];

    // load default image and symbols default
    for (const key in gameDataDef) {
      const el = key as keyof typeof gameDataDef;
      if (Array.isArray(gameDataDef[el])) {
        for (let i = 0; i < gameDataDef[el].length; i++) {
          PIXI.Assets.add({ alias: `${key}${i}`, src: gameDataDef[el][i] });

          itemsKeyForSymbolsDef.push(key + i);
        }
      } else {
        PIXI.Assets.add({ alias: key, src: gameDataDef[el] });
        itemsKeyForDefImg.push(key);
      }
    }

    // load win symbols (gif)

    for (let i = 0; i < symbolsWin.length; i++) {
      for (let g = 0; g < symbolsWin[i].length; g++) {
        PIXI.Assets.add({
          alias: `symbolsWin${i}${g}`,
          src: symbolsWin[i][g],
        });

        itemsKeyForSymbolsWin.push('symbolsWin' + i + g);
      }
    }

    const texturesPromise = await PIXI.Assets.load(
      [
        ...itemsKeyForSymbolsDef,
        ...itemsKeyForSymbolsWin,
        ...itemsKeyForDefImg,
        ...itemsKeyForGifImg,
      ],
      progress => {
        dispatch(updateProgress({ value: progress }));

        if (progress === 1) {
          dispatch(setLoadData({ flag: false }));
        }
      },
    );

    await createGameDataSymbolsWin(texturesPromise);

    dispatch(setEndLoadData({ flag: true }));
  };
};

export const { togglePreloader, setLoadData, setEndLoadData, updateProgress } =
  loadingSlice.actions;

export default loadingSlice.reducer;
