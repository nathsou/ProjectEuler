import { pentagons, isPentagonal } from "../Utils/math";

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