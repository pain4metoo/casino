import * as PIXI from 'pixi.js';
import '@pixi/gif';
import { Dispatch, createSlice } from '@reduxjs/toolkit';
import { gameData } from '../components/Game/Textures';

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

export let pixiData: any = {
  symbolsWin: [],
  symbolsDef: [],
};

export const loadingThunk = () => {
  return (dispatch: Dispatch) => {
    dispatch(togglePreloader({ flag: true }));
    PIXI.Assets.load(gameData.bgLoadingAnubis).then(() => {
      dispatch(togglePreloader({ flag: false }));
      dispatch(setLoadData({ flag: true }));

      const itemsKey: Array<string> = [];

      for (const key in gameData) {
        const el = key as keyof typeof gameData;
        if (Array.isArray(gameData[el])) {
          for (let i = 0; i < gameData[el].length; i++) {
            PIXI.Assets.add({ alias: `${key}${i}`, src: gameData[el][i] });

            itemsKey.push(key + i);
          }
        } else {
          PIXI.Assets.add({ alias: key, src: gameData[el] });
          itemsKey.push(key);
        }
      }

      const texturesPromise = PIXI.Assets.load(itemsKey, progress => {
        dispatch(updateProgress({ value: progress }));

        if (progress === 1) {
          dispatch(setLoadData({ flag: false }));
        }
      });

      texturesPromise.then(textures => {
        const newPixiData: any = {
          symbolsWin: [],
          symbolsDef: [],
        };

        for (const key in textures) {
          const el = key as keyof typeof textures;
          if (el.includes('symbolsDef')) {
            newPixiData.symbolsDef.push(textures[el]);
            continue;
          }
          if (el.includes('symbolsWin')) {
            newPixiData.symbolsWin.push(textures[el]);
            continue;
          }
          newPixiData[el] = textures[el];
        }

        pixiData = newPixiData;

        dispatch(setEndLoadData({ flag: true }));
      });
    });
  };
};

export const { togglePreloader, setLoadData, setEndLoadData, updateProgress } =
  loadingSlice.actions;

export default loadingSlice.reducer;
