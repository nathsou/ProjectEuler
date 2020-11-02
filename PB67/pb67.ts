import { readFileSync } from 'fs';
import { maxPathSum } from '../PB18/maxPathSum';

const triangle = readFileSync('triangle.txt').toString()
    .trimEnd().split(/[\r\n]/gm)
    .map(row => row.split(' ')
        .map(n => parseInt(n)));


console.log(maxPathSum(triangle));