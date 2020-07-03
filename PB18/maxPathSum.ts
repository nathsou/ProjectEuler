const propagateUp = (triangle: number[][], row: number) => {
    for (let col = 0; col < triangle[row - 1].length; col++) {
        const totalLeft = triangle[row][col];
        const totalRight = triangle[row][col + 1];
        triangle[row - 1][col] += Math.max(totalLeft, totalRight);
    }
};

export const maxPathSum = (triangle: number[][]) => {
    for (let row = triangle.length - 1; row >= 1; row--) {
        propagateUp(triangle, row);
    }

    return triangle[0][0];
};