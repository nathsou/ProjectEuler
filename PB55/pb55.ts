import { isPalindrome } from "../Utils/arrays";
import { add } from "../Utils/bignat";
import { count, digits, none, range, scanLeft2, skip } from "../Utils/iters";

const isLychrel = (n: number, maxIters = 50): boolean => {
    return none(skip(scanLeft2(range(1, maxIters), 
        ds => add(ds, [...ds].reverse()), digits(n)
    ), 1), isPalindrome);
};

const pb55 = () => {
    return count(range(1, 9999), isLychrel);
};

console.log(pb55());