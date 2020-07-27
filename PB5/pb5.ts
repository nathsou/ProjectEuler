import { factorize } from '../Utils/primeFactors';

function smallestMultiple(m: number): number {
    let n = 1;

    for (let i = 2; i <= m; i++) {
        if (n % i !== 0) n *= factorize(i)[0];
    }

    return n;
}

console.log(smallestMultiple(20));