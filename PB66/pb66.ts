import { sqrtConvergentsB } from "../Utils/fractions";
import { compose, fst, not, snd } from "../Utils/functions";
import { filter, find, map, max, range } from "../Utils/iters";
import { isSquare } from "../Utils/math";

// let p / q ≈ sqrt(D) for integers p, q and D
// then a^2 - k^2 ≈ 0
// in particular lim_(n -> +inf) h_n / k_n = sqrt(D) where h_n, k_n are the convergents of sqrt(D)
// therefore lim_(n -> +inf) h_n^2 - D * k_n^2 = 0
// if D is a perfect square, then h_0^2 - D * k_0^2 = 0
// so the equation h_n^2 - D * k_n^2 = 1 has no solution
// if D is not a perfect square, then for some n,
// h_n^2 - D * k_n^2 = 1
// see https://en.wikipedia.org/wiki/Pell%27s_equation

const solve = (D: number): [bigint, bigint] => {
    const D_ = BigInt(D);
    return find(sqrtConvergentsB(D), ([h, k]) => h * h - D_ * k * k === 1n).value;
};

const pb66 = (m = 1000) => {
    return snd(max(
        map(filter(range(2, m), compose(not, isSquare)), D => [fst(solve(D)), D]),
        ([x1, D1], [x2, D2]) => x1 > x2
    ).value as [number, number]);
};

console.log(pb66());