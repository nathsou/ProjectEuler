import { bigMatrix } from "../PB81/matrices";
import { dijkstra, Graph } from "../Utils/graphs";
import { Heap } from "../Utils/heaps";
import { foldLeft2, map, range } from "../Utils/iters";

const { matrix, rows, cols } = bigMatrix;

const labelOf = (i: number, j: number) => `${i}:${j}`;

const asGraph = (costs: number[], rows: number, cols: number): Graph => {
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

const pb82 = () => {
  const g = asGraph(matrix, rows, cols);
  for (let j = 0; j < rows; j++) {
    const v = labelOf(-1, j);
    g.insertVertex(v);
    g.insertDirectedEdge(v, labelOf(0, j), matrix[j * cols]);
  }

  return foldLeft2(range(0, rows - 1), (min, j) =>
    Math.min(min, ...getColumn(dijkstra(g, labelOf(-1, j)), cols - 1, rows)),
    Infinity
  );
};

console.log(pb82());