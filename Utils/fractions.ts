import { Num, skip, range } from "./iters";
import { gcd } from "./math";

export type Frac<T extends Num = number> = [T, T];

export const simplifyFrac = <T extends Num>([a, b]: Frac<T>): Frac<T> => {
    const d = gcd(a, b);
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