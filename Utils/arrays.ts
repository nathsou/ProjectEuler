import { It, II } from "./iters";

export const last = <T>(vals: T[]): T | undefined => {
    return vals[vals.length - 1];
};

export const isPalindrome = <T>(vals: T[] | string): boolean => {
    let left = 0;
    let right = vals.length - 1;

    while (left < right) {
        if (vals[left++] !== vals[right--]) return false;
    }

    return true;
};

export type Indexed<T> = {
    [n: number]: T;
    length: number;
    [Symbol.iterator]: () => It<T>;
};

export const rev = <T>(vals: T[]): Indexed<T> => {
    return new Proxy({
        length: vals.length,
        [Symbol.iterator]: function* () {
            for (let i = vals.length - 1; i >= 0; i--) {
                yield vals[i];
            }
        }
    }, {
        get: (target, prop) => {
            if (prop === 'length' || prop === Symbol.iterator) {
                return target[prop];
            }

            return vals[vals.length - 1 - Number(prop)];
        }
    });
};

export const uniq = <T>(vals: II<T>, hasher: (val: T) => string = val => `${val}`): T[] => {
    const keys = new Set<string>();
    const uniqueVals: T[] = [];

    for (const val of vals) {
        const key = hasher(val);
        if (!keys.has(key)) {
            keys.add(key);
            uniqueVals.push(val);
        }
    }

    return uniqueVals;
};

export const swapRemove = <T>(vals: T[], index: number): void => {
    [vals[index], vals[vals.length - 1]] = [vals[vals.length - 1], vals[index]];
    vals.pop();
};