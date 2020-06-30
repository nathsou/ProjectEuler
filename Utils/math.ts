import { primeFactorsWithExponents } from './prime_factors';

export const sum = (vals: number[]): number => vals.reduce((p, c) => p + c);

export const prod = (vals: number[]): number => vals.reduce((p, c) => p * c, 1);

export function range(from: number, to: number, step = 1): number[] {
	const vals = [];
	for (let i = from; i <= to; i += step) {
		vals.push(i);
	}

	return vals;
}

export const divisors = (n: number): number[] => {
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
