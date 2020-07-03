import { swap } from "./permutations";

export function* indexed<T>(iter: IterableIterator<T>): IterableIterator<[T, number]> {
    let i = 0;
    for (const elem of iter) {
        yield [elem, i++];
    }
}

export function* iter<T>(array: T[]): IterableIterator<T> {
    for (const elem of array) {
        yield elem;
    }
}

export function* take<T>(iter: IterableIterator<T>, n: number): IterableIterator<T> {
    for (let i = 0; i < n; i++) {
        const { value, done } = iter.next();
        yield value;
        if (done) break;
    }
}

export function nth<T>(iter: IterableIterator<T>, n: number): T | null {
    let current = null;

    for (let i = 0; i < n; i++) {
        const { value, done } = iter.next();
        if (done) break;
        current = value;
    }

    return current;
}

export function* skip<T>(
    iterator: IterableIterator<T> | T[],
    skipCount: number
): IterableIterator<T> {
    const it = Array.isArray(iterator) ? iter(iterator) : iterator;

    for (let i = 0; i < skipCount; i++) {
        it.next();
    }

    for (const val of it) {
        yield val;
    }
}

export const findIndexRight = <T>(
    elems: T[],
    pred: (val: T, index: number) => boolean
) => {
    for (let i = elems.length - 1; i >= 0; i--) {
        if (pred(elems[i], i)) return i;
    }

    return -1;
};

export const reverseRange = <T>(elems: T[], start: number, end: number): void => {
    while (start < end) {
        swap(elems, start, end);
        start++;
        end--;
    }
};
