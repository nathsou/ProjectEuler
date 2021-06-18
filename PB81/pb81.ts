import { bigMatrix } from "./matrices";

const { matrix, cols } = bigMatrix;

const at = (m: number[], i: number, j: number) => m[j * cols + i] ?? Infinity;
const set = (m: number[], i: number, j: number, val: number) => m[j * cols + i] = val;

const minPathSum = (i: number, j: number, sums: number[]) => {
  const stack = [[i, j]];
  const visited = new Set<string>();

  while (stack.length > 0) {
    const [i, j] = stack.pop();
    const key = `${i}:${j}`;

    if (!visited.has(key) && j * cols + i < matrix.length - 1) {
      const currentSum = sums[j * cols + i];

      set(sums, i + 1, j, Math.min(at(sums, i + 1, j), currentSum + at(matrix, i + 1, j)));
      set(sums, i, j + 1, Math.min(at(sums, i, j + 1), currentSum + at(matrix, i, j + 1)));

      stack.push([i + 1, j]);
      stack.push([i, j + 1]);

      visited.add(key);
    }
  }
};

const pb81 = () => {
  const sums = new Array(matrix.length).fill(Infinity);
  sums[0] = matrix[0];

  minPathSum(0, 0, sums);
  return sums[matrix.length - 1];
};

console.log(pb81());
