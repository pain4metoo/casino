import { Dispatch } from 'react';
import GenerateSpinCycle, {
  ISymbol,
} from '../components/Game/GenerateGameLogic';

interface IGameField {
  gameField: Array<Array<ISymbol>>;
  isWin: boolean;
  isRunning: boolean;
  isSpin: boolean;
}

const initiatState: IGameField = {
  gameField: [],
  isWin: false,
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
      let isWin = false;
      action.gameField.forEach((arr: any) => {
        arr.forEach((el: any) => {
          if (el.isWin) {
            isWin = true;
          }
        });
      });
      return {
        ...state,
        gameField: [...action.gameField],
        isWin,
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
  return (dispach: any) => {
    dispach(setIsSpinClickAction(false)); // delete old field
    dispach(setSpinIsRunningAction(false)); // default spin state in the start
    GenerateSpinCycle.spinCycle().then((res: Array<Array<ISymbol>>) => {
      dispach(setSpinAction(res)); // create new field
      dispach(setIsSpinClickAction(true)); // render new field
      dispach(setSpinIsRunningAction(true)); // render spin state

      setTimeout(() => {
        GenerateSpinCycle.checkWinSymbols().then(
          (res: Array<Array<ISymbol>>) => {
            dispach(checkWinCombination(res));
          },
        );
      }, 3500);
    });
  };
};

export default gameReducer;
