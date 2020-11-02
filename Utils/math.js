"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.modPow = exports.nats = exports.isArithmeticSequence = exports.isOctagonal = exports.isHeptagonal = exports.isHexagonal = exports.isPentagonal = exports.isSquare = exports.isTriangular = exports.isInt = exports.cubes = exports.octagons = exports.heptagons = exports.hexagons = exports.pentagons = exports.triangles = exports.squares = exports.solveQuadraticEq = exports.isPalindrome = exports.fromDigits = exports.factB = exports.fact = exports.gcdB = exports.gcd = exports.intLog = exports.divisorsCount = exports.divisors = exports.smallDivisors = exports.prod = exports.sumB = exports.sum = void 0;
var arrays_1 = require("./arrays");
var iters_1 = require("./iters");
var memoize_1 = require("./memoize");
var primeFactors_1 = require("./primeFactors");
exports.sum = function (vals) {
    var s = 0;
    for (var _i = 0, vals_1 = vals; _i < vals_1.length; _i++) {
        var val = vals_1[_i];
        s += val;
    }
    return s;
};
exports.sumB = function (vals) {
    var s = 0n;
    for (var _i = 0, vals_2 = vals; _i < vals_2.length; _i++) {
        var val = vals_2[_i];
        s += val;
    }
    return s;
};
exports.prod = function (vals) {
    var p = 1;
    for (var _i = 0, vals_3 = vals; _i < vals_3.length; _i++) {
        var val = vals_3[_i];
        p *= val;
    }
    return p;
};
// returns the divisors of n <= sqrt(n)
exports.smallDivisors = function (n) {
    if (n === 0)
        return [];
    var divs = [1];
    // we only need to check up to sqrt(n) inclusive
    for (var i = 2; i * i <= n; i++) {
        if (n % i === 0) {
            divs.push(i);
        }
    }
    return divs;
};
exports.divisors = function (n) {
    var divs = exports.smallDivisors(n);
    // the remaining divisors are mirrors of the smaller ones
    for (var i = divs.length - 1; i >= 0; i--) {
        var k = divs[i];
        var divisor = n / k;
        // don't count sqrt(n) twice if it's a natural number
        if (divisor !== k) {
            divs.push(divisor);
        }
    }
    return divs;
};
exports.divisorsCount = function (n) {
    return primeFactors_1.primeFactorsWithExponents(n)
        .reduce(function (count, _a) {
        var _ = _a[0], power = _a[1];
        return (power + 1) * count;
    }, 1);
};
exports.intLog = function (n, base) {
    var i = 0;
    for (; n !== 0; i++) {
        n = Math.floor(n / base);
    }
    return i - 1;
};
var gcd_ = function (a, b) {
    if (b === 0)
        return a;
    return gcd_(b, a % b);
};
var gcdB_ = function (a, b) {
    if (b === 0n)
        return a;
    return gcdB_(b, a % b);
};
exports.gcd = function (ns) {
    return iters_1.foldLeft(ns, function (g, n) { return gcd_(g, n); });
};
exports.gcdB = function (ns) {
    return iters_1.foldLeft(ns, function (g, n) { return gcdB_(g, n); }, 0n);
};
exports.fact = memoize_1.memoize(function (n) { return n === 0 ? 1 : n * exports.fact(n - 1); });
exports.factB = memoize_1.memoize(function (n) { return n === 0n ? 1n : n * exports.factB(n - 1n); });
exports.fromDigits = function (digits) {
    return parseInt(__spreadArrays(digits).join(''));
};
function isPalindrome(n) {
    return arrays_1.isPalindrome("" + n);
}
exports.isPalindrome = isPalindrome;
exports.solveQuadraticEq = function (a, b, c) {
    var delta = Math.pow(b, 2) - 4 * a * c;
    if (delta < 0)
        return [];
    if (delta === 0)
        return [-b / (2 * a)];
    var s = Math.sqrt(delta);
    return [(-b - s) / (2 * a), (-b + s) / (2 * a)];
};
exports.squares = function () {
    return iters_1.scanLeft(iters_1.range(2, Infinity), function (sq, n) { return sq + 2 * n - 1; }, 1);
};
exports.triangles = function () {
    return iters_1.scanLeft(iters_1.range(2, Infinity), function (tri, n) { return tri + n; }, 1);
};
// p(n) = (3n^2 - n) / 2
/// p(n + 1) - p(n) = (3(n + 1)^2 - n - 1) / 2 - (3n^2 - n) / 2
// = (3n^2 + 5n + 2) / 2 - (3n^2 - n) / 2
// 2(p(n + 1) - p(n)) = 6n + 2
// p(n + 1) = p(n) + 3n + 1
exports.pentagons = function () {
    return iters_1.scanLeft(iters_1.range(1, Infinity), function (pent, n) { return pent + 3 * n + 1; }, 1);
};
exports.hexagons = function () {
    return iters_1.scanLeft(iters_1.range(1, Infinity), function (hex, n) { return hex + 4 * n + 1; }, 1);
};
exports.heptagons = function () {
    return iters_1.scanLeft(iters_1.range(1, Infinity), function (hex, n) { return hex + 5 * n + 1; }, 1);
};
exports.octagons = function () {
    return iters_1.scanLeft(iters_1.range(1, Infinity), function (hex, n) { return hex + 6 * n + 1; }, 1);
};
exports.cubes = function () {
    return iters_1.scanLeft(iters_1.range(1, Infinity), function (c, n) { return c + 3 * n * (n + 1) + 1; }, 1);
};
exports.isInt = function (x) {
    return x - Math.floor(x) < Number.EPSILON;
};
// t(n) = (n (n + 1)) / 2 = (n^2 + n) / 2
exports.isTriangular = function (n) {
    return exports.isInt((-(1 / 2) + Math.sqrt(1 / 4 + 2 * n)));
};
exports.isSquare = function (n) {
    return exports.isInt(n) && exports.isInt(Math.sqrt(n));
};
exports.isPentagonal = function (n) {
    return exports.isInt((1 + Math.sqrt(24 * n + 1)) / 6);
};
// h(n) = 2n^2 - n
exports.isHexagonal = function (n) {
    return exports.isInt((1 + Math.sqrt(1 + 8 * n)) / 4);
};
exports.isHeptagonal = function (n) {
    return exports.isInt((3 / 2 + Math.sqrt(9 / 4 + 10 * n)) / 5);
};
exports.isOctagonal = function (n) {
    return exports.isInt((2 + Math.sqrt(4 + 12 * n)) / 6);
};
exports.isArithmeticSequence = function (seq) {
    return !iters_1.allEq(seq) && iters_1.allEq(iters_1.map(iters_1.history(__spreadArrays(seq).sort(), 2), function (_a) {
        var p = _a[0], c = _a[1];
        return c - p;
    }));
};
exports.nats = function (includeZero) {
    if (includeZero === void 0) { includeZero = false; }
    return iters_1.range(includeZero ? 0 : 1, Infinity);
};
exports.modPow = function (a, b, mod) {
    if (b === 0)
        return 1;
    if (b === 1)
        return a % mod;
    var n = b;
    var p = 1;
    var res = 1;
    while (n !== 0) {
        console.log(n & 1, n, res, p);
        n = n >> 1;
        res *= (Math.pow(a, p)) % mod;
        p *= 2;
    }
    return res % mod;
};
