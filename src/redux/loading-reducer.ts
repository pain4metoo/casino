import { createSlice } from '@reduxjs/toolkit';
import { ISymbol } from '../components/Game/GenerateGameLogic';

interface IinitialState {
  isLoadData: boolean;
  isEndLoadData: boolean;
}

const initialState: IinitialState = {
  isLoadData: false,
  isEndLoadData: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoadData(state, action) {
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
