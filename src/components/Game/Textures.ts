import * as PIXI from 'pixi.js';

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
import symbolWin1 from '../../assets/images/symbols-win/1.mp4';
import symbolWin2 from '../../assets/images/symbols-win/2.mp4';
import symbolWin3 from '../../assets/images/symbols-win/3.mp4';
import symbolWin4 from '../../assets/images/symbols-win/4.mp4';
import symbolWin5 from '../../assets/images/symbols-win/5.mp4';
import symbolWin6 from '../../assets/images/symbols-win/6.mp4';
import symbolWin7 from '../../assets/images/symbols-win/7.mp4';
import symbolWin8 from '../../assets/images/symbols-win/8.mp4';
import symbolWin9 from '../../assets/images/symbols-win/9.mp4';
import symbolWin10 from '../../assets/images/symbols-win/10.mp4';

export const symbols = [
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

export const symbolsWin = [
  symbolWin1,
  symbolWin2,
  symbolWin3,
  symbolWin4,
  symbolWin5,
  symbolWin6,
  symbolWin7,
  symbolWin8,
  symbolWin9,
  symbolWin10,
];

export function makeLoopTextures() {
  for (let i = 0; i < symbolsWin.length; i++) {
    const bg = PIXI.Texture.from(symbolsWin[i]);

    (bg.baseTexture.resource as any).source.loop = true;
  }
}
