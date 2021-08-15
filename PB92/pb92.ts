import { square } from "../Utils/functions";
import { count, digits, range } from "../Utils/iters";
import { sum } from "../Utils/math";
import { memoize } from "../Utils/memoize";

const digitsSquareSum = (n: number) => sum(digits(n).map(square));

const reaches89 = memoize((n: number): boolean => {
  if (n === 1) return false;
  if (n === 89) return true;
  return reaches89(digitsSquareSum(n));
});

const pb92 = (N = 10 ** 7) => count(range(1, N), reaches89);

console.log(pb92());