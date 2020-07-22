import { all, skip, take } from "../Utils/iters";
import { genSieveLessThan, isPrime } from "../Utils/primes";

const check = (p: number, ps: number[]) => {
    return all(ps, n => isPrime(Number(`${p}${n}`)) && isPrime(Number(`${n}${p}`)));
};

const pb60 = (m = 5, primesLessThan = 10000) => {
    let min = Infinity;
    const primes = genSieveLessThan(primesLessThan);

    const search = (level: number, ps: number[] = [], sum = 0): any[] => {
        if (level === 0) return ps;

        const primes_ = level === m ? take(skip(primes, 1), 10) : skip(primes, 1);

        for (const p of primes_) {
            if ((ps.length === 0 || p > ps[ps.length - 1]) && check(p, ps)) {
                if (sum + p < min) {
                    const res = search(level - 1, [...ps, p], sum + p);
                    if (res.length > 0) {
                        min = sum + p;
                    }
                }
            }
        }

        return [];
    };

    search(m);

    return min;
};

console.log(pb60(5));