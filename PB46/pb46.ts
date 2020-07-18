import { odd } from "../Utils/functions";
import { filter, history, range, skip } from "../Utils/iters";
import { memoize } from "../Utils/memoize";
import { primes } from "../Utils/primes";

const isSquare = memoize(n => Math.sqrt(n) % 1 === 0);

const checkGoldbach = (n: number, smallerPrimes: number[]): boolean => {
    for (const p of smallerPrimes) {
        if (isSquare((n - p) / 2)) return true;
    }

    return false;
};

const pb46 = () => {
    const ps = [];

    for (const [prev, p] of history(skip(primes(), 2))) {
        const oddComposites = filter(range(prev + 1, p - 1), odd);

        for (const c of oddComposites) {
            if (!checkGoldbach(c, ps)) {
                return c;
            }
        }

        ps.push(p);
    }
};

console.log(pb46());