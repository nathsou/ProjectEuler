import { Num, skip, It, iter, join, nth, II, cycle, take } from "./iters";
import { gcd } from "./math";

export type Frac<T extends Num = number> = [T, T];

export const numerator = <T extends Num>([a, _]: Frac<T>) => a;
export const denominator = <T extends Num>([_, b]: Frac<T>) => b;

export const simplifyFrac = <T extends Num>([a, b]: Frac<T>): Frac<T> => {
    const d = gcd([a, b]);
    return [a / d as T, b / d as T];
};

export const fracsEq = <T extends Num>(frac1: Frac<T>, frac2: Frac<T>): boolean => {
    if (frac1[0] === frac2[0] && frac1[1] === frac2[1]) return true;
    const [a, b] = simplifyFrac(frac1);
    const [c, d] = simplifyFrac(frac2);

    return a === c && b === d;
};

export const fracProd = <T extends Num>(...fracs: Frac<T>[]): Frac<T> => {
    let [a, b] = fracs[0];

    for (const [c, d] of skip(fracs, 1)) {
        a = a * c as T;
        b = b * d as T;
    }

    return [a, b];
};

export const fracSum = <T extends Num>(...fracs: Frac<T>[]): Frac<T> => {
    let [a, b] = fracs[0];

    for (const [c, d] of skip(fracs, 1)) {
        a = (a * d) + (c * b) as T;
        b = b * d as T;
    }

    return [a, b];
};

export const fractionDigits = (
    a: bigint,
    b: bigint,
    index = 0,
    acc: number[] = [],
    memo: Map<string, number> = new Map()
): {
    digits: number[],
    recurring: boolean,
    cycleStartIndex?: number
} => {
    const key = `${a}:${b}`;
    if (memo.has(key)) {
        return {
            digits: acc,
            recurring: true,
            cycleStartIndex: memo.get(key)
        };
    }

    if (a === 0n) return { digits: acc, recurring: false };

    memo.set(key, index);
    const digit = (a * 10n) / b;
    acc.push(Number(digit));

    return fractionDigits(
        (a * 10n) - digit * b,
        b,
        index + 1,
        acc,
        memo
    );
};

export function* continuedFractions([a, b]: Frac): It<number> {
    const integral = Math.floor(a / b);

    if (b === 1) {
        yield a;
        return;
    }

    const [a_, b_] = simplifyFrac([a - integral * b, b]);

    yield integral;

    yield* continuedFractions([b_, a_]);
}

// suppose we want to find the continued fractions of N = (a + sqrt(b)) / c
// represented by the tuple (a, b, c)
// then we want to find the value of (a', b', c') such that 
// (a' + sqrt(b')) / c' = (1 / N) - floor(1 / N)

// 1 / N = c / (a + sqrt(b)) = (c * (a - sqrt(b))) / ((a + sqrt(b)) * (a - sqrt(b)))
// 1 / N = (c * a - c * sqrt(b)) / (a^2 - b) 
// 1 / N = (c * a - sign(c) * sqrt(b * c^2)) / (a^2 - b) 
// therefore
// 1 / N - floor(1 / N) = (((c * a - floor(1 / N) * (a^2 - b)) - sign(c) * sqrt(b * c^2)) / (a^2 - b))
// and (a', b', c') = (a*c-floor(1/N)*(a^2-b), -sign(c)*b*c^2, a^2-b)
function* squareRootContinuedFractionsAux(
    a: number, b: number, c: number,
    firstKey: string
): It<number> {
    const N = (a + Math.sqrt(b)) / c;
    const floorInv = Math.floor(1 / N);

    yield floorInv;

    let [a_, b_, c_] = [
        a * c - floorInv * (a * a - b),
        -b * c * c,
        a * a - b
    ];

    if (b_ < 0) {
        a_ *= -1;
        b_ *= -1;
        c_ *= -1;
    }

    // simplify the terms
    const g = Math.abs(gcd([a_ * a_, b_, c_ * c_]) / gcd([a_, b_, c_]));

    a_ /= g;
    b_ /= g * g;
    c_ /= g;

    const key = `${a_},${b_},${c_}`;

    // stop if the sequence repeats
    if (key === firstKey) return;

    yield* squareRootContinuedFractionsAux(a_, b_, c_, firstKey);
}

export const squareRootContinuedFractions = (
    n: number
): It<number> => {
    const a0 = Math.floor(Math.sqrt(n));

    if (a0 * a0 === n) return iter([a0]);

    return join([
        [a0],
        squareRootContinuedFractionsAux(-a0, n, 1, `${-a0},${n},1`)
    ]);
};

export function* convergents(continuedSeq: It<number>): It<Frac> {
    const it = iter(continuedSeq);
    const [a0, a1] = [...take(it, 2)];

    let [h0, k0]: Frac = [a0, 1];
    let [h1, k1]: Frac = [a1 * a0 + 1, a1];

    yield [h0, k0];
    yield [h1, k1];

    for (const an of it) {
        const tmp = [h1, k1];
        [h1, k1] = simplifyFrac([an * h1 + h0, an * k1 + k0]);
        [h0, k0] = tmp;
        yield [h1, k1];
    }
}

export function* iterContinuedFractions(it_: II<number>): It<number> {
    const it = iter(it_);
    const a0 = nth(it, 1);

    yield a0;

    yield* cycle(it);
}