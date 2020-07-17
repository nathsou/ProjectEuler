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

export function* takeWhile<T>(iterable: II<T>, pred: (a: T) => boolean): It<T> {
    const it = iter(iterable);
    for (;;) {
        const { value, done } = it.next();
        if (!pred(value)) break;
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

export function* repeat<T>(it: II<T>, n: number): It<T> {
    const vals = [...it];
    for (let i = 0; i < n; i++) {
        yield* vals;
    }
}

export function* cycle<T>(it: II<T>): It<T> {
    const vals = [...it];
    while (true) {
        yield* vals;
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

    yield* it;
}

export const len = <T>(it: It<T>): number => {
    let count = 0;
    for (const _ of it) count++;
    return count;
};

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

    if (to > from) {
        ///@ts-ignore
        for (let i = from; i <= to; i = i + step_) {
            yield i as any;
        } 
    } else {
        ///@ts-ignore
        for (let i = from; i >= to; i = i - step_) {
            yield i as any;
        }
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

export function digits(n: number): number[] {
    return `${n}`.split('').map(n => parseInt(n));
}

export function* digitsReversed(n: number): It<number> {
    while (n !== 0) {
        yield n % 10;
        n = Math.floor(n / 10);
    }
}

export function* join<T>(...iters: II<T>[]): It<T> {
    for (const iter of iters) {
        yield* iter;
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

export function count<T>(
    as: II<T>,
    pred: (a: T) => boolean
): number {
    let count = 0;
    for (const a of as) {
        if (pred(a)) {
            count++;
        }
    }

    return count;
}

export function all<T>(
    as: II<T>,
    pred: (a: T) => boolean
): boolean {
    for (const a of as) {
        if (!pred(a)) {
            return false;
        }
    }

    return true;
}

export function any<T>(
    as: II<T>,
    pred: (a: T) => boolean
): boolean {
    for (const a of as) {
        if (pred(a)) {
            return true;
        }
    }

    return false;
}

export const rotate = <T>(elems: T[], dir: 'left' | 'right' = 'right'): T[] => {
    if (dir === 'right') {
        return elems.map((_, i) => elems[(i + 1) % elems.length]);
    }

    return elems.map((_, i) => elems[i === 0 ? elems.length - 1 : (i - 1)]);
};

export function* selfCompose<T>(f: (arg: T) => T, arg: T): It<T> {
    let r = arg;
    yield arg;

    do {
        r = f(r);
        yield r;
    } while (true);
}

export function* slices<T>(elems: II<T>): It<T[]> {
    const els: T[] = [];

    for (const elem of elems) {
        yield [...els, elem];
        els.push(elem);
    }
}

export function* chunks<T>(it: II<T>, len: number): It<T[]> {
    if (len <= 0) return;

    let chunk: T[] = [];

    for (const val of it) {
        chunk.push(val);
        if (chunk.length % len === 0) {
            yield chunk;
            chunk = [];
        }
    }

    if (chunk.length > 0) {
        yield chunk;
    }
}

export const foldLeft = <T>(it: II<T>, fn: (prev: T, current: T) => T, base?: T): T => {

    let acc = base !== undefined ? base : nth(it, 0);

    for (const val of it) {
        acc = fn(acc, val);
    }

    return acc;
};

export const has = <T>(it: II<T>, ...elems: T[]): boolean => {
    const elemsSet = new Set(elems);

    for (const elem of it) {
        elemsSet.delete(elem);
    }

    return elemsSet.size === 0;
};