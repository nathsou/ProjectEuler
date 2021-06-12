import { fst } from "../Utils/functions";

const keylog = [
  319, 680, 180, 690, 129, 620, 762, 689, 762, 318, 368, 710, 720, 710, 629, 168, 160, 689, 716,
  731, 736, 729, 316, 729, 729, 710, 769, 290, 719, 680, 318, 389, 162, 289, 162, 718, 729, 319,
  790, 680, 890, 362, 319, 760, 316, 729, 380, 319, 728, 716
].map(n => `${n}`).map(([a, b, c]) => [Number(a), Number(b), Number(c)] as const);

// assumes each digit only appears once
const pb79 = (): number => {
  const digitsBefore = new Map<number, Set<number>>();
  const digits = new Set(keylog.flat(2));

  digits.forEach(key => { digitsBefore.set(key, new Set()); });

  const setBefore = (num: number, before: number): void => {
    digitsBefore.get(num)?.add(before);
  };

  for (const [a, b, c] of keylog) {
    setBefore(b, a);
    setBefore(c, a);
    setBefore(c, b);
  }

  return Number([...digitsBefore.entries()]
    .map(([n, before]) => [n, before.size])
    .sort(([, a], [, b]) => a - b)
    .map(fst)
    .join(''));
};

console.log(pb79());