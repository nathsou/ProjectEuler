import { modPow } from "../modulo";

const m = 10 ** 10;

const pb97 = () => (28433 * modPow(2, 7830457, m) + 1) % m;

console.log(pb97());