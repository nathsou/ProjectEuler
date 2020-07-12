import { digits, join, range } from "../Utils/iters";
import { sum } from "../Utils/math";

const digitsCount = (n: number): number => `${n}`.length;

const is1Through9PandigitalProduct = (a: number, b: number): boolean => {
    if (digitsCount(a) + digitsCount(b) + digitsCount(a * b) !== 9) return false;
    const digitCounts = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (const digit of join(digits(a), digits(b), digits(a * b))) {
        if (digit === 0 || ++digitCounts[digit - 1] > 1) return false;
    }

    return digitCounts.every(c => c === 1);
};

// we want to generate a and b such that
// #digits(a) + #digits(b) + #digits(a * b) = 9
// #digits(a * b) <= #digits(a) + #digits(b) since #digits(n) = floor(log10(n)) + 1
/// 2 * (#digits(a) + d(b)) = 9 
/// -> (d(a) + d(b)) < 5 
const pb32 = () => {
    const prods = new Set<number>();
    for (const a of range(1, 10 ** 5)) {
        const d_a = digitsCount(a);
        for (const b of range(1, 10 ** (5 - d_a))) {
            if (is1Through9PandigitalProduct(a, b)) {
                prods.add(a * b);
                // console.log(a, b, a * b);
            }
        }
    }

    return sum(prods.values());
};

console.log(pb32());