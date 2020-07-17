import { sum } from '../Utils/math';
import { range, filter } from '../Utils/iters';

const pb1 = (): number => {
    return sum(filter(range(1, 999), n => n % 3 === 0 || n % 5 === 0));
};

console.log(pb1());