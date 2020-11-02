"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.totient = exports.primeFactorsWithExponents = exports.factorize = void 0;
var iters_1 = require("./iters");
var memoize_1 = require("./memoize");
function _factorize(n) {
    if (n === 2)
        return [2];
    if ((n & 1) === 0)
        return __spreadArrays([2], _factorize(n / 2));
    for (var i = 3; i * i <= n; i += 2) {
        if (n % i === 0) {
            return __spreadArrays([i], _factorize(n / i));
        }
    }
    return [n]; // n is prime
}
exports.factorize = memoize_1.memoize(_factorize);
function primeFactorsWithExponents(n) {
    var factors = exports.factorize(n);
    var withExponents = [];
    var prev = factors[0];
    var count = 1;
    for (var _i = 0, _a = iters_1.skip(factors, 1); _i < _a.length; _i++) {
        var k = _a[_i];
        if (prev === k) {
            count++;
        }
        else {
            withExponents.push([prev, count]);
            prev = k;
            count = 1;
        }
    }
    withExponents.push([prev, count]);
    return withExponents;
}
exports.primeFactorsWithExponents = primeFactorsWithExponents;
exports.totient = function (n) {
    var factors = primeFactorsWithExponents(n);
    return Math.round(iters_1.foldLeft2(factors, function (t, _a) {
        var p = _a[0], _ = _a[1];
        return t * (1 - 1 / p);
    }, n));
};
