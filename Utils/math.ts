import { primeFactorsWithExponents } from './prime_factors';
import { Num, II } from './iters';
import { memoize } from './memoize';

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

export function range(from: number, to: number, step = 1): number[] {
	const vals = [];
	for (let i = from; i <= to; i += step) {
		vals.push(i);
	}

	return vals;
}

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

export const gcd = <T extends Num>(a: T, b: T): T => {
	if (eq(b, 0)) return a;
	return gcd(b, (a % b) as T);
};

export const fact = memoize((n: number) => prod(range(1, n)));