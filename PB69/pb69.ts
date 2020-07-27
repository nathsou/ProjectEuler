import { snd } from "../Utils/functions";
import { map, max, range } from "../Utils/iters";
import { totient } from "../Utils/primeFactors";

const pb69 = (m = 10 ** 6) => {
    return snd(max(
        map(range(2, m), n => [n / totient(n), n]),
        ([r1, n1], [r2, n2]) => r1 > r2
    ).value as [number, number]);
};

console.log(pb69());