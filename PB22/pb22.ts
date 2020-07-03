import { readFileSync } from 'fs';
import { sum } from '../Utils/math';

const names = readFileSync('names.txt')
    .toString()
    .split(',')
    .map(name => name.substr(1, name.length - 2))
    .sort();

const stringScore = (str: string): number => {
    let score = 0;
    for (const char of str) {
        score += char.charCodeAt(0) - 64;
    }

    return score;
};

const scores = names.map((name, pos) => stringScore(name) * (pos + 1));

console.log(sum(scores));

