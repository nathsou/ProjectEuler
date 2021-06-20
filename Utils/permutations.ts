import { findIndexRight, II, It, range, reverseRange } from "./iters";

export const swapMut = <T>(elems: T[], i: number, j: number): void => {
    [elems[i], elems[j]] = [elems[j], elems[i]];
};

// Heap algorithm
const generate = <T>(A: T[], perms: T[][], k = A.length) => {
    if (k === 1) {
        perms.push([...A]);
        return;
    }

    generate(A, perms, k - 1);

    for (let i = 0; i < k - 1; i++) {
        if (k % 2 === 0) {
            swapMut(A, i, k - 1);
        } else {
            swapMut(A, 0, k - 1);
        }

        generate(A, perms, k - 1);
    }

};

export const permutations = <T>(elems: T[]): T[][] => {
    const perms = [];
    generate(elems, perms);
    return perms;
};

// returns false if `elems` is already the last permutation in
// lexicographic order
export const nextPermutation = <T>(elems: T[]): boolean => {
    const i = findIndexRight(elems, (_, i) => elems[i] < elems[i + 1]);
    if (i === -1) return false;

    const elems_i = elems[i];

    const j = findIndexRight(elems, elems_j => elems_i < elems_j);

    swapMut(elems, i, j);
    reverseRange(elems, i + 1, elems.length - 1);

    return true;
};

export const prevPermutation = <T>(elems: T[]): boolean => {
    const i = findIndexRight(elems, (_, i) => elems[i - 1] > elems[i]);
    if (i === -1) return false;

    const j = findIndexRight(elems, (elems_j, j) => j >= i && elems_j < elems[i - 1]);

    swapMut(elems, i - 1, j);
    reverseRange(elems, i, elems.length - 1);

    return true;
};

export function* lexicographicPermutations<T>(elems: T[]): IterableIterator<T[]> {
    yield [...elems];

    while (nextPermutation(elems)) {
        yield [...elems];
    }
}

export function* reverseLexicographicPermutations<T>(elems: T[]): IterableIterator<T[]> {
    yield [...elems];

    while (prevPermutation(elems)) {
        yield [...elems];
    }
}

export const nthPermutation = <T>(n: number, elems: T[]): T[] => {
    const copy = [...elems];
    for (let i = 0; i < n - 1; i++) {
        nextPermutation(copy);
    }

    return copy;
};

// see https://projecteuler.net/overview=053
export const binomial = (n: number, k: number): number => {
    if (k > n - k) {
        k = n - k;
    }

    let res = 1;
    for (let i = 0; i <= k - 1; i++) {
        res = res * (n - i) / (i + 1);
    }

    return res;
};

const nextCombination = (indices: number[], n: number): boolean => {
    const k = indices.length;

    for (let i = k - 1; i >= 0; i--) {
        if (indices[i] < n - k + i + 1) {
            indices[i]++;
            for (let j = i + 1; j < k; j++) {
                indices[j] = indices[j - 1] + 1;
            }

            return true;
        }
    }

    return false;
};

export function* combinations<T>(elems: II<T>, k: number): It<T[]> {
    const comb = [...range(k - 1)];
    const items = [...elems];
    const n = items.length - 1;

    yield comb.map(i => items[i]);

    while (nextCombination(comb, n)) {
        yield comb.map(i => items[i]);
    }
};