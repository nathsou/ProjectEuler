import { filter, map, max, range } from "../Utils/iters";
import { numerator, Frac } from "../Utils/fractions";

// let the solution be a / b,
// then a / b ≈ 3 / 7 and a / b < 3 / 7
// so we know that a ≈ 3 * b / 7
// therefore we can check fractions of the
// shape: floor(3 / 7 * b) / b
const pb71 = (m = 10 ** 6) => {
    return numerator(max(
        filter(
            map(range(m / 10, m), b => [Math.floor(b * 3 / 7), b]),
            ([a, b]) => 7 * (a / b) < 3
        ),
        ([a, b], [c, d]) => a / b > c / d
    ).value as Frac);
};

console.log(pb71());