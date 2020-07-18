import { foldLeft, foldLeftIter, II, It, Num, range } from './iters';
import { memoize } from './memoize';
import { primeFactorsWithExponents } from './prime_factors';
import { isPalindrome as isStringPalindrome } from './strings';

export const sum = (vals: II<number>): number => {
	let s = 0;
	for (const val of vals) s += val;
	return s;
};

export const prod = (vals: II<number>): number => {
	let p = 1;
	for (const val of vals) p *= val;
	return p;
};

export const divisors = (n: number): number[] => {
	if (n === 0) return [];
	const divs = [1];

	// we only need to check up to sqrt(n) inclusive
	for (let i = 2; i * i <= n; i++) {
		if (n % i === 0) {
			divs.push(i);
		}
	}

	const len = divs.length;

	// the remaining divisors are mirrors of the smaller ones
	for (let i = len - 1; i >= 0; i--) {
		const k = divs[i];
		const divisor = n / k;

		// don't count sqrt(n) twice if it's a natural number
		if (divisor !== k) {
			divs.push(divisor);
		}
	}

	return divs;
};

export const divisorsCount = (n: number): number => {
	return primeFactorsWithExponents(n)
		.reduce((count, [_, power]) => (power + 1) * count, 1);
};

export const intLog = (n: number, base: number): number => {
	let i = 0;

	for (; n !== 0; i++) {
		n = Math.floor(n / base);
	}

	return i - 1;
};

export const eq = (a: Num, b: number): boolean => {
	return typeof a === 'number' ? a === b : a === BigInt(b);
};

const gcd_ = <T extends Num>(a: T, b: T): T => {
	if (eq(b, 0)) return a;
	return gcd_(b, (a % b) as T);
};

export const gcd = <T extends Num>(ns: II<T>): T => {
	return foldLeft(ns, (g, n) => gcd_(g, n));
};

export const fact = memoize((n: number) => prod(range(1, n)));

export const fromDigits = (digits: II<number>): number => {
	return parseInt([...digits].join(''));
};

export function isPalindrome(n: number): boolean {
	return isStringPalindrome(`${n}`);
}

export const solveQuadraticEq = (a: number, b: number, c: number): [number, number] | [number] | [] => {
	const delta = b ** 2 - 4 * a * c;
	
	if (delta < 0) return [];

	if (delta === 0) return [-b / (2 * a)];

	const s = Math.sqrt(delta);

	return [(-b - s) / (2 * a), (-b + s) / (2 * a)];
};

export const triangles = (): It<number> => {
	return foldLeftIter(range(2, Infinity), (tri, n) => tri + n, 1);
};

// p(n) = (3n^2 - n) / 2
/// p(n + 1) - p(n) = (3(n + 1)^2 - n - 1) / 2 - (3n^2 - n) / 2
// = (3n^2 + 5n + 2) / 2 - (3n^2 - n) / 2
// 2(p(n + 1) - p(n)) = 6n + 2
// p(n + 1) = p(n) + 3n + 1
export const pentagons = (): It<number> => {
    return foldLeftIter(range(1, Infinity), (pent, n) => pent + 3 * n + 1, 1);
};

// h(n) = 2n^2 - n
// h(n + 1) - h(n) = 2(n + 1)^2 - (n + 1) - (2n^2 - n)
// h(n + 1) - h(n) = 2n^2 + 4n + 2 - n - 1 - 2n^2 + n
// h(n + 1) - h(n) =  4n + 1
export const hexagons = (): It<number> => {
    return foldLeftIter(range(1, Infinity), (hex, n) => hex + 4 * n + 1, 1);
};

export const isPentagonal = (n: number): boolean => {
    return ((1 + Math.sqrt(24 * n + 1)) / 6) % 1 === 0;
};

// t(n) = (n (n + 1)) / 2 = (n^2 + n) / 2
export const isTriangular = (n: number): boolean => {
	return (-(1 / 2) + Math.sqrt(1 / 4 + 2 * n)) % 1 === 0;
};

// h(n) = 2n^2 - n
export const isHexagonal = (n: number): boolean => {
	return ((1 + Math.sqrt(1 + 8 * n)) / 4) % 1 === 0;
};