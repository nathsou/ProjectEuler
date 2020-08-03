import { range } from "../Utils/iters";
import { countSums } from "../PB31/countSums";

const pb76 = (m = 100): number => {
    const vals = [...range(1, m - 1)];
    return countSums(m, vals);
};

console.log(pb76());