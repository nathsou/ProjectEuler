import { find, join, map, range } from "../Utils/iters";
import { fromDigits } from "../Utils/math";
import { reversePandigitals } from "../Utils/pandigital";
import { isPrime } from "../Utils/primes";

const pb41 = () => {
    return find(map(join(map(range(9, 1), n => reversePandigitals(1, n))), fromDigits), isPrime).value;
};

console.log(pb41());