import { first, isPalindrome as isStringPalindrome, last, uniq } from './arrays';
import { allEq, cons, filter, flatMap, foldLeft, history, II, It, map, pairs, range, scanLeft, skip, takeWhile } from './iters';
import { memoize } from './memoize';
import { primeFactorsWithExponents } from './primeFactors';

export const sum = (vals: II<number>): number => {
	let s = 0;
	for (const val of vals) s += val;
	return s;
};

export const sumB = (vals: II<bigint>): bigint => {
	let s = 0n;
	for (const val of vals) s += val;
	return s;
};

export const prod = (vals: II<number>): number => {
	let p = 1;
	for (const val of vals) p *= val;
	return p;
};

// returns the divisors of n <= sqrt(n)
export const smallDivisors = (n: number): number[] => {
	if (n === 0) return [];
	const divs = [1];

	// we only need to check up to sqrt(n) inclusive
	for (let i = 2; i * i <= n; i++) {
		if (n % i === 0) {
			divs.push(i);
		}
	}

	return divs;
};

export const divisors = (n: number): number[] => {
	const divs = smallDivisors(n);

	// the remaining divisors are mirrors of the smaller ones
	for (let i = divs.length - 1; i >= 0; i--) {
		const k = divs[i];
		const divisor = n / k;

		// don't count sqrt(n) twice if it's a natural number
		if (divisor !== k) {
			divs.push(divisor);
		}
	}

	return divs;
};

export const properDivisorsSum = (n: number): number => {
	return sum(divisors(n)) - n;
};

export const divisorsCount = (n: number): number => {
	return primeFactorsWithExponents(n)
		.reduce((count, [_, power]) => (power + 1) * count, 1);
};

// decompose(2) -> [[2]]
// decompose(3) -> [[3]]
// decompose(4) -> [[4], [2, 2]]
// decompose(5) -> [[5]]
// decompose(6) -> [[6], [2, 3]]
// decompose(8) -> [[8], [2, 4], [2, 2, 2]]
export const decompose = memoize((n: number): number[][] =>
	uniq(cons([n], flatMap(skip(smallDivisors(n), 1), a =>
		map(filter(pairs(decompose(a), decompose(n / a)),
			([p, q]) => last(p) <= first(q)),
			([p, q]) => [...p, ...q]
		)))
	));

export const intLog = (n: number, base: number): number => {
	let i = 0;

	for (; n !== 0; i++) {
		n = Math.floor(n / base);
	}

	return i - 1;
};

const gcd_ = (a: number, b: number): number => {
	if (b === 0) return a;
	return gcd_(b, a % b);
};

const gcdB_ = (a: bigint, b: bigint): bigint => {
	if (b === 0n) return a;
	return gcdB_(b, a % b);
};

export const gcd = (ns: II<number>): number => {
	return foldLeft(ns, (g, n) => gcd_(g, n));
};

export const gcdB = (ns: II<bigint>): bigint => {
	return foldLeft(ns, (g, n) => gcdB_(g, n), 0n);
};

export const fact = memoize((n: number) => n === 0 ? 1 : n * fact(n - 1));
export const factB = memoize((n: bigint) => n === 0n ? 1n : n * factB(n - 1n));

export const fromDigits = (digits: II<number>): number => {
	return parseInt([...digits].join(''));
};

export function isPalindrome(n: number): boolean {
	return isStringPalindrome(`${n}`);
}

export const solveQuadraticEq = (a: number, b: number, c: number): [number, number] | [number] | [] => {
	const delta = b ** 2 - 4 * a * c;

	if (delta < 0) return [];

	if (delta === 0) return [-b / (2 * a)];

	const s = Math.sqrt(delta);

	return [(-b - s) / (2 * a), (-b + s) / (2 * a)];
};

export const squares = (): It<number> => {
	return scanLeft(range(2, Infinity), (sq, n) => sq + 2 * n - 1, 1);
};

export const triangles = (): It<number> => {
	return scanLeft(range(2, Infinity), (tri, n) => tri + n, 1);
};

