
export function isPythagoreanTriplet(a: number, b: number, c: number): boolean {
    return a ** 2 + b ** 2 === c ** 2;
}

export function* generateSums(sum: number): IterableIterator<{
    a: number,
    b: number,
    c: number
}> {

    for (let a = 0; a < sum; a++) {
        const complement = sum - a;
        for (let b = 0; b < complement; b++) {
            const c = complement - b;
            yield { a, b, c };
        }
    }

    return null;
}

export const triplet = ((sum: number) => {
    for (const { a, b, c } of generateSums(sum)) {
        if (b > a && c > b && isPythagoreanTriplet(a, b, c)) return { a, b, c };
    }

    return null;
})(1000);

console.log(triplet.a * triplet.b * triplet.c);