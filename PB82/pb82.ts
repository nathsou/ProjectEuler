import { bigMatrix } from "../PB81/matrices";
import { dijkstra, Graph } from "../Utils/graphs";
import { fill, foldLeft2, map, min, range, zip } from "../Utils/iters";

const { matrix, rows, cols } = bigMatrix;

const labelOf = (i: number, j: number) => `${i}:${j}`;

const toGraph = (costs: number[], rows: number, cols: number): Graph => {
  const g = new Graph();

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const v = labelOf(i, j);
      g.insertVertex(v);

      if (j > 0) {
        g.insertDirectedEdge(v, labelOf(i, j - 1), costs[(j - 1) * cols + i]);
      }

      if (j + 1 < rows) {
        g.insertDirectedEdge(v, labelOf(i, j + 1), costs[(j + 1) * cols + i]);
      }

      if (i + 1 < cols) {
        g.insertDirectedEdge(v, labelOf(i + 1, j), costs[j * cols + i + 1]);
      }
    }
  }

  return g;
};

const getColumn = (distances: Map<string, number>, col: number, rows: number): number[] => {
  const column: number[] = [];

  for (const j of range(0, rows - 1)) {
    column.push(distances.get(labelOf(col, j)));
  }

  return column;
};

const hadamardMin = (a: number[], b: number[]): number[] => {
  return [...map(zip(a, b), ([m, n]) => Math.min(m, n))];
}

const pb81 = () => {
  const g = toGraph(matrix, rows, cols);
  for (let j = 0; j < rows; j++) {
    const v = labelOf(-1, j);
    g.insertVertex(v);
    g.insertDirectedEdge(v, labelOf(0, j), matrix[j * cols]);
  }

  return min(foldLeft2(range(0, rows - 1), (mins, j) =>
    hadamardMin(mins, getColumn(dijkstra(g, labelOf(-1, j)), cols - 1, rows)),
    fill(Infinity, cols)
  )).value;
};

console.log(pb81());
