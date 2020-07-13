import { swap } from "./permutations";

export type It<T> = IterableIterator<T>;
export type Num = number | bigint;

export function* indexed<T>(iter: Iterable<T>): It<[T, number]> {
    let i = 0;
    for (const elem of iter) {
        yield [elem, i++];
    }
}

export type II<T> = It<T> | T[] | Set<T>;

export const iter = <T>(it: II<T>): It<T> => {
    return it[Symbol.iterator]();
};

export function* map<U, V>(
    iter: Iterable<U>,
    fn: (val: U) => V
): It<V> {
    for (const val of iter) {
        yield fn(val);
    }
}

export function* take<T>(iterable: II<T>, n: number): It<T> {
    const it = iter(iterable);
    for (let i = 0; i < n; i++) {
        const { value, done } = it.next();
        yield value;
        if (done) break;
    }
}

export function nth<T>(iterable: II<T>, n: number): T | null {
    const it = iter(iterable);
    let current = null, i = 0;

    for (; i < n; i++) {
        const { value, done } = it.next();
        current = value;
        if (done) break;
    }

    return i === n ? current : null;
}

export function* repeat<T>(n: number, val: T): It<T> {
    for (let i = 0; i < n; i++) {
        yield val;
    }
}

export function* skip<T>(
    iterable: II<T>,
    skipCount: number
): It<T> {
    const it = iter(iterable);

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
    iterable: II<T>,
    gtr = (a: T, b: T) => a > b
): { value: T, index: number } => {
    const it = iter(iterable);
    let max: T = it.next().value;
    let maxIdx = 0;

    for (const [val, i] of indexed(it)) {
        if (gtr(val, max)) {
            max = val;
            maxIdx = i + 1;
        }
    }

    return { value: max, index: maxIdx };
};


export function* range<T extends Num>(
    from: T,
    to?: T,
    step = 1
): It<T extends number ? number : bigint> {
    const step_ = (typeof from === 'number' ? step : BigInt(step)) as T;

    if (to === undefined) {
        to = from;
        from = (typeof from === 'number' ? 0 : 0n) as T;
    }

    ///@ts-ignore
    for (let i = from; i <= to; i = i + step_) {
        yield i as any;
    }
}

export function* zip<A, B>(
    as: II<A>,
    bs: II<B>
): It<[A, B]> {
    const as_ = iter(as);
    const bs_ = iter(bs);
    while (true) {
        const a = as_.next();
        const b = bs_.next();

        if (a.done || b.done) break;

        yield [a.value, b.value];
    }
}

export function* combinations<U, V>(as: II<U>, bs: II<V>): It<[U, V]> {
    const bs_ = [...bs];
    for (const a of as) {
        for (const b of bs_) {
            yield [a, b];
        }
    }
}

export function* digits(n: number): It<number> {
    while (n !== 0) {
        yield n % 10;
        n = Math.floor(n / 10);
    }
}

export function* join<T>(...iters: II<T>[]): It<T> {
    for (const iter of iters) {
        for (const val of iter) {
            yield val;
        }
    }
}

export function* filter<T>(
    as: II<T>,
    pred: (a: T) => boolean
): It<T> {
    for (const a of as) {
        if (pred(a)) {
            yield a;
        }
    }
}

export function* remove<T>(
    vals: II<T>,
    valToRemove: T,
    removeCount = Infinity
): It<T> {
    let removed = 0;

    for (const val of vals) {
        if (removed < removeCount && val === valToRemove) {
            removed++;
        } else {
            yield val;
        }
    }
}

export function find<T>(
    as: II<T>,
    pred: (a: T) => boolean
): { value: T | null, index: number } {
    for (const [a, index] of indexed(as)) {
        if (pred(a)) {
            return { value: a, index };
        }
    }

    return { value: null, index: -1 };
}