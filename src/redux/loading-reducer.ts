import { createSlice } from '@reduxjs/toolkit';
import { ISymbol } from '../components/Game/GenerateGameLogic';
import { GameData, gameData } from '../components/Game/Textures';

interface IinitialState {
  isLoadData: boolean;
  isEndLoadData: boolean;
  loadField: Array<Array<ISymbol>>;
  loadProgress: number;
  gameData: GameData;
}

const initialState: IinitialState = {
  isLoadData: false,
  isEndLoadData: false,
  loadField: [],
  loadProgress: 0,
  gameData: {} as GameData,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoadData(state, action) {
      state.loadField = action.payload.loadField;
      state.isLoadData = true;
    },
    setEndLoadData(state) {
      state.isLoadData = false;
      state.isEndLoadData = true;
    },
  },
});

export const { setLoadData, setEndLoadData } = loadingSlice.actions;

export default loadingSlice.reducer;
