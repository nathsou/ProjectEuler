import { all, filter, map, shifts, skip, zip } from "../Utils/iters";
import { fromDigits, sum } from "../Utils/math";
import { pandigitals } from "../Utils/pandigital";

const subStringsDivisible = (digits: number[]): boolean => {
    return all(zip(
        map(skip(shifts(digits, 3), 1), fromDigits),
        [2, 3, 5, 7, 11, 13, 17]
    ), ([n, p]) => n % p === 0)
};

const pb43 = () => {
    return sum(map(filter(pandigitals(0, 9), subStringsDivisible), fromDigits));
};

console.log(pb43());