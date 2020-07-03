export function* fibs(): IterableIterator<bigint> {
    let a = 1n, b = 1n;
    yield 1n;
    yield 1n;

    while (true) {
        [a, b] = [a + b, a];
        yield a;
    }
};