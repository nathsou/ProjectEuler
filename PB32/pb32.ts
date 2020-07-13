import { digits, join, range } from "../Utils/iters";
import { sum, intLog } from "../Utils/math";

const digitsCount = (n: number): number => intLog(n, 10) + 1;

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
/// 2 * (#digits(a) + #digits(b)) = 9 
/// -> (#digits(a) + #digits(b)) <= 5
// -> #digits(b) <= 5 - #digits(a)

// possibilities are therefore :
// a * bcde = fghi
// ab * cde = fghi
// abc * de = fghi
// abcd * e = fghi

// by commutation, the last two cases don't have to be checked again

const pb32 = (): number => {
    const prods = new Set<number>();
    for (const a of range(1, 99)) {
        const d_b = 5 - digitsCount(a);
        for (const b of range(10 ** (d_b - 1), 10 ** d_b - 1)) {
            if (is1Through9PandigitalProduct(a, b)) {
                prods.add(a * b);
                // console.log(a, b, a * b);
            }
        }
    }

    return sum(prods);
};

console.log(pb32());