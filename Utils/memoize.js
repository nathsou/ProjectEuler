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
exports.__esModule = true;
exports.memoize2 = exports.memoize = void 0;
function memoize(f) {
    var memo = new Map();
    return function (n) {
        if (memo.has(n))
            return memo.get(n);
        var res = f(n);
        memo.set(n, res);
        return res;
    };
}
exports.memoize = memoize;
function memoize2(f, genKey) {
    if (genKey === void 0) { genKey = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.join(',');
    }; }
    var memo = new Map();
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var key = genKey.apply(void 0, __spread(args));
        if (memo.has(key))
            return memo.get(key);
        var res = f.apply(void 0, __spread(args));
        memo.set(key, res);
        return res;
    };
}
exports.memoize2 = memoize2;
