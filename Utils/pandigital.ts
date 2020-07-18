import { It, range } from "./iters";
import { reverseLexicographicPermutations, lexicographicPermutations } from "./permutations";

export const isPandigital = (digits: number[]) => {
    if (digits.length !== 9) return false;
    
    const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (const digit of digits) {
        if (++counts[digit - 1] > 1) return false;
    }

    return counts.every(c => c === 1);
};

export const pandigitals = (from: number, to: number): It<number[]> => {
    if (to > 9 || from < 0 || from > to) return;
    return lexicographicPermutations([...range(from, to)]);
};

export const reversePandigitals = (from: number, to: number): It<number[]> => {
    if (to > 9 || from < 0 || from > to) return;
    return reverseLexicographicPermutations([...range(to, from)]);
};