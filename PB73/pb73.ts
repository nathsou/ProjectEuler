import { gcd } from "../Utils/math";

// if we assume that fractions are evenly distributed,
// then approximately 1 / (1/2 - 1/3) = 1/6th of the range from 0 to 1
// should be between 1/3 and 1/2
// since we know how many irreducible fractions  a / b with a < b <= d there are
// our solution should be close to countFractions(d) / 6

// brute force approach: 
const pb73 = (d = 12000) => {
    let count = 0;
    for (let b = 2; b <= d; b++) {
        for (let a = 1; a < b; a++) {
            if (a / b > 1 / 3 && a / b < 1 / 2 && gcd([a, b]) === 1) {
                count++;
            }
        }
    }

    return count;
};

console.log(pb73());