import { foldLeft, scanLeft, history, II, It, Num, range, map, allEq, join, iter } from './iters';
import { memoize } from './memoize';
import { primeFactorsWithExponents } from './prime_factors';
import { isPalindrome as isStringPalindrome } from './arrays';
import { Frac, simplifyFrac } from './fractions';

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

export const fact = memoize((n: number) => n === 0 ? 1 : n * fact(n - 1));

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

export const isInt = (x: number): boolean => {
	return x - Math.floor(x) < Number.EPSILON;
};

// t(n) = (n (n + 1)) / 2 = (n^2 + n) / 2
export const isTriangular = (n: number): boolean => {
	return isInt((-(1 / 2) + Math.sqrt(1 / 4 + 2 * n)));
};

export const isSquare = (n: number): boolean => {
	return isInt(Math.sqrt(n));
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

export function* continuedFractions([a, b]: Frac): It<number> {
	const integral = Math.floor(a / b);

	if (b === 1) {
		yield a;
		return;
	}

	const [a_, b_] = simplifyFrac([a - integral * b, b]);

	yield integral;

	yield* continuedFractions([b_, a_]);
}

// suppose we want to find the continued fractions of N = (a + sqrt(b)) / c
// represented by the tuple (a, b, c)
// then we want to find the value of (a', b', c') such that 
// (a' + sqrt(b')) / c' = (1 / N) - floor(1 / N)

// 1 / N = c / (a + sqrt(b)) = (c * (a - sqrt(b))) / ((a + sqrt(b)) * (a - sqrt(b)))
// 1 / N = (c * a - c * sqrt(b)) / (a^2 - b) 
// 1 / N = (c * a - sign(c) * sqrt(b * c^2)) / (a^2 - b) 
// therefore
// 1 / N - floor(1 / N) = (((c * a - floor(1 / N) * (a^2 - b)) - sign(c) * sqrt(b * c^2)) / (a^2 - b))
// and (a', b', c') = (a*c-floor(1/N)*(a^2-b), -sign(c)*b*c^2, a^2-b)
function* squareRootContinuedFractionsAux(
	a: number, b: number, c: number,
	firstKey: string
): It<number> {
	const N = (a + Math.sqrt(b)) / c;
	const floorInv = Math.floor(1 / N);

	yield floorInv;

	let [a_, b_, c_] = [
		a * c - floorInv * (a * a - b),
		-b * c * c,
		a * a - b
	];

	if (b_ < 0) {
		a_ *= -1;
		b_ *= -1;
		c_ *= -1;
	}

	// simplify the terms
	const g = Math.abs(gcd([a_ * a_, b_, c_ * c_]) / gcd([a_, b_, c_]));

	a_ /= g;
	b_ /= g * g;
	c_ /= g;

	const key = `${a_},${b_},${c_}`;

	// stop if the sequence repeats
	if (key === firstKey) return;

	yield* squareRootContinuedFractionsAux(a_, b_, c_, firstKey);
}

export const squareRootContinuedFractions = (
	n: number
): It<number> => {
	const a0 = Math.floor(Math.sqrt(n));

	if (a0 * a0 === n) return iter([a0]);

	return join([
		[a0],
		squareRootContinuedFractionsAux(-a0, n, 1, `${-a0},${n},1`)
	]);
};