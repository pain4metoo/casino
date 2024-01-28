import { Assets } from 'pixi.js';
const symbol1 = require(`../../assets/images/symbols-win/1.gif`);
const symbol2 = require(`../../assets/images/symbols-win/2.gif`);
const symbol3 = require(`../../assets/images/symbols-win/3.gif`);
const symbol4 = require(`../../assets/images/symbols-win/4.gif`);
const symbol5 = require(`../../assets/images/symbols-win/5.gif`);
const symbol6 = require(`../../assets/images/symbols-win/6.gif`);
const symbol7 = require(`../../assets/images/symbols-win/7.gif`);
const symbol8 = require(`../../assets/images/symbols-win/8.gif`);
const symbol9 = require(`../../assets/images/symbols-win/9.gif`);
const symbol10 = require(`../../assets/images/symbols-win/10.gif`);

const symbolsImageData = [
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

export const resultGIFImages: any[] = [];

const loadFIG = async () => {
  for (let i = 0; i < symbolsImageData.length; i++) {
    const gif = await Assets.load(symbolsImageData[i]);

    resultGIFImages.push(gif);
  }
};
window.onload = () => {
  loadFIG();
};
