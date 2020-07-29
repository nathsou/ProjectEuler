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
exports.occurences = exports.empty = exports.snd = exports.fst = exports.not = exports.eq = exports.even = exports.odd = exports.compose = void 0;
var iters_1 = require("./iters");
exports.compose = function (f, g) {
    return function (v) { return f(g(v)); };
};
exports.odd = function (n) { return (n & 1) === 1; };
exports.even = function (n) { return (n & 1) === 0; };
exports.eq = function (a) { return function (b) { return a === b; }; };
exports.not = function (q) { return !q; };
exports.fst = function (_c) {
    var _d = __read(_c, 2), a = _d[0], _b = _d[1];
    return a;
};
exports.snd = function (_c) {
    var _d = __read(_c, 2), _a = _d[0], b = _d[1];
    return b;
};
exports.empty = function (it) { return iters_1.iter(it).next().done; };
exports.occurences = function (vals) {
    var e_1, _c;
    var occs = new Map();
    try {
        for (var _d = __values(iters_1.indexed(vals)), _e = _d.next(); !_e.done; _e = _d.next()) {
            var _f = __read(_e.value, 2), val = _f[0], index = _f[1];
            if (!occs.has(val)) {
                occs.set(val, []);
            }
            occs.get(val).push(index);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_e && !_e.done && (_c = _d["return"])) _c.call(_d);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return occs;
};
