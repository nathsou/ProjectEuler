import { count, fill, filter, indexed, join, map, range, takeWhile } from "../Utils/iters";
import { heptagons, hexagons, octagons, pentagons, squares, sum, triangles } from "../Utils/math";

const [sq, tr, pent, hex, hept, oct] = [...map([
    octagons(), heptagons(), hexagons(), pentagons(), triangles(), squares()
], polygon => new Set([...map(
    filter(takeWhile(polygon, n => n < 10000), n => n > 1000),
    n => `${n}`)
]))];

const polys = new Set([...join([sq, tr, pent, hex, hept, oct])]);

const differentPolys = (ps: string[]): boolean => {
    const types = fill(false, 6);

    for (const p of ps) {
        for (const [set, i] of indexed([tr, sq, pent, hex, hept, oct])) {
            if (set.has(p)) types[i] = true;
        }
    }

    return count(types, t => t) === Math.min(ps.length, 6);
};

const search = (depth: number, ps: string[] = []): string[] => {
    if (ps.length === 0) {
        for (const p of polys) {
            const res = search(depth - 1, [p]);
            if (res) return res;
        }

        return null;
    }

    const prev = `${ps[ps.length - 1]}`.substr(2, 2);

    if (depth === 0) {
        if (prev === ps[0].substr(0, 2)) {
            return differentPolys(ps) ? ps : null;
        } else {
            return null;
        }
    } 

    for (const n of range(10, 99)) {
        const p = `${prev}${n}`;

        if (polys.has(p)) {
            const res = search(depth - 1, [...ps, p]);
            if (res) return res;
        }
    }

    return null;
};

const pb61 = (m = 6) => {
    return sum(search(m).map(n => parseInt(n)));
};

console.log(pb61());