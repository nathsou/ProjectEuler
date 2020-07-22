import { readFileSync } from "fs";
import { cycle, find, map, range, triplets, zip } from "../Utils/iters";
import { sum } from "../Utils/math";
import { ascii } from "../Utils/strings";

const decipher = (msg: number[], key: number[]) => {
    return String.fromCharCode(...map(zip(msg, cycle(key)), ([a, b]) => a ^ b));
};

const pb59 = () => {
    const msg = readFileSync('cipher.txt', 'utf-8')
        .toString()
        .split(',')
        .map(n => parseInt(n));

    // from 'a' to 'z'
    const az = [...range(97, 122)];

    const deciphered = find(
            map(triplets(az, az, az),
            key => decipher(msg, key)),
            deciphered => /\sthe\s/.test(deciphered)
        ).value;

    return sum(ascii(deciphered));
};

console.log(pb59());