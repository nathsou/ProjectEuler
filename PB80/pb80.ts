import { filter, map, range } from "../Utils/iters";
import { sum } from "../Utils/math";

const sqrt = (n: bigint, digits: number): bigint => {
  const a = n * (10n ** BigInt(2.1 * digits));
  let x = a;
  let delta = a;

  while (delta > 1) {
    delta = (x ** 2n - a) / (2n * x);
    x -= delta;
  }

  return x;
};

const sqrtDigits = (n: number, digits: number): number[] => {
  return `${sqrt(BigInt(n), digits)}`
    .slice(0, digits)
    .split('')
    .map(Number);
};

const pb80 = () => {
  const irrationals = filter(range(1, 100), n => !Number.isInteger(Math.sqrt(n)));
  return sum(map(irrationals, n => sum(sqrtDigits(n, 100))));
};

console.log(pb80());
