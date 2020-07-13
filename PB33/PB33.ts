import { Frac, fracProd, fracsEq, simplifyFrac } from "../Utils/fractions";
import { combinations, range, remove } from "../Utils/iters";
import { fromDigits } from "../Utils/math";

const isFalselyCancelling = (digitsA: number[], digitsB: number[], n: number): boolean => {
    const da = fromDigits(remove(digitsA, n, 1));
    const db = fromDigits(remove(digitsB, n, 1));

    return fracsEq([da, db], [fromDigits(digitsA), fromDigits(digitsB)]);
};

const pb33 = () => {
    const fracs: Frac[] = [];

    for (const [a, b] of combinations(range(1, 9), range(1, 9))) {
        for (const c of range(1, 9)) {
            if (!fracsEq([a, b], [b, c]) && isFalselyCancelling([a, b], [b, c], b)) {
                fracs.push([fromDigits([a, b]), fromDigits([b, c])]);
            }
        }
    }

    return simplifyFrac(fracProd(...fracs))[1];
};

console.log(pb33());