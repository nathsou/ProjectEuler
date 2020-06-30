import { range, sum } from "../Utils/math";

const digits = [
    'zero',
    'one', 'two', 'three',
    'four', 'five', 'six',
    'seven', 'eight', 'nine'
];

const tens = [
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen'
];

const dozens = [
    'zero',
    'ten',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety'
];

const hundred = 'hundred';
const thousand = 'thousand';

const spell = (n: number): string => {
    if (n < 10) return digits[n];
    if (n < 20) return tens[n - 10];
    if (n < 100) {
        if (n % 10 === 0) {
            return dozens[n / 10];
        } else {
            return `${dozens[Math.floor(n / 10)]}-${spell(n % 10)}`;
        }
    }

    if (n < 1000) {
        if (n % 100 === 0) {
            return `${spell(n / 100)} ${hundred}`;
        } else {
            return `${spell(Math.floor(n / 100))} ${hundred} and ${spell(n % 100)}`;
        }
    }

    if (n < 10000) {
        if (n % 1000 === 0) {
            return `${spell(n / 1000)} ${thousand}`;
        } else {
            return `${spell(Math.floor(n / 1000))} ${thousand} and ${spell(n % 1000)}`;
        }
    }
};

console.log(sum(range(1, 1000).map(n => spell(n).replace(/[\s\-]/g, '').length)));

// console.log(spell(342).replace(/[\s\-]/g, '').length);