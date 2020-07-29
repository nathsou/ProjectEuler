"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
exports.__esModule = true;
exports.totient = exports.primeFactorsWithExponents = exports.factorize = void 0;
var iters_1 = require("./iters");
var memoize_1 = require("./memoize");
function _factorize(n) {
    if (n === 2)
        return [2];
    if ((n & 1) === 0)
        return __spread([2], _factorize(n / 2));
    for (var i = 3; i * i <= n; i += 2) {
        if (n % i === 0) {
            return __spread([i], _factorize(n / i));
        }
    }
    return [n]; // n is prime
}
exports.factorize = memoize_1.memoize(_factorize);
function primeFactorsWithExponents(n) {
    var e_1, _a;
    var factors = exports.factorize(n);
    var withExponents = [];
    var prev = factors[0];
    var count = 1;
    try {
        for (var _b = __values(iters_1.skip(factors, 1)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var k = _c.value;
            if (prev === k) {
                count++;
            }
            else {
                withExponents.push([prev, count]);
                prev = k;
                count = 1;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    withExponents.push([prev, count]);
    return withExponents;
}
exports.primeFactorsWithExponents = primeFactorsWithExponents;
exports.totient = function (n) {
    var factors = primeFactorsWithExponents(n);
    return Math.round(iters_1.foldLeft2(factors, function (t, _a) {
        var _b = __read(_a, 2), p = _b[0], _ = _b[1];
        return t * (1 - 1 / p);
    }, n));
};