// p(n) = (3n^2 - n) / 2
/// p(n + 1) - p(n) = (3(n + 1)^2 - n - 1) / 2 - (3n^2 - n) / 2
// = (3n^2 + 5n + 2) / 2 - (3n^2 - n) / 2
// 2(p(n + 1) - p(n)) = 6n + 2
// p(n + 1) = p(n) + 3n + 1
export const pentagons = (): It<number> => {
	return scanLeft(range(1, Infinity), (pent, n) => pent + 3 * n + 1, 1);
};

export const hexagons = (): It<number> => {
	return scanLeft(range(1, Infinity), (hex, n) => hex + 4 * n + 1, 1);
};

export const heptagons = (): It<number> => {
	return scanLeft(range(1, Infinity), (hex, n) => hex + 5 * n + 1, 1);
};

export const octagons = (): It<number> => {
	return scanLeft(range(1, Infinity), (hex, n) => hex + 6 * n + 1, 1);
};

export const cubes = (): It<number> => {
	return scanLeft(range(1, Infinity), (c, n) => c + 3 * n * (n + 1) + 1, 1);
};

export const isInt = (x: number, eps = Number.EPSILON): boolean => {
	return Math.abs(x - Math.floor(x)) < eps;
};

// t(n) = (n (n + 1)) / 2 = (n^2 + n) / 2
export const isTriangular = (n: number): boolean => {
	return isInt((-(1 / 2) + Math.sqrt(1 / 4 + 2 * n)));
};

export const createSquareChecker = (max: bigint) => {
	const squares = new Set(takeWhile(map(range(1n, max), n => n * n), n => n < max));
	return (n: bigint) => squares.has(n);
};

export const isSquare = (n: number): boolean => {
	return isInt(n) && isInt(Math.sqrt(n));
};

export const isPentagonal = (n: number): boolean => {
	return isInt((1 + Math.sqrt(24 * n + 1)) / 6);
};

// h(n) = 2n^2 - n
export const isHexagonal = (n: number): boolean => {
	return isInt((1 + Math.sqrt(1 + 8 * n)) / 4);
};

export const isHeptagonal = (n: number): boolean => {
	return isInt((3 / 2 + Math.sqrt(9 / 4 + 10 * n)) / 5);
};

export const isOctagonal = (n: number): boolean => {
	return isInt((2 + Math.sqrt(4 + 12 * n)) / 6);
};

export const isArithmeticSequence = (seq: number[]): boolean => {
	return !allEq(seq) && allEq(map(history([...seq].sort(), 2), ([p, c]) => c - p));
};

export const nats = (includeZero = false) => range(includeZero ? 0 : 1, Infinity);

export const dichotomy = (
	lower: number,
	upper: number,
	f: (x: number) => number,
	itersLeft = 1000,
	computeMiddle: (lower: number, upper: number) => number = (a, b) => (a + b) / 2
): number => {
	const mid = computeMiddle(lower, upper);

	if (itersLeft === 0 || mid === lower || mid === upper) {
		return mid;
	}

	const x = f(mid);

	if (x === 0) return mid;

	const [newLower, newUpper] = x < 0 ? [mid, upper] : [lower, mid];

	return dichotomy(newLower, newUpper, f, itersLeft - 1, computeMiddle);
};

// https://github.com/Aisse-258/bigint-isqrt/blob/master/main.js
export const sqrtB = (n: bigint): bigint => {
	if (n < 2n) return n;

	if (n < 16n) {
		return BigInt(Math.floor(Math.sqrt(Number(n))));
	}

	let x1: bigint;

	if (n < (1n << 52n)) {
		x1 = BigInt(Math.floor(Math.sqrt(Number(n)))) - 3n;
	} else {
		x1 = (1n << 52n) - 2n;
	}

	let x0 = -1n;
	while ((x0 !== x1 && x0 !== (x1 - 1n))) {
		x0 = x1;
		x1 = ((n / x0) + x0) >> 1n;
	}

	return x0;
};

export const isSquareB = (n: bigint): boolean => {
	const s = sqrtB(n);
	return s * s === n;
};