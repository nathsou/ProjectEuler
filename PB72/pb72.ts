import { totient } from "../Utils/primeFactors";
import { range, map } from "../Utils/iters";
import { sum } from "../Utils/math";

// since a / b < 1, a < b
// so there are d * (d - 1) pairs (a, b) where a != b and a, b < d
// and there are d * (d - 1) / 2 pairs where a < b, a != b and a, b < d

// some of those fractions are integer multiples of others (improper fractions)
// our solution is therefore the total number of fractions minus the number
// of improper fractions

// given a proper fraction (gcd(a, b) = 1), 2a/2b, 3a/3b ... (floor(d / b) * a) / (floor(d / b) * b)
// are all improper fractions
// therefore there are floor(d / b) - 1 improper fractions that are multiples of a / b
// notice that the numerator is not taken into account, all that maters is
// that gcd(a, b) = 1

// the total number of improper fractions with denominator b
// is then (floor(d / b) - 1) * (the number of proper fractions a / b)
// which is (floor(d / b) - 1) * (count(range(1, b), a => gcd(a, b) === 1))
// = (floor(d / b) - 1) * totient(b)

// counts the number of fractions a / b, where a / b < 1 and b <= d
const countFractions = (d: number): number => {
    // since 2a / 2b is the smallest possible improper multiple of a / b
    // we can stop at floor(d / 2)
    const m = Math.floor(d / 2);
    const improperCount = sum(map(range(1, m), b => totient(b) * (Math.floor(d / b) - 1)));

    return d * (d - 1) / 2 - improperCount;
};

const pb72 = (d = 10 ** 6) => {
    return countFractions(d);
};

console.log(pb72());