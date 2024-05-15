import * as PIXI from 'pixi.js';
import {
  arrowsLowTexture,
  arrowsTopTexture,
  bgLoadingAnubisTexture,
  fireTextures,
  gameData,
  preloaderGifTexture,
  spinBtnOffTexture,
  symbolsWin,
} from './textures';

export let readyGameDataSymbolsWin: any = [];

export let readyGameDataPreloader: any = [];

export let readyGameDataSpinBtnOff: any = [];

export let readyGameDataArrowUp: any = [];

export let readyGameDataArrowLow: any = [];

export let readyGameDataFireTextures: any = [];

export let readyGameDataStormTextures: any = [];

export async function loadingAnubisBgTexture(): Promise<void> {
  if (!PIXI.Assets.resolver.hasKey('bgLoadingAnubis')) {
    PIXI.Assets.add({
      alias: 'bgLoadingAnubis',
      src: bgLoadingAnubisTexture,
    });
  }

  await PIXI.Assets.load('bgLoadingAnubis');
}

export async function loadPreloaderTexture(): Promise<void> {
  readyGameDataPreloader = [];
  const itemsKeyForPreloaderGif: Array<string> = [];
  const keyForPreloader = 'preloader';

  preloaderGifTexture.forEach((el: any, i: number) => {
    if (!PIXI.Assets.resolver.hasKey(`${keyForPreloader}${i}`)) {
      PIXI.Assets.add({ alias: `${keyForPreloader}${i}`, src: el });
    }

    itemsKeyForPreloaderGif.push(`${keyForPreloader}${i}`);
  });

  await PIXI.Assets.load(itemsKeyForPreloaderGif, progress => {
    if (progress === 1) {
      for (let i = 0; i < itemsKeyForPreloaderGif.length; i++) {
        readyGameDataPreloader.push(PIXI.Texture.from(preloaderGifTexture[i]));
      }
    }
  });
}

export function createKeysForTextures(): Array<string> {
  const itemsKeyForLoading: Array<string> = [];

  for (const key in gameData) {
    const el = key as keyof typeof gameData;
    if (Array.isArray(gameData[el])) {
      for (let i = 0; i < gameData[el].length; i++) {
        if (!PIXI.Assets.resolver.hasKey(`${key}${i}`)) {
          PIXI.Assets.add({
            alias: `${key}${i}`,
            src: gameData[el][i],
          });
        }

        itemsKeyForLoading.push(`${key}${i}`);
      }
    } else {
      if (!PIXI.Assets.resolver.hasKey(`${key}`)) {
        PIXI.Assets.add({ alias: `${key}`, src: gameData[el] });
      }

      itemsKeyForLoading.push(`${key}`);
    }
  }

  return itemsKeyForLoading;
}

export async function createGameDataFire() {
  readyGameDataFireTextures = [];

  for (let i = 0; i < fireTextures.length; i++) {
    readyGameDataFireTextures.push(PIXI.Texture.from(fireTextures[i]));
  }
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
  readyGameDataArrowUp = [];
  readyGameDataArrowLow = [];
  for (let i = 0; i < arrowsTopTexture.length; i++) {
    readyGameDataArrowUp.push(PIXI.Texture.from(arrowsTopTexture[i]));
  }

  for (let g = 0; g < arrowsLowTexture.length; g++) {
    readyGameDataArrowLow.push(PIXI.Texture.from(arrowsLowTexture[g]));
  }
}
