import { history, len, range } from "../Utils/iters";
import { memoize } from "../Utils/memoize";
import { primeFactorsWithExponents } from "../Utils/prime_factors";
import { intersection } from "../Utils/sets";

const factors = memoize(n => primeFactorsWithExponents(n).map(([p, e]) => `${p}^${e}`));

const pb47 = (n = 4) => {
    for (const ns of history(range(2, Infinity), n)) {
        const fs = ns.map(nb => factors(nb));
        if (fs.every(f => f.length >= n) && len(intersection(fs)) === 0) {
            return ns[0];
        }
    }
};

console.log(pb47());