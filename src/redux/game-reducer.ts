import { Dispatch } from 'react';
import GenerateSpinCycle, {
  ISymbol,
} from '../components/Game/GenerateGameLogic';

interface IGameField {
  gameField: Array<Array<ISymbol>>;

  isRunning: boolean;
  isSpin: boolean;
  isWin: boolean;
}

const initiatState: IGameField = {
  gameField: [],
  isRunning: false,
  isSpin: false,
  isWin: false,
};

const gameReducer = (state = initiatState, action: any) => {
  switch (action.type) {
    case 'SET-SPIN':
      return {
        state,
        gameField: [...action.gameField],
        isSpin: true,
        isRunning: true,
      };

    case 'CHECK-WIN':
      let isWin = false;

      for (let i = 0; i < action.gameField.length; i++) {
        for (let g = 0; g < action.gameField[i].length; g++) {
          if (action.gameField[i][g].isWin) {
            isWin = true;
            return {
              ...state,
              gameField: [...action.gameField],
              isWin,
              isRunning: false,
            };
          }
        }
      }

      return {
        ...state,
        isWin: false,
        isRunning: false,
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

      setTimeout(() => {
        GenerateSpinCycle.checkWinSymbols().then(
          (res: Array<Array<ISymbol>>) => {
            dispatch(checkWinCombination(res)); // check win combinations
          },
        );
      }, 3500);
    });
  };
};

export default gameReducer;
