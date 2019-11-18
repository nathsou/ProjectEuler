
function isStringPalindrome(str) {
    let left = 0;
    let right = str.length - 1;

    while (left < right) {
        if (str[left++] !== str[right--]) return false;
    }

    return true;
}

function isPalindrome(n) {
    return isStringPalindrome(`${n}`);
}

function largestProductPalindrome(digits = 3) {
    let max = 0;

    for (let i = 10 ** (digits - 1); i < 10 ** digits; i++) {
        for (let j = 10 ** (digits - 1); j < 10 ** digits; j++) {
            if (i * j > max && isPalindrome(i * j)) {
                max = i * j;
            }
        }
    }

    return max;
}

console.log(largestProductPalindrome(3));