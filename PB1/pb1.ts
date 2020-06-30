import { range, sum } from '../Utils/math';

const res = sum(range(1, 999).filter(n => n % 3 === 0 || n % 5 === 0));

console.log(res);