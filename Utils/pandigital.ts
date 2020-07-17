export const isPandigital = (digits: number[]) => {
    if (digits.length !== 9) return false;
    
    const counts = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    for (const digit of digits) {
        if (++counts[digit - 1] > 1) return false;
    }

    return counts.every(c => c === 1);
};