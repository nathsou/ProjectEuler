
// counts the number of ways `target` can be obtained by summing elements of `vals` together
// using https://projecteuler.net/overview=031
export const countSums = (
    target: number,
    vals: readonly number[]
): number => {
    const ways = [1];

    for (let i = 0; i < vals.length; i++) {
        for (let j = vals[i]; j <= target; j++) {
            ways[j] = (ways[j] ?? 0) + ways[j - vals[i]];
        }
    }

    return ways[ways.length - 1];
};