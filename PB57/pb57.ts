import { count, digitsCount, range, scanLeft2 } from "../Utils/iters";

const fracs = (m: number) => {
    return scanLeft2(range(m), ([a, b]) => [a + 2n * b, a + b], [1n, 1n]);
};

const pb57 = (m = 1000) => {
    return count(fracs(m), ([a, b]) => digitsCount(a) > digitsCount(b));
};

console.log(pb57());