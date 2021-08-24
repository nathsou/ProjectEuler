import { isInt } from "../Utils/math";

const isShortestPathIntegral = (a: number, b: number, c: number): boolean => {
  const d1 = a ** 2 + (b + c) ** 2;
  const d2 = b ** 2 + (a + c) ** 2;
  const d3 = c ** 2 + (a + b) ** 2;

  return isInt(Math.sqrt(Math.min(d1, d2, d3)));
};

const pb86 = (max = 10 ** 6): number => {
  let total = 0;
  let M = 0;

  while (total < max) {
    M++;
    for (let a = 1; a <= M; a++) {
      for (let b = a; b <= M; b++) {
        if (isShortestPathIntegral(a, b, M)) {
          total += 1;
        }
      }
    }
  }

  return M;
};

console.log(pb86());