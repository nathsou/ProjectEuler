import { It, map } from "./iters";

export const isPalindrome = (str: string): boolean => {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        if (str[left++] !== str[right--]) return false;
    }

    return true;
};

export const alphabetIndices = (str: string): number[] => {
    return [...map(str, char => char.charCodeAt(0) - 64)];
};