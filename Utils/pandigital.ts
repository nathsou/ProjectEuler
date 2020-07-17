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

export const pandigitals = (len = 9): It<number[]> => {
    if (len > 9 || len < 1) return;
    return lexicographicPermutations([...range(len, 1)]);
};

export const reversePandigitals = (len = 9): It<number[]> => {
    if (len > 9 || len < 1) return;
    return reverseLexicographicPermutations([...range(len, 1)]);
};