import { createSlice } from '@reduxjs/toolkit';
import { ISymbol } from '../components/Game/GenerateGameLogic';
import { GameData } from '../components/Game/Textures';

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

// enum loadingReducerEnum {
//   setDataAction = 'SET-DATA-ACTION',
//   setVideoSettings = 'SET-VIDEO-SETTINGS',
//   loadDataAction = 'LOAD-DATA-ACTION',
//   setEndLoadData = 'SET-END-LOAD-DATA',
// }

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setVideoSettings(state) {
      state.gameData.videos.symbolsWin.forEach((pixiVideo: any) => {
        pixiVideo.baseTexture.resource.source.loop = true;
      });
      state.gameData.videos.otherVideos.anubisLoad.baseTexture.resource.source.loop =
        true;
      state.gameData.videos.otherVideos.anubisLoad.baseTexture.resource.source.play();
    },
    createGameData(state, action) {
      state.gameData = action.payload;
    },
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

// const todosloading = (state = initialState, action: any) => {
//   switch (action.type) {
//     case loadingReducerEnum.setVideoSettings:
//       state.gameData.videos.symbolsWin.forEach((pixiVideo: any) => {
//         pixiVideo.baseTexture.resource.source.loop = true;
//       });
//       state.gameData.videos.otherVideos.anubisLoad.baseTexture.resource.source.loop =
//         true;
//       state.gameData.videos.otherVideos.anubisLoad.baseTexture.resource.source.play();
//       return {
//         ...state,
//         gameData: { ...state.gameData },
//       };
//     case loadingReducerEnum.setDataAction:
//       return {
//         ...state,
//         gameData: action.gameData,
//       };
//     case loadingReducerEnum.loadDataAction:
//       return {
//         ...state,
//         loadField: GenerateSpinCycle.createCopyObjects(action.loadField),
//         isLoadData: true,
//       };
//     case loadingReducerEnum.setEndLoadData:
//       return {
//         ...state,
//         isLoadData: false,
//         isEndLoadData: true,
//       };

//     default:
//       return state;
//   }
// };

// export const setVideoSettings = () => {
//   return {
//     type: loadingReducerEnum.setVideoSettings,
//   };
// };

// export const createGameData = (flag: boolean) => {
//   return {
//     type: loadingReducerEnum.loadDataAction,
//     loadField: GenerateSpinCycle.generateFieldForLoading(),
//     flag,
//   };
// };

// export const setLoadData = () => {
//   return {
//     type: loadingReducerEnum.setDataAction,
//     gameData: createGameItems(),
//   };
// };

// export const setEndLoadData = () => {
//   return {
//     type: loadingReducerEnum.setEndLoadData,
//   };
// };

export const { setVideoSettings, createGameData, setLoadData, setEndLoadData } =
  loadingSlice.actions;

export default loadingSlice.reducer;
