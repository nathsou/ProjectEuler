
export const compose = <T, U, V>(
    f: (u: U) => T,
    g: (v: V) => U
): (v: V) => T => {
    return (v: V) => f(g(v));
};

export const odd = (n: number): boolean => n % 2 === 1;
export const even = (n: number): boolean => n % 2 === 0;
export const not = (q: boolean): boolean => !q;