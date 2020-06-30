import { sum } from "../Utils/math";

const res = sum(`${2n ** 1000n}`.split('').map(n => parseInt(n)));

console.log(res);