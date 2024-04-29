import * as PIXI from 'pixi.js';
import '@pixi/gif';

import symbol1 from '../../assets/images/symbols/1.png';
import symbol2 from '../../assets/images/symbols/2.png';
import symbol3 from '../../assets/images/symbols/3.png';
import symbol4 from '../../assets/images/symbols/4.png';
import symbol5 from '../../assets/images/symbols/5.png';
import symbol6 from '../../assets/images/symbols/6.png';
import symbol7 from '../../assets/images/symbols/7.png';
import symbol8 from '../../assets/images/symbols/8.png';
import symbol9 from '../../assets/images/symbols/9.png';
import symbol10 from '../../assets/images/symbols/10.png';

import bgSlotGame from '../../assets/images/bg-slot.jpg';
import spinBtn from '../../assets/images/spin.png';
import bgLoadingAnubis from '../../assets/images/bg-loading-slot.jpg';

import prelTexture1 from '../../assets/images/preloader-textures/frame-01.gif';
import prelTexture2 from '../../assets/images/preloader-textures/frame-02.gif';
import prelTexture3 from '../../assets/images/preloader-textures/frame-03.gif';
import prelTexture4 from '../../assets/images/preloader-textures/frame-04.gif';
import prelTexture5 from '../../assets/images/preloader-textures/frame-05.gif';
import prelTexture6 from '../../assets/images/preloader-textures/frame-06.gif';
import prelTexture7 from '../../assets/images/preloader-textures/frame-07.gif';
import prelTexture8 from '../../assets/images/preloader-textures/frame-08.gif';
import prelTexture9 from '../../assets/images/preloader-textures/frame-09.gif';
import prelTexture10 from '../../assets/images/preloader-textures/frame-10.gif';
import prelTexture11 from '../../assets/images/preloader-textures/frame-11.gif';
import prelTexture12 from '../../assets/images/preloader-textures/frame-12.gif';
import prelTexture13 from '../../assets/images/preloader-textures/frame-13.gif';
import prelTexture14 from '../../assets/images/preloader-textures/frame-14.gif';

import symbolsWin1Frame1 from '../../assets/images/symbols_win_1/frame-01.gif';
import symbolsWin1Frame2 from '../../assets/images/symbols_win_1/frame-02.gif';
import symbolsWin1Frame3 from '../../assets/images/symbols_win_1/frame-03.gif';
import symbolsWin1Frame4 from '../../assets/images/symbols_win_1/frame-04.gif';
import symbolsWin1Frame5 from '../../assets/images/symbols_win_1/frame-05.gif';
import symbolsWin1Frame6 from '../../assets/images/symbols_win_1/frame-06.gif';
import symbolsWin1Frame7 from '../../assets/images/symbols_win_1/frame-07.gif';
import symbolsWin1Frame8 from '../../assets/images/symbols_win_1/frame-08.gif';
import symbolsWin1Frame9 from '../../assets/images/symbols_win_1/frame-09.gif';
import symbolsWin1Frame10 from '../../assets/images/symbols_win_1/frame-10.gif';

import symbolsWin2Frame1 from '../../assets/images/symbols_win_2/frame-01.gif';
import symbolsWin2Frame2 from '../../assets/images/symbols_win_2/frame-02.gif';
import symbolsWin2Frame3 from '../../assets/images/symbols_win_2/frame-03.gif';
import symbolsWin2Frame4 from '../../assets/images/symbols_win_2/frame-04.gif';
import symbolsWin2Frame5 from '../../assets/images/symbols_win_2/frame-05.gif';
import symbolsWin2Frame6 from '../../assets/images/symbols_win_2/frame-06.gif';
import symbolsWin2Frame7 from '../../assets/images/symbols_win_2/frame-07.gif';
import symbolsWin2Frame8 from '../../assets/images/symbols_win_2/frame-08.gif';
import symbolsWin2Frame9 from '../../assets/images/symbols_win_2/frame-09.gif';
import symbolsWin2Frame10 from '../../assets/images/symbols_win_2/frame-10.gif';

