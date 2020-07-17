import { It } from "./iters";

export type AsyncIt<T> = AsyncIterableIterator<T>;
export type AII<T> = AsyncIt<T> | It<Promise<T>> | Array<Promise<T>> | Set<Promise<T>>;

export const asynchronize = <T>(vals: T[]): Array<Promise<T>> =>
    vals.map(val => Promise.resolve(val));

export async function* map<U, V>(
    it: AII<U>,
    fn: (val: U) => V
): AsyncIt<V> {
    for await (const val of it) {
        yield fn(val);
    }
}