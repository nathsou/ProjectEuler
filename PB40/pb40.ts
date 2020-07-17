import { It, range, digits, takeAt } from "../Utils/iters";
import { prod } from "../Utils/math";

function* naturalNumbersDigits(): It<number> {
    for (const n of range(Infinity)) {
        yield* digits(n);
    }
}

const pb40 = () => {
 return prod(takeAt(naturalNumbersDigits(), [1, 10, 100, 1000, 10000, 100000, 1000000]));
};

console.log(pb40());