import { count, It, map, max, range } from "../Utils/iters";
import { divisors, gcd, solveQuadraticEq, sum } from "../Utils/math";

type Triplet<T = number> = [T, T, T]; 

// https://en.wikipedia.org/wiki/Pythagorean_triple
const genTriplet = (n: number, m: number): Triplet => {
    const a = m ** 2 - n ** 2
    const b = 2 * m * n;
    const c = m ** 2 + n ** 2;

    if (a < b) {
        return [a, b, c]
    }

    return [b, a, c];
};

const isPrimitive = (triplet: Triplet): boolean => {
    return gcd(triplet) === 1;
};


// if [a, b, c] is a pythagorean triplet, then [ka, kb, kc] with k in N is also
// a pythagorean triplet.
// if sum(triplet) = d where d is a divisor of n, then [ka, kb, kc] with k = (n / d)
// will generate a triplet whose sum is n.
// therefore to count triplets whose sum is n, we can simply count how many of n's divisors
// can be obtained as the sum of primitive triplets

const countTripletsSummingTo = (n: number, primitiveTripletSums: Set<number>) => {
    return count(divisors(n), d => primitiveTripletSums.has(d));
};

function* primitiveTriplets(maxSum: number): It<Triplet> {
    // a + b + c = sum
    // 2 * (m ** 2) + (2 * m * n) + m ** 2 + n ** 2 = sum
    // set n = 1
    // 2 * (m ** 2) + (2 * m) + m ** 2 + 1 = sum
    // 3 * (m ** 2) + (2 * m) + 1 = sum
    // 3 * (m ** 2) + (2 * m) - sum + 1 = 0

    const max = Math.ceil(Math.max(...solveQuadraticEq(3, 2, -maxSum + 1)));

    for (let n = 0; n <= max; n++) {
        for (let m = n + 1; m <= max; m++) {
            const t = genTriplet(n, m);
            if (isPrimitive(t)) {
                yield t;
            }
        }
    }
}

const pb39 = (upperBound = 1000) => {
    const primitiveTripletSums = new Set([...map(primitiveTriplets(upperBound), sum)]);
    return max(map(range(upperBound), n => countTripletsSummingTo(n, primitiveTripletSums))).index;
};

console.log(pb39(1000));