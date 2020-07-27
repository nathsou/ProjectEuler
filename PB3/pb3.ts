import { factorize } from '../Utils/primeFactors';

console.log(Math.max(...factorize(600851475143)));

const m = new Map<string, number>();
const s = new Set<string>();