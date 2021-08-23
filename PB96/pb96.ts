import { chunks, filter, first, map, range } from "../Utils/iters";
import { sum } from "../Utils/math";
import { consume, lines } from "../Utils/streams";

const setFromCell = (digit: number): Set<number> => {
  if (digit !== 0) return new Set([digit]);
  return new Set(range(1, 9));
};

const sets = (grid: number[][]) => {
  return grid.map(row => row.map(d => setFromCell(d)));
};

type Grid = Set<number>[][];

const removeDigit = (
  grid: Grid,
  i: number,
  j: number,
  digit: number,
  solvedCells: Array<[number, number]>
): void => {
  const cell = grid[j][i];

  if (cell.has(digit)) {
    cell.delete(digit);

    if (cell.size === 1) {
      solvedCells.push([i, j]);
    }
  }
};

const markCell = (grid: Grid, i: number, j: number, digit: number): Array<[number, number]> => {
  const solvedCells: Array<[number, number]> = [];

  for (let n = 0; n < 9; n++) {
    removeDigit(grid, n, j, digit, solvedCells); // row
    removeDigit(grid, i, n, digit, solvedCells); // col
  }

  // 3 x 3 sub grid
  const [subGridX, subGridY] = [Math.floor(i / 3) * 3, Math.floor(j / 3) * 3];
  for (let x = subGridX; x < subGridX + 3; x++) {
    for (let y = subGridY; y < subGridY + 3; y++) {
      removeDigit(grid, x, y, digit, solvedCells);
    }
  }

  grid[j][i] = new Set([digit]);

  return solvedCells;
};

const getAlmostSolvedCell = (grid: Grid): [number, number] => {
  let minSize = 9;
  let bestCell: [number, number] = [0, 0];

  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      const size = grid[y][x].size;
      if (size > 1 && size < minSize) {
        minSize = size;
        bestCell = [x, y];
      }
    }
  }

  return bestCell;
};

const makeGuess = (grid: Grid): number[][] | null => {
  const [i, j] = getAlmostSolvedCell(grid);

  for (const digit of grid[j][i]) {
    const clone = cloneGrid(grid);
    const solution = solve(clone, markCell(clone, i, j, digit));

    if (solution !== null) {
      return solution;
    }
  }

  return null;
};

const isGridSolved = (grid: Grid): boolean => {
  return grid.every(row => row.every(set => set.size === 1));
};

const isGridUnsolvable = (grid: Grid): boolean => {
  return grid.some(row => row.some(set => set.size === 0));
};

const solvedCells = (grid: Grid): Array<[number, number]> => {
  const stack: Array<[number, number]> = [];

  // fill the stack with the initial known cells
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[j][i].size === 1) {
        stack.push([i, j]);
      }
    }
  }

  return stack;
};

const deduce = (grid: Grid, initialSolvedCells: Array<[number, number]>): void => {
  const stack = initialSolvedCells;

  while (stack.length > 0) {
    const [x, y] = stack.pop();
    if (grid[y][x].size !== 0) {
      const digit = first(grid[y][x]);
      const newlyDeducedCells = markCell(grid, x, y, digit);
      stack.push(...newlyDeducedCells);
    }
  }
};

const solve = (grid: Grid, initialSolvedCells = solvedCells(grid)): number[][] | null => {
  deduce(grid, initialSolvedCells);

  if (isGridUnsolvable(grid)) {
    return null;
  }

  if (!isGridSolved(grid)) {
    return makeGuess(grid);
  }

  return grid.map(row => row.map(first));
};

const cloneGrid = (grid: Grid): Grid => {
  return grid.map(row => row.map(set => new Set(set)));
};

const pb96 = async () => {
  const grids = [...chunks(map(filter(
    await consume(lines('p096_sudoku.txt')),
    line => !line.startsWith('Grid')
  ), line => line.split('').map(Number)),
    9
  )];

  const solutions = grids.map(grid => solve(sets(grid)));

  return sum(map(solutions, ([[a, b, c]]) => a * 100 + b * 10 + c));
};

(async () => {
  console.log(await pb96());
})();