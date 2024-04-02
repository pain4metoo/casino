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
  loadField: Array<Array<ISymbol>>;
  data: Data;
}

const initialState: IinitialState = {
  isLoadData: false,
  loadField: [],
  data: {
    symbols: [],
    symbolsWin: [],
  },
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
        ...state,
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

export const setDataAction = () => {
  return {
    type: loadingReducerEnum.setDataAction,
    imgData: getImgData(),
  };
};

export const setEndLoadData = () => {
  return {
    type: loadingReducerEnum.setEndLoadData,
  };
};

export default loadingReducer;
