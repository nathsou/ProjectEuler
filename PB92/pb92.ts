import { square } from "../Utils/functions";
import { count, range } from "../Utils/iters";

const digitsSquareSum = (n: number) => {
  let sum = 0;

  while (n > 0) {
    sum = sum + square(n % 10);
    n = Math.floor(n / 10);
  }

  return sum;
};

const reaches89 = (n: number): boolean => {
  if (n === 1) return false;
  if (n === 89) return true;
  return reaches89(digitsSquareSum(n));
};

const pb92 = (N = 10 ** 7) => count(range(1, N), reaches89);

console.log(pb92());