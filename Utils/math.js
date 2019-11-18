
const sum = vals => vals.reduce((p, c) => p + c);

const prod = vals => vals.reduce((p, c) => p * c, 1);

function range(from, to, step = 1) {
    const vals = [];
    for (let i = from; i <= to; i += step) {
        vals.push(i);
    }

    return vals;
}

module.exports = {
    sum,
    prod,
    range
};