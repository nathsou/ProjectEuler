import { all, combinations, filter, map, range } from "../Utils/iters";
import { fromDigits, sum } from "../Utils/math";
import { isPrimeMemoized as isPrime } from "../Utils/primes";

const isLeftTruncatablePrime = (digits: number[]): boolean => {
    const rtl = map(range(digits.length - 1), n => digits.slice(n));
    return all(map(rtl, fromDigits), isPrime);
};

const isRightTruncatablePrime = (digits: number[]): boolean => {
    const rev = [...digits].reverse();
    const ltr = map(
        range(digits.length - 1),
        n => rev.slice(digits.length - 1 - n).reverse()
    );
    return all(map(ltr, fromDigits), isPrime);
};

const truncatables = (
    prev = [[2], [3], [5], [7]],
    acc: number[] = []
): number[] => {
    if (prev.length === 0) return acc;

    const ps = [...map(filter(
        combinations(prev, [1, 3, 5, 7, 9]),
        ([digits, n]) => isRightTruncatablePrime([...digits, n])
    ), ([digits, n]) => [...digits, n])];

    acc.push(...ps.filter(isLeftTruncatablePrime).map(fromDigits));
    return truncatables(ps, acc);
};

const pb37 = () => sum(truncatables());

console.log(pb37());
