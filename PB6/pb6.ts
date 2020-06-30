
export function sumSquareDiff(n: number): number {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i ** 2;
    }

    return (n * (n + 1) / 2) ** 2 - sum;
}

console.log(sumSquareDiff(100));