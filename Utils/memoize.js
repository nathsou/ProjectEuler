"use strict";
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
        var key = genKey.apply(void 0, args);
        if (memo.has(key))
            return memo.get(key);
        var res = f.apply(void 0, args);
        memo.set(key, res);
        return res;
    };
}
exports.memoize2 = memoize2;
