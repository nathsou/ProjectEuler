import { find } from '../Utils/iters';
import { divisorsCount, triangles } from '../Utils/math';

const pb12 = (count: number): number => {
    return find(triangles(), n => divisorsCount(n) > count).value;
};

console.log(pb12(500));