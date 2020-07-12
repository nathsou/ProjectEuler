import { memoize } from "../Utils/memoize";

const coins = [1, 2, 5, 10, 20, 50, 100, 200];

const generateCombinations = memoize((cents: number): number[][] => {
    if (cents <= 0) return [[]];
    if (cents === 1) return [[1]];

    const combinations = new Set<string>();

    for (const coin of coins) {
        if (coin <= cents) {
            const combs = generateCombinations(cents - coin)
                .map(comb => [...comb, coin].sort().join('-'));

            for (const comb of combs) {
                combinations.add(comb);
            }
        }
    }

    return [...combinations]
        .map(comb => comb.split('-').map(n => parseInt(n)));
});

const pb31 = (amount = 200) => {
    return generateCombinations(amount).length;
};

console.log(pb31());
