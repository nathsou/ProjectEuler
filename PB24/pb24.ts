import { nthPermutation } from "../Utils/permutations";
import { range } from "../Utils/iters";

const pb24 = (): number => {
    return parseInt(nthPermutation(10 ** 6, [...range(0, 9)]).join(''));
};

console.log(pb24());