import { digits, map, pairs, range, max } from "../Utils/iters";
import { sum } from "../Utils/math";

const pb56 = () => {
    return max(map(pairs(range(1n, 99n), range(1n, 99n)),
        ([a, b]) => sum(digits(a ** b))
    )).value;
};

console.log(pb56());