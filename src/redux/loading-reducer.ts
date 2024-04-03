import GenerateSpinCycle, {
  ISymbol,
} from '../components/Game/GenerateGameLogic';
import { getImgData } from '../components/Game/Textures';

type Data = {
  symbols: Array<string>;
  symbolsWin: Array<string>;
};

interface IinitialState {
  isLoadData: boolean;
  isEndLoadData: boolean;
  loadField: Array<Array<ISymbol>>;
  data: Data;
  loadProgress: number;
}

const initialState: IinitialState = {
  isLoadData: false,
  isEndLoadData: false,
  loadField: [],
  data: {
    symbols: [],
    symbolsWin: [],
  },
  loadProgress: 0,
};

enum loadingReducerEnum {
  setDataAction = 'SET-DATA-ACTION',
  loadDataAction = 'LOAD-DATA-ACTION',
  setEndLoadData = 'SET-END-LOAD-DATA',
}

const loadingReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case loadingReducerEnum.setDataAction:
      return {
        data: {
          symbols: action.imgData.symbols,
          symbolsWin: action.imgData.symbolsWin,
        },
      };
    case loadingReducerEnum.loadDataAction:
      return {
        ...state,
        loadField: GenerateSpinCycle.createCopyObjects(action.loadField),
        isLoadData: true,
      };
    case loadingReducerEnum.setEndLoadData:
      return {
        ...state,
        isLoadData: false,
        isEndLoadData: true,
      };

    default:
      return state;
  }
};

export const loadDataAction = (flag: boolean) => {
  return {
    type: loadingReducerEnum.loadDataAction,
    loadField: GenerateSpinCycle.generateFieldForLoading(),
    flag,
  };
};

export const setDataAction = (flag: boolean) => {
  return {
    type: loadingReducerEnum.setDataAction,
    imgData: getImgData(flag),
  };
};

export const setEndLoadData = () => {
  return {
    type: loadingReducerEnum.setEndLoadData,
  };
};

export default loadingReducer;
