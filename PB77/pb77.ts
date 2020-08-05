import { countSums } from "../PB31/countSums";
import { range, skip } from "../Utils/iters";
import { primes } from "../Utils/primes";

const pb77 = (m = 5000): number => {
    const ps = [2];

    for (const p of skip(primes(), 1)) {
        for (const n of range(ps[ps.length - 1], p)) {
            if (countSums(n, ps) > m) {
                return n;
            }
        }

        ps.push(p);
    }
};

console.log(pb77());