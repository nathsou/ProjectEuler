import { filter, nth } from "../Utils/iters";
import { hexagons, isPentagonal, isTriangular } from "../Utils/math";

const pb45 = () => {
    return nth(filter(hexagons(), n => isPentagonal(n) && isTriangular(n)), 3);
};

console.log(pb45());