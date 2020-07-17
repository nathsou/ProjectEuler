import { find, join, map, range } from "../Utils/iters";
import { fromDigits } from "../Utils/math";
import { reversePandigitals } from "../Utils/pandigital";
import { isPrime } from "../Utils/prime";

const pb41 = () => {
    return find(map(join(map(range(9, 1), reversePandigitals)), fromDigits), isPrime).value;
};

console.log(pb41());