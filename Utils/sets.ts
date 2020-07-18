import { II, It, iter, map, skip } from "./iters";

export function* intersection<T>(iters_: II<II<T>>): It<T> {
    const iters = [...iters_];
    const first = iters[0];
    const sets = [...map(skip(iters, 1), it => new Set([...iter(it)]))];

    for (const val of first) {
        if (sets.some(set => set.has(val))) {
            yield val;
        }
    }
}