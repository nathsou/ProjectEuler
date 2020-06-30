
export function memoize<T>(f: (n: number) => T): (n: number) => T {
    const memo = new Map<number, T>();

    return n => {
        if (memo.has(n)) return memo.get(n);
        const res = f(n);
        memo.set(n, res);
        return res;
    };
}