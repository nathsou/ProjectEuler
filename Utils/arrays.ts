import { It } from "./iters";

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