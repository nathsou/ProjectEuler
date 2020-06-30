
const collatzLen = (n: number): number => {
    if (n === 0) return Infinity;

    let i = 0;
    for (; n !== 1; i++) {
        n = n % 2 === 0 ? n / 2 : 3 * n + 1;
    }

    return i + 1;
};

const pb14 = (max: number): number => {
    let longestLen = 0;
    let longest = 0;

    for (let i = 1; i < max; i++) {
        const len = collatzLen(i);
        if (len > longestLen) {
            longest = i;
            longestLen = len;
        }
    }

    return longest;
};


console.log(pb14(10 ** 6));
// console.log(collatzLen(13));
