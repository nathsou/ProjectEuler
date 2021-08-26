import { digits } from "../Utils/iters";
import { sum } from "../Utils/math";

const pb16 = () => sum(digits(2n ** 1000n));

console.log(pb16());
