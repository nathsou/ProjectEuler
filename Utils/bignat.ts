import { zeros } from "./iters";

export const add = (as: number[], bs: number[]): number[] => {
    for (let i = Math.max(as.length, bs.length) - 1; i >= 0; i--) {
        const ab = (as[i] ?? 0) + (bs[i] ?? 0);

        as[i] = ab > 9 ? ab - 10 : ab;
        if (ab > 9 && i > 0) {
            as[i - 1]++;
        }
    }

    return as;
};

export const padLeft = <T>(elems: T[], len: number, padWith: T): T[] => {
    if (elems.length >= len) return elems;

    const padding = [];

    for (let i = 0; i < len - elems.length; i++) {
        padding.push(padWith);
    }

    return [...padding, ...elems];
};

export const truncAdd = (len: number, ...numsToAdd: number[][]) => {
    let digits = zeros(len);

    for (const n of numsToAdd) {
        add(digits, padLeft(n, len, 0));
    }

    return digits;
};