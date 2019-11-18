const { genSieveLessThan } = require('../Utils/prime.js');
const { sum } = require('../Utils/math.js');

console.log(sum(genSieveLessThan(2 * 10 ** 6)));