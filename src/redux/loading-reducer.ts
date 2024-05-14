import * as PIXI from 'pixi.js';
import { Dispatch, createSlice } from '@reduxjs/toolkit';
import {
  createGameDataArrows,
  createGameDataFire,
  createGameDataSpinBtnOff,
  createGameDataSymbolsWin,
  createKeysForTextures,
  loadPreloaderTexture,
  loadingAnubisBgTexture,
} from '../components/Game/textures-create';

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
    await loadPreloaderTexture();

    dispatch(togglePreloader({ flag: true }));

    await loadingAnubisBgTexture();

    dispatch(togglePreloader({ flag: false }));
    dispatch(setLoadData({ flag: true }));

    await PIXI.Assets.load(createKeysForTextures(), progress => {
      dispatch(updateProgress({ value: progress }));

      if (progress === 1) {
        dispatch(setLoadData({ flag: false }));
      }
    });

    await createGameDataArrows();
    await createGameDataSpinBtnOff();
    await createGameDataSymbolsWin();
    await createGameDataFire();

    dispatch(setEndLoadData({ flag: true }));
  };
};

export const { togglePreloader, setLoadData, setEndLoadData, updateProgress } =
  loadingSlice.actions;

export default loadingSlice.reducer;
function loadLoadingAnubisBg() {
  throw new Error('Function not implemented.');
}
