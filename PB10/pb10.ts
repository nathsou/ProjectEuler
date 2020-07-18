import { takeWhile } from '../Utils/iters';
import { primes } from '../Utils/primes';
import { sum } from '../Utils/math';

console.log(sum(takeWhile(primes(), n => n < 2 * 10 ** 6)));