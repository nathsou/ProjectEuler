import { filter, map, range } from "../Utils/iters";
import { fromDigits, isArithmeticSequence } from "../Utils/math";
import { combinations, permutations } from "../Utils/permutations";
import { isPrime } from "../Utils/primes";

const pb49 = () => {
    for (const a of range(1, 9)) {
        for (const b of range(a, 9)) {
            for (const c of range(b, 9)) {
                for (const d of range(c, 9)) {
                    const primePerms = [...filter(map(permutations([a, b, c, d]), fromDigits), isPrime)];
                    if (primePerms.length >= 3) {
                        for (const seq of filter(combinations(primePerms, 3), isArithmeticSequence)) {
                            const res = [...seq].sort().join('');
                            if (res !== '148748178147') {
                                return parseInt(res);
                            }
                        }
                    } 
                }
            }
        }
    }
};

console.log(pb49());