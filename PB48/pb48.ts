import { truncAdd } from "../Utils/bignat";
import { map, range } from "../Utils/iters";

const pb48 = () => {
    const ns = [...map(
        range(1n, 1000n),
        n => `${n ** n}`.substr(-10).split('').map(d => parseInt(d))
    )];

    return parseInt(truncAdd(10, ...ns).join(''));
};

console.log(pb48());