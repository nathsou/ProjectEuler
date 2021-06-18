import { bigMatrix } from "../PB81/matrices";
import { dijkstra, Graph } from "../Utils/graphs";

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

      if (i > 0) {
        g.insertDirectedEdge(v, labelOf(i - 1, j), costs[j * cols + i - 1]);
      }

      if (i + 1 < cols) {
        g.insertDirectedEdge(v, labelOf(i + 1, j), costs[j * cols + i + 1]);
      }
    }
  }

  return g;
};

const pb81 = () => {
  const g = toGraph(matrix, rows, cols);
  const start = labelOf(-1, 0);
  g.insertVertex(start);
  g.insertDirectedEdge(start, labelOf(0, 0), matrix[0]);

  const dists = dijkstra(g, start);
  return dists.get(labelOf(rows - 1, cols - 1));
};

console.log(pb81());
