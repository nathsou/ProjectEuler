import { allEq, digits, find, map, range } from "../Utils/iters";
import { nats } from "../Utils/math";

const pb53 = () => {
    return find(nats(),
        n => allEq(map(range(1, 6), k => digits(k * n).sort().join(',')))
    ).value;
};

console.log(pb53());