import { isPalindrome } from "../Utils/math";

function largestProductPalindrome(digits = 3): number {
    let max = 0;

    for (let i = 10 ** (digits - 1); i < 10 ** digits; i++) {
        for (let j = 10 ** (digits - 1); j < 10 ** digits; j++) {
            if (i * j > max && isPalindrome(i * j)) {
                max = i * j;
            }
        }
    }

    return max;
}

console.log(largestProductPalindrome(3));