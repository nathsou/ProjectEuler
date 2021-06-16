
export class Graph<Labels = string> {
  private adjacencyLists: Map<Labels, Set<Labels>>;

  constructor() {
    this.adjacencyLists = new Map();
  }

  public insertVertex(label: Labels): void {
    if (!this.adjacencyLists.has(label)) {
      this.adjacencyLists.set(label, new Set());
    }
  }

  public insertDirectedEdge(a: Labels, b: Labels): void {
    this.adjacencyLists.get(a)?.add(b);
  }

  public insertUndirectedEdge(a: Labels, b: Labels): void {
    this.insertDirectedEdge(a, b);
    this.insertDirectedEdge(b, a);
  }

  public isAdjacent(a: Labels, b: Labels): boolean {
    return this.adjacencyLists.get(a)?.has(b);
  }

  public adjacentVertices(a: Labels): Readonly<Set<Labels>> {
    return this.adjacencyLists.get(a);
  }
}
