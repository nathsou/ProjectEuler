
export const compose = <T, U, V>(
    f: (u: U) => T,
    g: (v: V) => U
): (v: V) => T => {
    return (v: V) => f(g(v));
};