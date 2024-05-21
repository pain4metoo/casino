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
} from './Textures';

export let readyGameDataSymbolsWin: Array<Array<PIXI.Texture>> = [];

export let readyGameDataPreloader: Array<PIXI.Texture> = [];

export let readyGameDataSpinBtnOff: Array<PIXI.Texture> = [];

export let readyGameDataArrowUp: Array<PIXI.Texture> = [];

export let readyGameDataArrowLow: Array<PIXI.Texture> = [];

export let readyGameDataFireTextures: Array<PIXI.Texture> = [];

export let readyGameDataStormTextures: Array<PIXI.Texture> = [];

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
  const itemsKeyForPreloaderGif: Array<string> = [];
  const keyForPreloader = 'preloader';

  preloaderGifTexture.forEach((el: string, i: number) => {
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
  for (let i = 0; i < fireTextures.length; i++) {
    readyGameDataFireTextures.push(PIXI.Texture.from(fireTextures[i]));
  }
}

export async function createGameDataSymbolsWin() {
  for (let i = 0; i < symbolsWin.length; i++) {
    readyGameDataSymbolsWin.push([]);
    for (let g = 0; g < symbolsWin[i].length; g++) {
      readyGameDataSymbolsWin[i].push(PIXI.Texture.from(symbolsWin[i][g]));
    }
  }
}

export async function createGameDataSpinBtnOff() {
  for (let i = 0; i < spinBtnOffTexture.length; i++) {
    readyGameDataSpinBtnOff.push(PIXI.Texture.from(spinBtnOffTexture[i]));
  }
}

export async function createGameDataArrows() {
  for (let i = 0; i < arrowsTopTexture.length; i++) {
    readyGameDataArrowUp.push(PIXI.Texture.from(arrowsTopTexture[i]));
  }

  for (let g = 0; g < arrowsLowTexture.length; g++) {
    readyGameDataArrowLow.push(PIXI.Texture.from(arrowsLowTexture[g]));
  }
}
