import { uniq } from "../Utils/arrays";
import { fill, filter, range } from "../Utils/iters";
import { decompose, sum } from "../Utils/math";

const ks = (n: number): Set<number> => {
  const ks = new Set<number>();

  for (const set of decompose(n)) {
    const total = sum(set);
    if (set.length > 1 && total <= n) {
      // if a * b = n, and a + b <= n,
      // then 1 * 1 * ... * 1 * a * b = 1 + 1 + ... + 1 + a + b
      // with n - (a + b) ones
      const k = n - total + set.length;
      ks.add(k);
    }
  }

  return ks;
};

const pb88 = (N = 12000): number => {
  const productSumNums = fill(0, N + 1);
  // make sure every 2 <= k <= N has an associated value
  const remaining = new Set(range(2, N));

  for (const n of range(4, Infinity)) {
    for (const k of filter(ks(n), k => productSumNums[k] === 0)) {
      productSumNums[k] = n;
      remaining.delete(k);

      if (remaining.size === 0) {
        return sum(uniq(productSumNums));
      }
    }
  }
};

console.log(pb88());