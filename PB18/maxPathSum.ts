type TriNode = {
    value: number,
    maxPathTotal: number
};

const updateTotal = (topNode: TriNode, bottomNode: TriNode): void => {
    const total = topNode.maxPathTotal + bottomNode.value;
    if (total > bottomNode.maxPathTotal) {
        bottomNode.maxPathTotal = total;
    }
};

const propagateDown = (nodes: TriNode[][], level: number) => {
    const topRow = nodes[level];
    const bottomRow = nodes[level + 1];

    for (let i = 0; i < topRow.length; i++) {
        for (let j = 0; j < topRow.length; j++) {
            updateTotal(topRow[i], bottomRow[i]);
            updateTotal(topRow[i], bottomRow[i + 1]);
        }
    }
};

export const maxPathSum = (triangle: number[][]) => {
    const nodes: TriNode[][] = triangle.map(row =>
        row.map(value => ({ value, maxPathTotal: 0 }))
    );

    const root = nodes[0][0];
    root.maxPathTotal = root.value;

    for (let i = 0; i < triangle.length - 1; i++) {
        propagateDown(nodes, i);
    }

    const max = Math.max(
        ...nodes[nodes.length - 1].map(node => node.maxPathTotal)
    );

    return max;
};