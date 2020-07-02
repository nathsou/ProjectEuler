import { sum } from "../Utils/math";

const fact = (n: number): bigint => {
    let prod = 1n;
    const nBigInt = BigInt(n);

    for (let i = 2n; i < nBigInt; i += 1n) {
        prod *= i;
    }

    return prod;
};

const pb20 = () => {
    return sum(`${fact(100)}`.split('').map(n => parseInt(n)));
};

console.log(pb20());