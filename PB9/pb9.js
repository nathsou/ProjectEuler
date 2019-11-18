
function isPythagoreanTriplet(a, b, c) {
    return a ** 2 + b ** 2 === c ** 2;
}

function* generateSums(sum) {

    for (let a = 0; a < sum; a++) {
        const complement = sum - a;
        for (let b = 0; b < complement; b++) {
            const c = complement - b;
            yield { a, b, c };
        }
    }

    return null;
}

const triplet = ((sum) => {
    for ({ a, b, c } of generateSums(sum)) {
        if (b > a && c > b && isPythagoreanTriplet(a, b, c)) return { a, b, c };
    }

    return null;
})(1000);

console.log(triplet.a * triplet.b * triplet.c);