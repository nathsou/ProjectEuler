import { digitsB } from "../Utils/iters";
import { sum } from "../Utils/math";

const pb16 = () => sum(digitsB(2n ** 1000n));

console.log(pb16());
