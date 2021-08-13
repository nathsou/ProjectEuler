import { II, indexed, iter } from "./iters";

export const compose = <T, U, V>(
    f: (u: U) => T,
    g: (v: V) => U
): (v: V) => T => {
    return (v: V) => f(g(v));
};

export const id = <T>(x: T): T => x;
export const odd = (n: number): boolean => (n & 1) === 1;
export const even = (n: number): boolean => (n & 1) === 0;
export const eq = <T>(a: T) => (b: T) => a === b;
export const neq = <T>(a: T) => (b: T) => a !== b;
export const not = (q: boolean): boolean => !q;
export const fst = <A, B>([a, _b]: [A, B]): A => a;
export const snd = <A, B>([_a, b]: [A, B]): B => b;
export const empty = <T>(it: II<T>): boolean => iter(it).next().done;
export const lss = (a: number) => (b: number) => b < a;
export const leq = (a: number) => (b: number) => b <= a;
export const gtr = (a: number) => (b: number) => b > a;
export const geq = (a: number) => (b: number) => b >= a;

export const occurences = <T>(vals: II<T>): Map<T, number[]> => {
    const occs = new Map<T, number[]>();

    for (const [val, index] of indexed(vals)) {
        if (!occs.has(val)) {
            occs.set(val, []);
        }

        occs.get(val).push(index);
    }

    return occs;
};