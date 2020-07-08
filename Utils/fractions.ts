export const fractionDigits = (
    a: bigint,
    b: bigint,
    index = 0,
    acc: number[] = [],
    memo: Map<string, number> = new Map()
): {
    digits: number[],
    recurring: boolean,
    cycleStartIndex?: number
} => {
    const key = `${a}:${b}`;
    // console.log(a, b, digits, acc);
    if (memo.has(key)) {
        return {
            digits: acc,
            recurring: true,
            cycleStartIndex: memo.get(key)
        };
    }

    if (a === 0n) return { digits: acc, recurring: false };

    memo.set(key, index);
    const digit = (a * 10n) / b;
    acc.push(Number(digit));

    return fractionDigits(
        (a * 10n) - digit * b,
        b,
        index + 1,
        acc,
        memo
    );
};