import symbolsWin3Frame1 from '../../assets/images/symbols_win_3/frame-01.gif';
import symbolsWin3Frame2 from '../../assets/images/symbols_win_3/frame-02.gif';
import symbolsWin3Frame3 from '../../assets/images/symbols_win_3/frame-03.gif';
import symbolsWin3Frame4 from '../../assets/images/symbols_win_3/frame-04.gif';
import symbolsWin3Frame5 from '../../assets/images/symbols_win_3/frame-05.gif';
import symbolsWin3Frame6 from '../../assets/images/symbols_win_3/frame-06.gif';
import symbolsWin3Frame7 from '../../assets/images/symbols_win_3/frame-07.gif';
import symbolsWin3Frame8 from '../../assets/images/symbols_win_3/frame-08.gif';
import symbolsWin3Frame9 from '../../assets/images/symbols_win_3/frame-09.gif';
import symbolsWin3Frame10 from '../../assets/images/symbols_win_3/frame-10.gif';

import symbolsWin4Frame1 from '../../assets/images/symbols_win_4/frame-01.gif';
import symbolsWin4Frame2 from '../../assets/images/symbols_win_4/frame-02.gif';
import symbolsWin4Frame3 from '../../assets/images/symbols_win_4/frame-03.gif';
import symbolsWin4Frame4 from '../../assets/images/symbols_win_4/frame-04.gif';
import symbolsWin4Frame5 from '../../assets/images/symbols_win_4/frame-05.gif';
import symbolsWin4Frame6 from '../../assets/images/symbols_win_4/frame-06.gif';
import symbolsWin4Frame7 from '../../assets/images/symbols_win_4/frame-07.gif';
import symbolsWin4Frame8 from '../../assets/images/symbols_win_4/frame-08.gif';
import symbolsWin4Frame9 from '../../assets/images/symbols_win_4/frame-09.gif';
import symbolsWin4Frame10 from '../../assets/images/symbols_win_4/frame-10.gif';

import symbolsWin5Frame1 from '../../assets/images/symbols_win_5/frame-01.gif';
import symbolsWin5Frame2 from '../../assets/images/symbols_win_5/frame-02.gif';
import symbolsWin5Frame3 from '../../assets/images/symbols_win_5/frame-03.gif';
import symbolsWin5Frame4 from '../../assets/images/symbols_win_5/frame-04.gif';
import symbolsWin5Frame5 from '../../assets/images/symbols_win_5/frame-05.gif';
import symbolsWin5Frame6 from '../../assets/images/symbols_win_5/frame-06.gif';
import symbolsWin5Frame7 from '../../assets/images/symbols_win_5/frame-07.gif';
import symbolsWin5Frame8 from '../../assets/images/symbols_win_5/frame-08.gif';
import symbolsWin5Frame9 from '../../assets/images/symbols_win_5/frame-09.gif';
import symbolsWin5Frame10 from '../../assets/images/symbols_win_5/frame-10.gif';

import symbolsWin6Frame1 from '../../assets/images/symbols_win_6/frame-01.gif';
import symbolsWin6Frame2 from '../../assets/images/symbols_win_6/frame-02.gif';
import symbolsWin6Frame3 from '../../assets/images/symbols_win_6/frame-03.gif';
import symbolsWin6Frame4 from '../../assets/images/symbols_win_6/frame-04.gif';
import symbolsWin6Frame5 from '../../assets/images/symbols_win_6/frame-05.gif';
import symbolsWin6Frame6 from '../../assets/images/symbols_win_6/frame-06.gif';
import symbolsWin6Frame7 from '../../assets/images/symbols_win_6/frame-07.gif';
import symbolsWin6Frame8 from '../../assets/images/symbols_win_6/frame-08.gif';
import symbolsWin6Frame9 from '../../assets/images/symbols_win_6/frame-09.gif';
import symbolsWin6Frame10 from '../../assets/images/symbols_win_6/frame-10.gif';

import symbolsWin7Frame1 from '../../assets/images/symbols_win_7/frame-01.gif';
import symbolsWin7Frame2 from '../../assets/images/symbols_win_7/frame-02.gif';
import symbolsWin7Frame3 from '../../assets/images/symbols_win_7/frame-03.gif';
import symbolsWin7Frame4 from '../../assets/images/symbols_win_7/frame-04.gif';
import symbolsWin7Frame5 from '../../assets/images/symbols_win_7/frame-05.gif';
import symbolsWin7Frame6 from '../../assets/images/symbols_win_7/frame-06.gif';
import symbolsWin7Frame7 from '../../assets/images/symbols_win_7/frame-07.gif';
import symbolsWin7Frame8 from '../../assets/images/symbols_win_7/frame-08.gif';
import symbolsWin7Frame9 from '../../assets/images/symbols_win_7/frame-09.gif';
import symbolsWin7Frame10 from '../../assets/images/symbols_win_7/frame-10.gif';

