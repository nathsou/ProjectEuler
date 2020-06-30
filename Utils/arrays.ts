
export function* indexed<T>(iter: IterableIterator<T>): IterableIterator<[T, number]> {
    let i = 0;
    for (const elem of iter) {
        yield [elem, i++];
    }
}

export function* iter<T>(array: T[]): IterableIterator<T> {
    for (const elem of array) {
        yield elem;
    }
}

export function* skip<T>(
    iterator: IterableIterator<T> | T[],
    skipCount: number
): IterableIterator<T> {
    const it = Array.isArray(iterator) ? iter(iterator) : iterator;

    for (let i = 0; i < skipCount; i++) {
        it.next();
    }

    for (const val of it) {
        yield val;
    }
}