import { swap } from "./permutations";


export type Num = number | bigint;
export type It<T> = IterableIterator<T>;

export function* indexed<T>(iter: It<T>): IterableIterator<[T, number]> {
    let i = 0;
    for (const elem of iter) {
        yield [elem, i++];
    }
}

export function* iter<T>(array: T[]): It<T> {
    for (const elem of array) {
        yield elem;
    }
}

export function* map<U, V>(
    iter: IterableIterator<U>,
    fn: (val: U) => V
): IterableIterator<V> {
    for (const val of iter) {
        yield fn(val);
    }
}

export function* take<T>(iter: It<T>, n: number): It<T> {
    for (let i = 0; i < n; i++) {
        const { value, done } = iter.next();
        yield value;
        if (done) break;
    }
}

export function nth<T>(iter: It<T>, n: number): T | null {
    let current = null;

    for (let i = 0; i < n; i++) {
        const { value, done } = iter.next();
        if (done) break;
        current = value;
    }

    return current;
}

export function* skip<T>(
    iterator: It<T> | T[],
    skipCount: number
): It<T> {
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
        swap(elems, start++, end--);
    }
};

export const max = <T>(
    iter: It<T>,
    gtr = (a: T, b: T) => a > b
): [T, number] => {
    let max: T = iter.next().value;
    let maxIdx = 0;

    for (const [val, i] of indexed(iter)) {
        if (gtr(val, max)) {
            max = val;
            maxIdx = i + 1;
        }
    }

    return [max, maxIdx];
};


export function* range<T extends Num>(
    from: T,
    to: T,
    step = 1
): It<T extends number ? number : bigint> {
    const step_ = (typeof from === 'number' ? step : BigInt(step)) as T;

    ///@ts-ignore
    for (let i = from; i <= to; i = i + step_) {
        yield i as any;
    }
}

export function* zip<A, B>(as: It<A>, bs: It<B>): It<[A, B]> {
    while (true) {
        const a = as.next();
        const b = bs.next();

        if (a.done || b.done) break;

        yield [a.value, b.value];
    }
}

// export function* zip<T>(...iters: It<T>[]): It<T> {
//     for (const iter of iters) {
//         const zipped: T[] = [];
//     }
// }