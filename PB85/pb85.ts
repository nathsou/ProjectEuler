import { map, pairs, range } from "../Utils/iters";
import { createLogger } from "../Utils/logger";
import { dichotomy, sum } from "../Utils/math";

const innerRectsCount = (w1: number, h1: number, w: number, h: number) => {
  return (w - w1 + 1) * (h - h1 + 1);
};

const totalInnerRects = (w: number, h: number): number => {
  return sum(map(pairs(range(1, w), range(1, h)), ([w1, h1]) => innerRectsCount(w1, h1, w, h)));
};

type Rect = [number, number];

const logger = createLogger('off');

const pb85 = () => {
  const goal = 2 * 10 ** 6;
  const f = (w: number) => (h: number) => totalInnerRects(w, h) - goal;

  let closesDist = Infinity;
  let closestRect: Rect = [Infinity, Infinity];
  let upper = Math.ceil(goal / 2);

  for (const w of range(1, Infinity)) {
    const lowerHeight = dichotomy(1, upper, f(w), 1000, (a, b) => Math.floor((a + b) / 2));
    const upperHeight = dichotomy(lowerHeight, lowerHeight + 1, f(w), 1000, (a, b) => Math.ceil((a + b) / 2));

    const r1 = f(w)(lowerHeight);
    const r2 = f(w)(upperHeight);

    upper = upperHeight;

    const [dist, h] = Math.abs(r1) < Math.abs(r2)
      ? [Math.abs(r1), lowerHeight]
      : [Math.abs(r2), upperHeight];

    if (dist < closesDist) {
      closesDist = dist;
      closestRect = [w, h];
      logger.log(`min: ${closesDist}, ${w} x ${h}`);
    }

    if (w > h) {
      break;
    }

    logger.log(`${w} x ${h} : ${f(w)(h)}`);
  }

  const [w, h] = closestRect;

  return w * h;
};

console.log(pb85());