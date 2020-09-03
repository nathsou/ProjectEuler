import { max, fill } from "../Utils/iters";

const collatzLens = (count: number) => {
    const lens = fill(0, count);
    lens[1] = 1;

    const seqLen = (n: number, curr = n, steps = 1): void => {
        if (curr === 1) return;

        const next = curr % 2 === 0 ? curr / 2 : 3 * curr + 1;

        if (next < count && lens[next] !== 0) {
            lens[n] = lens[next] + steps;
        } else {
            seqLen(n, next, steps + 1);
        }
    };

    for (let i = 1; i <= count; i++) {
        seqLen(i);
    }

    return lens;
};

const pb14 = (m = 10 ** 6): number => {
    return max(collatzLens(m)).index;
};

console.log(pb14());
