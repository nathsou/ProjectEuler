import { digits, It, map, nth, skip } from "../Utils/iters";
import { sum } from "../Utils/math";

function* eFractions(): It<number> {
    yield* [2, 1, 2];
    let n = 4;

    while (true) {
        yield* [1, 1, n];
        n += 2;
    }
}

function* numerators(as: It<number>): It<bigint> {
    let [h0, h1] = [2n, 3n];
    yield* [h0, h1];

    for (const a of map(skip(as, 2), BigInt)) {
        [h0, h1] = [h1, a * h1 + h0];
        yield h1;
    }
}

const pb65 = (n = 100): number => {
    return sum(digits(nth(numerators(eFractions()), n)));
};

console.log(pb65());