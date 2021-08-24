import { fst } from "../Utils/functions";
import { find, map } from "../Utils/iters";
import { nats } from "../Utils/math";

// https://www.wolframalpha.com/input/?i=2a%5E2-b%5E2-2a%2Bb%3D0
const couple = (n: number): [number, number] => {
  const a = 1 / 8 * ((2 + Math.SQRT2) * (3 - 2 * Math.SQRT2) ** n - (Math.SQRT2 - 2) * (3 + 2 * Math.SQRT2) ** n + 4);
  const b = 1 / 4 * ((1 + Math.SQRT2) * (3 - 2 * Math.SQRT2) ** n - (Math.SQRT2 - 1) * (3 + 2 * Math.SQRT2) ** n + 2);
  return [Math.round(a), Math.round(b)];
};

const gen = () => map(nats(), n => couple(-n));

const pb100 = () => {
  return fst(find(gen(), ([_, b]) => b > 10 ** 12).value);
};

console.log(pb100());