import symbolsWin8Frame1 from '../../assets/images/symbols_win_8/frame-01.gif';
import symbolsWin8Frame2 from '../../assets/images/symbols_win_8/frame-02.gif';
import symbolsWin8Frame3 from '../../assets/images/symbols_win_8/frame-03.gif';
import symbolsWin8Frame4 from '../../assets/images/symbols_win_8/frame-04.gif';
import symbolsWin8Frame5 from '../../assets/images/symbols_win_8/frame-05.gif';
import symbolsWin8Frame6 from '../../assets/images/symbols_win_8/frame-06.gif';
import symbolsWin8Frame7 from '../../assets/images/symbols_win_8/frame-07.gif';
import symbolsWin8Frame8 from '../../assets/images/symbols_win_8/frame-08.gif';
import symbolsWin8Frame9 from '../../assets/images/symbols_win_8/frame-09.gif';
import symbolsWin8Frame10 from '../../assets/images/symbols_win_8/frame-10.gif';

import symbolsWin9Frame1 from '../../assets/images/symbols_win_9/frame-01.gif';
import symbolsWin9Frame2 from '../../assets/images/symbols_win_9/frame-02.gif';
import symbolsWin9Frame3 from '../../assets/images/symbols_win_9/frame-03.gif';
import symbolsWin9Frame4 from '../../assets/images/symbols_win_9/frame-04.gif';
import symbolsWin9Frame5 from '../../assets/images/symbols_win_9/frame-05.gif';
import symbolsWin9Frame6 from '../../assets/images/symbols_win_9/frame-06.gif';
import symbolsWin9Frame7 from '../../assets/images/symbols_win_9/frame-07.gif';
import symbolsWin9Frame8 from '../../assets/images/symbols_win_9/frame-08.gif';
import symbolsWin9Frame9 from '../../assets/images/symbols_win_9/frame-09.gif';
import symbolsWin9Frame10 from '../../assets/images/symbols_win_9/frame-10.gif';

import symbolsWin10Frame1 from '../../assets/images/symbols_win_10/frame-01.gif';
import symbolsWin10Frame2 from '../../assets/images/symbols_win_10/frame-02.gif';
import symbolsWin10Frame3 from '../../assets/images/symbols_win_10/frame-03.gif';
import symbolsWin10Frame4 from '../../assets/images/symbols_win_10/frame-04.gif';
import symbolsWin10Frame5 from '../../assets/images/symbols_win_10/frame-05.gif';
import symbolsWin10Frame6 from '../../assets/images/symbols_win_10/frame-06.gif';
import symbolsWin10Frame7 from '../../assets/images/symbols_win_10/frame-07.gif';
import symbolsWin10Frame8 from '../../assets/images/symbols_win_10/frame-08.gif';
import symbolsWin10Frame9 from '../../assets/images/symbols_win_10/frame-09.gif';
import symbolsWin10Frame10 from '../../assets/images/symbols_win_10/frame-10.gif';

const preloaderGifTexture = [
  prelTexture1,
  prelTexture2,
  prelTexture3,
  prelTexture4,
  prelTexture5,
  prelTexture6,
  prelTexture7,
  prelTexture8,
  prelTexture9,
  prelTexture10,
  prelTexture11,
  prelTexture12,
  prelTexture13,
  prelTexture14,
];

