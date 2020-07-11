import { combinations, range } from "../Utils/iters";

type Range = [bigint, bigint];

const distinctPowers = ([aStart, aEnd]: Range, [bStart, bEnd]: Range): bigint[] => {
    const powers = new Set<bigint>();
    for (const [a, b] of combinations(range(aStart, aEnd), range(bStart, bEnd))) {
        powers.add(a ** b);
    }

    return [...powers];
};

const pb29 = (as: Range, bs: Range): number => {
    return distinctPowers(as, bs).length;
};

console.log(pb29([2n, 100n], [2n, 100n]));