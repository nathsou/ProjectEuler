import { compose } from "../Utils/functions";
import { count, II } from "../Utils/iters";
import { isInt } from "../Utils/math";

type Cuboid = [number, number, number];

const cuboidShortestPath = ([a, b, c]: Cuboid): number => {
  const d1 = a ** 2 + (b + c) ** 2;
  const d2 = b ** 2 + (a + c) ** 2;
  const d3 = c ** 2 + (a + b) ** 2;

  return Math.sqrt(Math.min(d1, d2, d3));
};

function* cuboids(M: number): II<Cuboid> {
  for (let a = 1; a <= M; a++) {
    for (let b = a; b <= M; b++) {
      yield [a, b, M];
    }
  }
}

const pb86 = (max = 10 ** 6) => {
  let total = 0;
  let M = 0;

  while (total < max) {
    total += count(cuboids(++M), compose(isInt, cuboidShortestPath));
  }

  return [total, M];
};

console.log(pb86());