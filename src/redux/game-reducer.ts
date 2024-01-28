import { Dispatch } from 'react';
import GenerateSpinCycle, {
  ISymbol,
} from '../components/Game/GenerateGameLogic';

interface IGameField {
  gameField: Array<Array<ISymbol>>;

  isRunning: boolean;
  isSpin: boolean;
}

const initiatState: IGameField = {
  gameField: [],
  isRunning: false,
  isSpin: false,
};

const gameReducer = (state = initiatState, action: any) => {
  switch (action.type) {
    case 'SET-SPIN':
      return {
        state,
        gameField: [...action.gameField],
      };

    case 'CHECK-WIN':
      return {
        ...state,
        gameField: [...action.gameField],
      };
    case 'SET-ISSPIN-CLICK':
      return {
        ...state,
        isSpin: action.flag,
      };
    case 'SET-RUNNING-SPIN':
      return {
        ...state,
        isRunning: action.flag,
      };
    default:
      return state;
  }
};

export const setSpinAction = (gameField: Array<Array<ISymbol>>) => ({
  type: 'SET-SPIN',
  gameField,
});

export const checkWinCombination = (gameField: Array<Array<ISymbol>>) => ({
  type: 'CHECK-WIN',
  gameField,
});

export const setIsSpinClickAction = (flag: boolean) => ({
  type: 'SET-ISSPIN-CLICK',
  flag,
});

export const setSpinIsRunningAction = (flag: boolean) => ({
  type: 'SET-RUNNING-SPIN',
  flag,
});

export const setSpinThunk = () => {
  return (dispatch: any) => {
    dispatch(setIsSpinClickAction(false)); // delete old field
    dispatch(setSpinIsRunningAction(false)); // default spin state in the start
    GenerateSpinCycle.spinCycle().then((res: Array<Array<ISymbol>>) => {
      dispatch(setSpinAction(res)); // create new field

      dispatch(setIsSpinClickAction(true)); // render new field
      dispatch(setSpinIsRunningAction(true)); // render spin state

      GenerateSpinCycle.checkWinSymbols().then((res: Array<Array<ISymbol>>) => {
        dispatch(checkWinCombination(res)); // check win combinations
      });
    });
  };
};

export default gameReducer;
