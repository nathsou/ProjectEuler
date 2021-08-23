import { consume, lines } from "../Utils/streams";

// a1 ** b1 > a2 ** b2 if log(a1 ** b1) > log(a2 ** b2)
// => b1 * log(a1) > b2 * log(a2)
const powerGreater = ([a1, b1]: [number, number], [a2, b2]: [number, number]): boolean => {
  return b1 * Math.log(a1) > b2 * Math.log(a2);
};

const pb99 = async () => {
  const numbers = (await consume(lines('p099_base_exp.txt'))).map(line => line.split(',').map(n => parseInt(n)));

  let largestPower: [number, number] = [1, 1];
  let largestLine = 0;

  numbers.forEach(([a, b], index) => {
    if (powerGreater([a, b], largestPower)) {
      largestPower = [a, b];
      largestLine = index + 1;
    }
  });

  return largestLine;
};

(async () => {
  console.log(await pb99());
})();