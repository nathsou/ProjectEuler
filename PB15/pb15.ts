const latticePathCounts = (() => {
    const memo = new Map<string, number>();

    const counts = (w: number, h: number): number => {
        if (w === 0 || h === 0) return 1;
        if (w === 1) return h + 1;
        if (h === 1) return w + 1;

        const key = `${w}:${h}`;
        if (memo.has(key)) {
            return memo.get(key);
        }

        const res = counts(w - 1, h) + counts(w, h - 1);
        memo.set(key, res);

        return res;
    };

    return counts;
})();

console.log(latticePathCounts(20, 20));