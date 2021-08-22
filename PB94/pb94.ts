import { modProduct, modProductB } from "../modulo";
import { map } from "../Utils/iters";
import { sqrtB, sum } from "../Utils/math";

const isCloseToInteger = (x: number, eps = 0.00001): boolean => {
  return Math.abs(x - Math.floor(x)) < eps;
};

// Heron's formula:
// p = (a + b + c) / 2, A = sqrt(p * (p - a) * (p - b) * (p - c))
// since we look for almost equilateral triangles,
// we have two cases: (a = b, c = a + 1) and (a = b, c = a - 1), by simpliying we get :
// A+(n) = 1 / 4 * (n + 1) * sqrt((n - 1) * (3 * n + 1))
// A-(n) = 1 / 4 * (n - 1) * sqrt((n + 1) * (3 * n - 1))
// so A+(n) is an integer if sqrt((n + 1) * (3 * n - 1)) is an integer and (n - 1) * sqrt((n + 1) * (3 * n - 1)) is divisible by 4

//A-(n)
const check1 = (n: number): boolean => {
  // split the computation of s to prevent overflow
  const s = Math.sqrt(n - 1) * Math.sqrt(3 * n + 1);
  // this produces a few false positives due to float precision
  // double check using big ints
  return isCloseToInteger(s) && modProduct(s, n + 1, 4) === 0 && check1B(BigInt(n));
};

const check1B = (n: bigint): boolean => {
  const m = (n - 1n) * (3n * n + 1n);
  const s = sqrtB(m);
  if (s * s === m && modProductB(s, n + 1n, 4n) === 0n) {
    const area = (s * (n + 1n)) / 4n;
    return area > 0n;
  }
};

// A+(n)
const check2 = (n: number): boolean => {
  const s = Math.sqrt(n + 1) * Math.sqrt(3 * n - 1);
  return isCloseToInteger(s) && modProduct(s, n - 1, 4) === 0 && check2B(BigInt(n));
};

const check2B = (n: bigint): boolean => {
  const m = (n + 1n) * (3n * n - 1n);
  const s = sqrtB(m);
  if (s * s === m && modProductB(s, n - 1n, 4n) === 0n) {
    const area = (s * (n - 1n)) / 4n;
    return area > 0n;
  }
};

const pb94 = (max = 10 ** 9) => {
  const triangles: Array<[number, number, number]> = [];
  const end = max / 3 + 1;

  for (let n = 1; n <= end; n++) {
    if (check1(n)) {
      triangles.push([n, n, n + 1]);
    }

    if (check2(n)) {
      triangles.push([n, n, n - 1]);
    }
  }

  return sum(map(triangles, sum));
};

console.log(pb94());