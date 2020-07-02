import { readFileSync } from 'fs';
import { maxPathSum } from '../PB18/maxPathSum';

const tri = readFileSync('triangle.txt').toString();

const triangle = tri.trimEnd().split(/[\r\n]/gm)
    .map(row => row.split(' ')
        .map(n => parseInt(n)));

console.log(maxPathSum(triangle));