import { odd } from "../Utils/functions";
import { count, len, map, range } from "../Utils/iters";
import { squareRootContinuedFractions } from "../Utils/fractions";

const pb64 = (m = 10 ** 4) => {
    return count(map(range(2, m), n => len(squareRootContinuedFractions(n)) - 1), odd);
};

console.log(pb64());