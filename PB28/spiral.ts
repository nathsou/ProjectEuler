import { range } from "../Utils/iters";

export enum Dir {
    Right = 0,
    Down,
    Left,
    Up
}

export const getDirIncrements = (dir: Dir): [number, number] => {
    return ([
        [1, 0],
        [0, 1],
        [-1, 0],
        [0, -1]
    ] as [number, number][])[dir];
};

export const gen2dArray = <T>(w: number, h: number, fillValue: T = null): T[][] => {
    const res = [];
    for (let i of range(0, w - 1)) {
        res.push([]);
        for (let j of range(0, h - 1)) {
            res[i][j] = fillValue;
        }
    }

    return res;
};

export const genSpiral = (n: number, dirIncrements = getDirIncrements): number[][] => {
    const spiral = gen2dArray(n, n, 0);
    let dir = Dir.Right;
    let steps = 1;
    let turnCount = 0;
    let [x, y] = [Math.floor(n / 2), Math.floor(n / 2)];

    for (let i = 0; i < n * n; i++) {
        if (steps === 0) {
            dir = (dir + 1) % 4;
            turnCount++;
            steps = Math.floor(turnCount / 2) + 1;
        }

        spiral[y][x] = i + 1;

        const [dirX, dirY] = dirIncrements(dir);
        x += dirX;
        y += dirY;
        steps--;
    }

    return spiral;
};