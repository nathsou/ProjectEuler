import { sum } from "../Utils/math";
import { consume, lines } from "../Utils/streams";

// order matters
const romanDecimal = [
  ['IV', 4],
  ['IX', 9],
  ['XL', 40],
  ['XC', 90],
  ['CD', 400],
  ['CM', 900],
  ['I', 1],
  ['V', 5],
  ['X', 10],
  ['L', 50],
  ['C', 100],
  ['D', 500],
  ['M', 1000],
] as const;

// order matters
const decimalRoman = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
] as const;

const romanToDecimal = (roman: string): number => {
  if (roman.length === 0) return 0;
  const [rom, dec] = romanDecimal.find(([rom]) => roman.startsWith(rom));
  return dec + romanToDecimal(roman.slice(rom.length));
};

const decimalToRoman = (
  n: number,
  used = { D: false, L: false, V: false }
): string => {
  if (n === 0) return '';
  const [dec, rom] = decimalRoman.find(([dec, rom]) => dec <= n && !used[rom]);

  if (rom in used) {
    used[rom] = true;
  }

  return `${rom}${decimalToRoman(n - dec, used)}`;
};

const pb89 = async () => {
  const romans = await consume(lines('pb089_roman.txt'));
  return sum(romans.map(r => r.length - decimalToRoman(romanToDecimal(r)).length));
};

pb89().then(res => {
  console.log(res);
});