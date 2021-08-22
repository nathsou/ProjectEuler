import { eq } from "../Utils/functions";
import { findIndex, map, max, min, range, slice } from "../Utils/iters";
import { properDivisorsSum } from "../Utils/math";

const amicableChain = (n: number, properDivisorsSums: Map<number, number>): number[] => {
  const prev = new Set<number>();

  while (properDivisorsSums.has(n)) {
    if (prev.has(n)) {
      // only return the repeating section
      return [...slice(prev, findIndex(prev, eq(n)))];
    } else {
      prev.add(n);
      n = properDivisorsSums.get(n);
    }
  }

  return [];
};

const pb95 = (N = 10 ** 6) => {
  const properDivisorsSums = new Map(
    map(range(1, N),
      n => [n, properDivisorsSum(n)])
  );

  const longestAmicableChain = max(
    map(range(1, N), n => amicableChain(n, properDivisorsSums)),
    (a, b) => a.length > b.length
  ).value;

  return min(longestAmicableChain).value;
};

console.log(pb95());