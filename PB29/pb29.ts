import { pairs, range } from "../Utils/iters";

type Range = [bigint, bigint];

const distinctPowers = ([aStart, aEnd]: Range, [bStart, bEnd]: Range): bigint[] => {
    const powers = new Set<bigint>();
    for (const [a, b] of pairs(range(aStart, aEnd), range(bStart, bEnd))) {
        powers.add(a ** b);
    }

    return [...powers];
};

const pb29 = (as: Range = [2n, 100n], bs: Range = [2n, 100n]): number => {
    return distinctPowers(as, bs).length;
};

console.log(pb29());