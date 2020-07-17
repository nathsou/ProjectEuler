import { find, range } from "../Utils/iters";
import { isPandigital } from "..//Utils/pandigital";

const concatMultiples = (n: number, maxLen = 9): string => {
    let concat = `${n}`;
    let m = n;

    while (concat.length < maxLen) {
        m += n
        concat += `${m}`;
    }

    return concat;
};

const isConcatMultiplesPandigital = (n: number): boolean => {
    return isPandigital(concatMultiples(n).split('').map(n => parseInt(n)));
};

const pb38 = (): number => {
    const n = find(range(9999, 9), isConcatMultiplesPandigital).value;
    return parseInt(concatMultiples(n, 9));
};

console.log(pb38());