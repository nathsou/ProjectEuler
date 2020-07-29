import { count, skip } from "../Utils/iters";
import { sum } from "../Utils/math";
import { primitivePythagorianTriplets as primitiveTriplets } from "../Utils/pythagorianTriplets";
import { eq } from "../Utils/functions";

const pb75 = (m = 1_500_000) => {
    const primitiveTripletSums: number[] = [];

    // build a sieve of multiples of primitive pythagorian triplets
    for (const triplet of skip(primitiveTriplets(m), 1)) {
        const s = sum(triplet);
        let ks = s;
        while (ks <= m) {
            primitiveTripletSums[ks] = (primitiveTripletSums[ks] || 0) + 1;
            ks += s;
        }
    }

    return count(primitiveTripletSums, eq(1));
};

console.log(pb75());