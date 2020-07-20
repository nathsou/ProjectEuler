import { binomial } from "../Utils/permutations";

const pb53 = () => {
    let count = 0;
    for (let n = 1; n <= 100; n++) {
        for (let r = 1; r < n; r++) {
            if (binomial(n, r) > 10 ** 6) {
                count++;
            }
        } 
    }

    return count;
};

console.log(pb53());