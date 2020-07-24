import { digitsCount, filter, len, pairs, range } from "../Utils/iters";

// if n > 9, then #digits(n^p) > p since #digits(10^p) = p + 1

// up to which p should we check the property?
// #digits(9^p) < p 
// log10(9^p) + 1 < p
// log10(9^p) < p - 1
// 9^p < 10^(p - 1)
// 9 < 10^((p - 1) / p)
// 10^((p - 1) / p) > 9
// p < 22

const pb63 = () => {
    return len(filter(pairs(range(1, 9), range(1, 21)), ([n, p]) => digitsCount(n ** p) === p));
};

console.log(pb63());