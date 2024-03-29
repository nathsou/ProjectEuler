import { II, It } from "./iters";
import { swapMut } from "./permutations";
import { randomIntBetwen } from "./random";

export const last = <T>(vals: T[]): T | undefined => {
    return vals[vals.length - 1];
};

export const first = <T>(vals: T[]): T | undefined => {
    return vals[0];
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
    swapMut(vals, index, vals.length - 1);
    vals.pop();
};

export const shuffle = <T>(vals: II<T>, rand = Math.random): T[] => {
    const shuffled = [...vals];

    for (let i = shuffled.length - 1; i >= 1; i--) {
        const j = randomIntBetwen(0, i, rand);
        swapMut(shuffled, i, j);
    }

    return shuffled;
};

export const insertMapArray = <K, V>(map: Map<K, V[]>, key: K, value: V): void => {
    if (!map.has(key)) {
        map.set(key, [value]);
    } else {
        map.get(key)?.push(value);
    }
};

export const groupBy = <T, Group>(vals: T[], groupOf: (val: T) => Group): Map<Group, T[]> => {
    const groups = new Map<Group, T[]>();

    vals.forEach(val => {
        insertMapArray(groups, groupOf(val), val);
    });

    return groups;
};