const symbolsWin: any = [
  [
    symbolsWin1Frame1,
    symbolsWin1Frame2,
    symbolsWin1Frame3,
    symbolsWin1Frame4,
    symbolsWin1Frame5,
    symbolsWin1Frame6,
    symbolsWin1Frame7,
    symbolsWin1Frame8,
    symbolsWin1Frame9,
    symbolsWin1Frame10,
  ],
  [
    symbolsWin2Frame1,
    symbolsWin2Frame2,
    symbolsWin2Frame3,
    symbolsWin2Frame4,
    symbolsWin2Frame5,
    symbolsWin2Frame6,
    symbolsWin2Frame7,
    symbolsWin2Frame8,
    symbolsWin2Frame9,
    symbolsWin2Frame10,
  ],
  [
    symbolsWin3Frame1,
    symbolsWin3Frame2,
    symbolsWin3Frame3,
    symbolsWin3Frame4,
    symbolsWin3Frame5,
    symbolsWin3Frame6,
    symbolsWin3Frame7,
    symbolsWin3Frame8,
    symbolsWin3Frame9,
    symbolsWin3Frame10,
  ],
  [
    symbolsWin4Frame1,
    symbolsWin4Frame2,
    symbolsWin4Frame3,
    symbolsWin4Frame4,
    symbolsWin4Frame5,
    symbolsWin4Frame6,
    symbolsWin4Frame7,
    symbolsWin4Frame8,
    symbolsWin4Frame9,
    symbolsWin4Frame10,
  ],
  [
    symbolsWin5Frame1,
    symbolsWin5Frame2,
    symbolsWin5Frame3,
    symbolsWin5Frame4,
    symbolsWin5Frame5,
    symbolsWin5Frame6,
    symbolsWin5Frame7,
    symbolsWin5Frame8,
    symbolsWin5Frame9,
    symbolsWin5Frame10,
  ],
  [
    symbolsWin6Frame1,
    symbolsWin6Frame2,
    symbolsWin6Frame3,
    symbolsWin6Frame4,
    symbolsWin6Frame5,
    symbolsWin6Frame6,
    symbolsWin6Frame7,
    symbolsWin6Frame8,
    symbolsWin6Frame9,
    symbolsWin6Frame10,
  ],
  [
    symbolsWin7Frame1,
    symbolsWin7Frame2,
    symbolsWin7Frame3,
    symbolsWin7Frame4,
    symbolsWin7Frame5,
    symbolsWin7Frame6,
    symbolsWin7Frame7,
    symbolsWin7Frame8,
    symbolsWin7Frame9,
    symbolsWin7Frame10,
  ],
  [
    symbolsWin8Frame1,
    symbolsWin8Frame2,
    symbolsWin8Frame3,
    symbolsWin8Frame4,
    symbolsWin8Frame5,
    symbolsWin8Frame6,
    symbolsWin8Frame7,
    symbolsWin8Frame8,
    symbolsWin8Frame9,
    symbolsWin8Frame10,
  ],
  [
    symbolsWin9Frame1,
    symbolsWin9Frame2,
    symbolsWin9Frame3,
    symbolsWin9Frame4,
    symbolsWin9Frame5,
    symbolsWin9Frame6,
    symbolsWin9Frame7,
    symbolsWin9Frame8,
    symbolsWin9Frame9,
    symbolsWin9Frame10,
  ],
  [
    symbolsWin10Frame1,
    symbolsWin10Frame2,
    symbolsWin10Frame3,
    symbolsWin10Frame4,
    symbolsWin10Frame5,
    symbolsWin10Frame6,
    symbolsWin10Frame7,
    symbolsWin10Frame8,
    symbolsWin10Frame9,
    symbolsWin10Frame10,
  ],
];

const symbolsDef = [
  symbol1,
  symbol2,
  symbol3,
  symbol4,
  symbol5,
  symbol6,
  symbol7,
  symbol8,
  symbol9,
  symbol10,
];

export const gameDataDef = {
  symbolsDef,
  bgSlotGame,
  bgLoadingAnubis,
  spinBtn,
};

export const gameDataGif: any = {
  symbolsWin,
};

export let readyGameDataSymbolsWin: any = [];

export let readyGameDataPreloader: any = [];

export async function loadCriticalData(): Promise<void> {
  readyGameDataPreloader = [];

  const itemsKeyForPreloaderGif: Array<string> = [];

  preloaderGifTexture.forEach((el: any, i: number) => {
    PIXI.Assets.add({ alias: `preloader${i}`, src: el });

    itemsKeyForPreloaderGif.push('preloder' + i);
  });

  await PIXI.Assets.load(itemsKeyForPreloaderGif);

  for (let i = 0; i < itemsKeyForPreloaderGif.length; i++) {
    readyGameDataPreloader.push(PIXI.Texture.from(preloaderGifTexture[i]));
  }
}

export function createGameDataSymbolsWin(pixiData: any) {
  readyGameDataSymbolsWin = [];
  const getSymbolsWin: any = Object.entries(pixiData).filter(
    (arr: Array<any>) => {
      return arr[0].includes('symbolsWin');
    },
  );

  let counter = 0;
  let arrayCounter = 0;
  const maxPixiObjectsInOneArray = 10;
  for (let i = 0; i < getSymbolsWin.length; i++) {
    if (counter === 0) {
      readyGameDataSymbolsWin.push([]);
    }
    if (counter < maxPixiObjectsInOneArray) {
      const createPixiTexture: any = new PIXI.AnimatedSprite(
        getSymbolsWin[i][1],
      );
      readyGameDataSymbolsWin[arrayCounter].push(createPixiTexture);
      counter++;
    }
    if (counter === 10) {
      counter = 0;
      arrayCounter++;
    }
  }
}
