import { history, len, range, map } from "../Utils/iters";
import { primeFactorsWithExponents } from "../Utils/prime_factors";
import { intersection } from "../Utils/sets";

const factors = (n: number) => primeFactorsWithExponents(n).map(([p, e]) => `${p}^${e}`);

const pb47 = (m = 4) => {
    for (const ns of history(map(range(2, Infinity), n => [n, factors(n)]), m)) {
        const fs = ns.map(([_, f]) => f) as string[][];
        if (fs.every(f => f.length >= m) && len(intersection(fs)) === 0) {
            return ns[0][0];
        }
    }
};

console.log(pb47());