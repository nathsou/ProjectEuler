const { range, sum } = require('../Utils/math.js');

const res = sum(range(1, 999).filter(n => n % 3 === 0 || n % 5 === 0));

console.log(res);