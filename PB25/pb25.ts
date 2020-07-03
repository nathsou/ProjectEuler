import { indexed } from "../Utils/arrays";
import { fibs } from "../Utils/fibs";

const pb25 = (digits: number) => {
    for (const [n, i] of indexed(fibs())) {
        if (n.toString().length >= digits) {
            return i + 1;
        }
    }
};

console.log(pb25(1000));