import { Heap } from "./heaps";

export class Graph<Labels = string> {
  private adjacencyLists: Map<Labels, Set<Labels>>;
  private costs: Map<string, number>;

  constructor() {
    this.adjacencyLists = new Map();
    this.costs = new Map();
  }

  public insertVertex(label: Labels): void {
    if (!this.adjacencyLists.has(label)) {
      this.adjacencyLists.set(label, new Set());
    }
  }

  public getVertices(): Labels[] {
    return [...this.adjacencyLists.keys()];
  }

  public insertDirectedEdge(a: Labels, b: Labels, cost = 0): void {
    this.adjacencyLists.get(a)?.add(b);
    this.costs.set(`${a} -> ${b}`, cost);
  }

  public insertUndirectedEdge(a: Labels, b: Labels, cost = 0): void {
    this.insertDirectedEdge(a, b, cost);
    this.insertDirectedEdge(b, a, cost);
  }

  public isAdjacent(a: Labels, b: Labels): boolean {
    return this.adjacencyLists.get(a)?.has(b);
  }

  public adjacentVertices(a: Labels): Readonly<Set<Labels>> {
    return this.adjacencyLists.get(a);
  }

  public getCost(a: Labels, b: Labels): number {
    return this.costs.get(`${a} -> ${b}`);
  }
}

export const dijkstra = <Labels = string>(g: Graph<Labels>, source: Labels) => {
  const unvisited = new Heap<Labels, number>(g.getVertices().map(v => [v, Infinity]), (a, b) => a < b);
  const visited = new Set<Labels>();
  const distances = new Map<Labels, number>(unvisited.getData());

  distances.set(source, 0);
  unvisited.updatePriority(source, 0);

  while (!unvisited.empty()) {
    const [u, d] = unvisited.removeHighestPriority();
    if (d === Infinity) break;

    for (const v of g.adjacentVertices(u)) {
      if (!visited.has(v)) {
        const newDist = d + g.getCost(u, v);
        if (newDist < distances.get(v)) {
          distances.set(v, newDist);
          unvisited.updatePriority(v, newDist);
        }
      }
    }

    visited.add(u);
  }

  return distances;
};