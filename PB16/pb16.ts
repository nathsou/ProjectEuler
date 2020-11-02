import { sum, modPow } from "../Utils/math";

const res = sum(`${2n ** 1000n}`.split('').map(n => parseInt(n)));

console.log(modPow(2, 1000, 10));

// console.log(res);