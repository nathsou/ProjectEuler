import { pentagons } from "../Utils/math";

// p(n) = (3n^2 - n) / 2
const isPentagonal = (n: number) => {
    return ((1 / 2 + Math.sqrt((24 * n + 1) / 4)) / 3) % 1 === 0;
};

const pb44 = () => {
    const pents = new Set<number>();

    for (const p of pentagons()) {
        for (const q of pents) {
            if (pents.has(p - q) && isPentagonal(p + q)) {
                return p - q;
            }
        }

        pents.add(p);
    }
};

console.log(pb44());