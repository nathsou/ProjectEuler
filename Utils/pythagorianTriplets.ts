import { count, It } from "./iters";
import { divisors, gcd } from "./math";

export type Triplet<T = number> = [T, T, T];

// https://en.wikipedia.org/wiki/Pythagorean_triple
export const genPythagorianTriplet = (n: number, m: number): Triplet => {
    const a = m ** 2 - n ** 2
    const b = 2 * m * n;
    const c = m ** 2 + n ** 2;

    if (a < b) {
        return [a, b, c]
    }

    return [b, a, c];
};

export const isPythagorianTripletPrimitive = (triplet: Triplet): boolean => {
    return gcd(triplet) === 1;
};

// if [a, b, c] is a pythagorean triplet, then [ka, kb, kc] with k in N is also
// a pythagorean triplet.
// if sum(triplet) = d where d is a divisor of n, then [ka, kb, kc] with k = (n / d)
// will generate a triplet whose sum is n.
// therefore to count triplets whose sum is n, we can simply count how many of n's divisors
// can be obtained as the sum of primitive triplets

export const countPythagorianTripletsSummingTo = (n: number, primitiveTripletSums: Set<number>) => {
    return count(divisors(n), d => primitiveTripletSums.has(d));
};

export function* primitivePythagorianTriplets(maxSum: number): It<Triplet> {
    // a + b + c = sum
    // (m ** 2 - n ** 2) + (2 * m * n) + (m ** 2 + n ** 2) = sum
    // 2 * m ** 2 + 2 * m * n = sum
    // set n = 1
    // 2m^2 + 2m = sum
    // 2m^2 + 2m - sum = 0

    const max = Math.ceil((-2 + Math.sqrt(4 + 8 * maxSum)) / 4);

    for (let n = 0; n <= max; n++) {
        for (let m = n + 1; m <= max; m++) {
            const t = genPythagorianTriplet(n, m);
            if (isPythagorianTripletPrimitive(t)) {
                yield t;
            }
        }
    }
}