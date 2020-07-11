
export function memoize<T, K = number>(f: (n: K) => T): (n: K) => T {
    const memo = new Map<K, T>();

    return n => {
        if (memo.has(n)) return memo.get(n);
        const res = f(n);
        memo.set(n, res);
        return res;
    };
}

export function memoize2<T>(
    f: (...args: any[]) => T,
    genKey: (...args: any[]) => string = (...args) => args.join(',')
): (...args: any[]) => T {
    const memo = new Map<string, T>();

    return (...args: any[]) => {
        const key = genKey(...args);
        if (memo.has(key)) return memo.get(key);
        const res = f(...args);
        memo.set(key, res);
        return res;
    };
}