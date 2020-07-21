import { genSpiral } from "./spiral";

const diagonalsSum = (grid: number[][], n: number): number => {
    let sum = 0;

    for (let i = 0; i < n; i++) {
        sum += grid[i][i];
        sum += grid[n - i - 1][i];
    }

    return sum - grid[Math.floor(n / 2)][Math.floor(n / 2)];
};

const pb28 = (n = 1001) => {
    const spiral = genSpiral(n);
    return diagonalsSum(spiral, n);
};

console.log(pb28());