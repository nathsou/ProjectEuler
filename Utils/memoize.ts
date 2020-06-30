
export function memoize<T, K = number>(f: (n: K) => T): (n: K) => T {
    const memo = new Map<K, T>();

    return n => {
        if (memo.has(n)) return memo.get(n);
        const res = f(n);
        memo.set(n, res);
        return res;
    };
}