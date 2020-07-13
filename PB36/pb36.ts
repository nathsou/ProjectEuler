import { isPalindrome } from "../Utils/strings";
import { filter, range } from "../Utils/iters";
import { sum } from "../Utils/math";

const isDoubleBasePalindrome = (
    n: number,
    base1: number,
    base2: number
): boolean => {
    return isPalindrome(n.toString(base1)) &&
        isPalindrome(n.toString(base2));
};

const pb36 = (max = 10 ** 6) => {
    return sum(filter(range(max), n => isDoubleBasePalindrome(n, 10, 2)));
};

console.log(pb36());