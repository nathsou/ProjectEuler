import { map, max, range } from "../Utils/iters";
import { sum } from "../Utils/math";
import {
    primitivePythagorianTriplets as primitiveTriplets,
    countPythagorianTripletsSummingTo as countTripletsSummingTo
} from "../Utils/pythagorianTriplets";

const pb39 = (upperBound = 1000) => {
    const primitiveTripletSums = new Set(map(primitiveTriplets(upperBound), sum));
    return max(map(range(upperBound), n => countTripletsSummingTo(n, primitiveTripletSums))).index;
};

console.log(pb39());