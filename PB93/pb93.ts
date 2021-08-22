import { countWhile, It, map, max, range } from "../Utils/iters";
import { expressions } from "./expressions";

function* digits(): It<[number, number, number, number]> {
  for (const a of range(0, 9)) {
    for (const b of range(a, 9)) {
      for (const c of range(b, 9)) {
        for (const d of range(c, 9)) {
          yield [a, b, c, d];
        }
      }
    }
  }
}

const consecutiveIntsLen = (nums: number[]): number => {
  return countWhile(range(1, nums.length), n => nums.includes(n));
};

const pb93 = () => {
  const ds = [...digits()];
  const { index } = max(map(ds, ([a, b, c, d]) =>
    consecutiveIntsLen(expressions.map(f => f(a, b, c, d)))
  ));

  return ds[index].join('');
};

console.log(pb93());