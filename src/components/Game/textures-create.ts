import * as PIXI from 'pixi.js';
import {
  arrowsLowTexture,
  arrowsTopTexture,
  preloaderGifTexture,
  spinBtnOffTexture,
  symbolsWin,
} from './textures';

export let readyGameDataSymbolsWin: any = [];

export let readyGameDataPreloader: any = [];

export let readyGameDataSpinBtnOff: any = [];

export let readyGameDataArrowUp: any = [];

export let readyGameDataArrowLow: any = [];

export async function loadCriticalData(): Promise<void> {
  readyGameDataPreloader = [];

  const itemsKeyForPreloaderGif: Array<string> = [];

  preloaderGifTexture.forEach((el: any, i: number) => {
    PIXI.Assets.add({ alias: `preloader${i}`, src: el });

    itemsKeyForPreloaderGif.push('preloder' + i);
  });

  await PIXI.Assets.load(itemsKeyForPreloaderGif, progress => {
    if (progress === 1) {
      for (let i = 0; i < itemsKeyForPreloaderGif.length; i++) {
        readyGameDataPreloader.push(PIXI.Texture.from(preloaderGifTexture[i]));
      }
    }
  });
}

export async function createGameDataSymbolsWin() {
  readyGameDataSymbolsWin = [];

  for (let i = 0; i < symbolsWin.length; i++) {
    readyGameDataSymbolsWin.push([]);
    for (let g = 0; g < symbolsWin[i].length; g++) {
      const newPixiTexture = PIXI.Texture.from(symbolsWin[i][g]);
      readyGameDataSymbolsWin[i].push(newPixiTexture);
    }
  }
}

export async function createGameDataSpinBtnOff() {
  readyGameDataSpinBtnOff = [];

  for (let i = 0; i < spinBtnOffTexture.length; i++) {
    readyGameDataSpinBtnOff.push(PIXI.Texture.from(spinBtnOffTexture[i]));
  }
}

export async function createGameDataArrows() {
  readyGameDataArrowLow = [];
  readyGameDataArrowUp = [];

  for (let i = 0; i < arrowsTopTexture.length; i++) {
    readyGameDataArrowUp.push(PIXI.Texture.from(arrowsTopTexture[i]));
  }

  for (let g = 0; g < arrowsLowTexture.length; g++) {
    readyGameDataArrowLow.push(PIXI.Texture.from(arrowsLowTexture[g]));
  }
}
