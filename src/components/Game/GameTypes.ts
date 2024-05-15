import { ISymbol } from './GenerateGameLogic';

export interface GameProps {
  isStartGame: boolean;
  isInitStage: boolean;
  isGameOn: boolean;
  isRemoveSymbolsStage: boolean;
  isAdditionStage: boolean;
  startingField: Array<Array<ISymbol>>;
  gameField: Array<Array<ISymbol>>;
  isLoadData: boolean;
  balance: number;
  bet: number;
  winAmount: number;
  isNotEnoughMoney: boolean;
  isWinMusic: boolean;
  isOnSound: boolean;
  isStoneFallSound: boolean;
  isDarkGame: boolean;
  setShowFire: (flag: { flag: boolean }) => void;
  setSoundState: () => void;
  handleClickSpin: () => void;
  handlePlaceBetLow: () => void;
  handlePlaceBetUp: () => void;
  checkWinThunk: () => void;
}
