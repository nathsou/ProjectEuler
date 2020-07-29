"use strict";
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.allEq = exports.zeros = exports.fill = exports.has = exports.foldLeft2 = exports.accumulate = exports.accumulateWhile = exports.scanLeft2 = exports.scanLeft = exports.foldLeft = exports.chunks = exports.shifts = exports.slices = exports.selfCompose = exports.rotate = exports.any = exports.none = exports.all = exports.count = exports.find = exports.remove = exports.filter = exports.join = exports.digitsReversedB = exports.digitsReversed = exports.digitsCount = exports.digits = exports.triplets = exports.pairs = exports.zip = exports.range = exports.min = exports.max = exports.reverseRange = exports.findIndexRight = exports.len = exports.skip = exports.cycle = exports.repeat = exports.nth = exports.takeAt = exports.takeWhile = exports.take = exports.map = exports.iter = exports.history = exports.indexed = void 0;
var permutations_1 = require("./permutations");
function indexed(iter) {
    var i, iter_1, iter_1_1, elem, e_1_1;
    var e_1, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                i = 0;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, 7, 8]);
                iter_1 = __values(iter), iter_1_1 = iter_1.next();
                _b.label = 2;
            case 2:
                if (!!iter_1_1.done) return [3 /*break*/, 5];
                elem = iter_1_1.value;
                return [4 /*yield*/, [elem, i++]];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                iter_1_1 = iter_1.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_1_1 = _b.sent();
                e_1 = { error: e_1_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (iter_1_1 && !iter_1_1.done && (_a = iter_1["return"])) _a.call(iter_1);
                }
                finally { if (e_1) throw e_1.error; }
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}
exports.indexed = indexed;
function history(it_, historyLen) {
    var it, prev, it_1, it_1_1, val, e_2_1;
    var e_2, _a;
    if (historyLen === void 0) { historyLen = 2; }
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                it = exports.iter(it_);
                prev = __spread(take(it, historyLen));
                return [4 /*yield*/, __spread(prev)];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 7, 8, 9]);
                it_1 = __values(it), it_1_1 = it_1.next();
                _b.label = 3;
            case 3:
                if (!!it_1_1.done) return [3 /*break*/, 6];
                val = it_1_1.value;
                prev.shift();
                return [4 /*yield*/, __spread(prev, [val])];
            case 4:
                _b.sent();
                prev.push(val);
                _b.label = 5;
            case 5:
                it_1_1 = it_1.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_2_1 = _b.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (it_1_1 && !it_1_1.done && (_a = it_1["return"])) _a.call(it_1);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/];
        }
    });
}
exports.history = history;
exports.iter = function (it) {
    return it[Symbol.iterator]();
};
function map(iter, fn) {
    var iter_2, iter_2_1, val, e_3_1;
    var e_3, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, 6, 7]);
                iter_2 = __values(iter), iter_2_1 = iter_2.next();
                _b.label = 1;
            case 1:
                if (!!iter_2_1.done) return [3 /*break*/, 4];
                val = iter_2_1.value;
                return [4 /*yield*/, fn(val)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                iter_2_1 = iter_2.next();
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 7];
            case 5:
                e_3_1 = _b.sent();
                e_3 = { error: e_3_1 };
                return [3 /*break*/, 7];
            case 6:
                try {
                    if (iter_2_1 && !iter_2_1.done && (_a = iter_2["return"])) _a.call(iter_2);
                }
                finally { if (e_3) throw e_3.error; }
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}
exports.map = map;
function take(iterable, n) {
    var it, i, _a, value, done;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                it = exports.iter(iterable);
                i = 0;
                _b.label = 1;
            case 1:
                if (!(i < n)) return [3 /*break*/, 5];
                _a = it.next(), value = _a.value, done = _a.done;
                if (!done) return [3 /*break*/, 2];
                return [3 /*break*/, 5];
            case 2: return [4 /*yield*/, value];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/];
        }
    });
}
exports.take = take;
function takeWhile(iterable, pred) {
    var it, _a, value, done;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                it = exports.iter(iterable);
                _b.label = 1;
            case 1:
                _a = it.next(), value = _a.value, done = _a.done;
                if (!pred(value))
                    return [3 /*break*/, 4];
                return [4 /*yield*/, value];
            case 2:
                _b.sent();
                if (done)
                    return [3 /*break*/, 4];
                _b.label = 3;
            case 3: return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
exports.takeWhile = takeWhile;
function takeAt(it, indices) {
    var idxs, next, _a, _b, _c, val, i, e_4_1;
    var e_4, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                idxs = __spread(new Set(indices)).sort(function (a, b) { return b - a; });
                next = idxs.pop();
                _e.label = 1;
            case 1:
                _e.trys.push([1, 6, 7, 8]);
                _a = __values(indexed(it)), _b = _a.next();
                _e.label = 2;
            case 2:
                if (!!_b.done) return [3 /*break*/, 5];
                _c = __read(_b.value, 2), val = _c[0], i = _c[1];
                if (!(i === next)) return [3 /*break*/, 4];
                return [4 /*yield*/, val];
            case 3:
                _e.sent();
                if (idxs.length === 0)
                    return [3 /*break*/, 5];
                next = idxs.pop();
                _e.label = 4;
            case 4:
                _b = _a.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_4_1 = _e.sent();
                e_4 = { error: e_4_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (_b && !_b.done && (_d = _a["return"])) _d.call(_a);
                }
                finally { if (e_4) throw e_4.error; }
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}
exports.takeAt = takeAt;
function nth(iterable, n) {
    var it = exports.iter(iterable);
    var current = null, i = 0;
    for (; i < n; i++) {
        var _a = it.next(), value = _a.value, done = _a.done;
        current = value;
        if (done)
            break;
    }
    return i === n ? current : null;
}
exports.nth = nth;
function repeat(it, n) {
    var vals, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                vals = __spread(it);
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < n)) return [3 /*break*/, 4];
                return [5 /*yield**/, __values(vals)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
exports.repeat = repeat;
function cycle(it) {
    var vals;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                vals = __spread(it);
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                return [5 /*yield**/, __values(vals)];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}
exports.cycle = cycle;
function skip(iterable, skipCount) {
    var it, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                it = exports.iter(iterable);
                for (i = 0; i < skipCount; i++) {
                    it.next();
                }
                return [5 /*yield**/, __values(it)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}
exports.skip = skip;
exports.len = function (it) {
    var e_5, _a;
    var count = 0;
    try {
        for (var it_2 = __values(it), it_2_1 = it_2.next(); !it_2_1.done; it_2_1 = it_2.next()) {
            var _ = it_2_1.value;
            count++;
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (it_2_1 && !it_2_1.done && (_a = it_2["return"])) _a.call(it_2);
        }
        finally { if (e_5) throw e_5.error; }
    }
    return count;
};
exports.findIndexRight = function (elems, pred) {
    for (var i = elems.length - 1; i >= 0; i--) {
        if (pred(elems[i], i))
            return i;
    }
    return -1;
};
exports.reverseRange = function (elems, start, end) {
    while (start < end) {
        permutations_1.swap(elems, start++, end--);
    }
};
exports.max = function (iterable, gtr) {
    var e_6, _a;
    if (gtr === void 0) { gtr = function (a, b) { return a > b; }; }
    var it = exports.iter(iterable);
    var max = it.next().value;
    var maxIdx = 0;
    try {
        for (var _b = __values(indexed(it)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), val = _d[0], i = _d[1];
            if (gtr(val, max)) {
                max = val;
                maxIdx = i + 1;
            }
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_6) throw e_6.error; }
    }
    return { value: max, index: maxIdx };
};
exports.min = function (iterable, lss) {
    var e_7, _a;
    if (lss === void 0) { lss = function (a, b) { return a < b; }; }
    var it = exports.iter(iterable);
    var min = it.next().value;
    var minIdx = 0;
    try {
        for (var _b = __values(indexed(it)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), val = _d[0], i = _d[1];
            if (lss(val, min)) {
                min = val;
                minIdx = i + 1;
            }
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_7) throw e_7.error; }
    }
    return { value: min, index: minIdx };
};
function range(from, to, step) {
    var step_, i, i;
    if (step === void 0) { step = 1; }
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                step_ = (typeof from === "number" ? step : BigInt(step));
                if (to === undefined) {
                    to = from;
                    from = (typeof from === "number" ? 0 : 0n);
                }
                if (!(to > from)) return [3 /*break*/, 5];
                i = from;
                _a.label = 1;
            case 1:
                if (!(i <= to)) return [3 /*break*/, 4];
                return [4 /*yield*/, i];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                i = i + step_;
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 9];
            case 5:
                i = from;
                _a.label = 6;
            case 6:
                if (!(i >= to)) return [3 /*break*/, 9];
                return [4 /*yield*/, i];
            case 7:
                _a.sent();
                _a.label = 8;
            case 8:
                i = i - step_;
                return [3 /*break*/, 6];
            case 9: return [2 /*return*/];
        }
    });
}
exports.range = range;
function zip(as, bs) {
    var as_, bs_, a, b;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                as_ = exports.iter(as);
                bs_ = exports.iter(bs);
                _a.label = 1;
            case 1:
                if (!true) return [3 /*break*/, 3];
                a = as_.next();
                b = bs_.next();
                if (a.done || b.done)
                    return [3 /*break*/, 3];
                return [4 /*yield*/, [a.value, b.value]];
            case 2:
                _a.sent();
                return [3 /*break*/, 1];
            case 3: return [2 /*return*/];
        }
    });
}
exports.zip = zip;
function pairs(as, bs) {
    var bs_, as_1, as_1_1, a, bs_1, bs_1_1, b, e_8_1, e_9_1;
    var e_9, _a, e_8, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                bs_ = __spread(bs);
                _c.label = 1;
            case 1:
                _c.trys.push([1, 12, 13, 14]);
                as_1 = __values(as), as_1_1 = as_1.next();
                _c.label = 2;
            case 2:
                if (!!as_1_1.done) return [3 /*break*/, 11];
                a = as_1_1.value;
                _c.label = 3;
            case 3:
                _c.trys.push([3, 8, 9, 10]);
                bs_1 = (e_8 = void 0, __values(bs_)), bs_1_1 = bs_1.next();
                _c.label = 4;
            case 4:
                if (!!bs_1_1.done) return [3 /*break*/, 7];
                b = bs_1_1.value;
                return [4 /*yield*/, [a, b]];
            case 5:
                _c.sent();
                _c.label = 6;
            case 6:
                bs_1_1 = bs_1.next();
                return [3 /*break*/, 4];
            case 7: return [3 /*break*/, 10];
            case 8:
                e_8_1 = _c.sent();
                e_8 = { error: e_8_1 };
                return [3 /*break*/, 10];
            case 9:
                try {
                    if (bs_1_1 && !bs_1_1.done && (_b = bs_1["return"])) _b.call(bs_1);
                }
                finally { if (e_8) throw e_8.error; }
                return [7 /*endfinally*/];
            case 10:
                as_1_1 = as_1.next();
                return [3 /*break*/, 2];
            case 11: return [3 /*break*/, 14];
            case 12:
                e_9_1 = _c.sent();
                e_9 = { error: e_9_1 };
                return [3 /*break*/, 14];
            case 13:
                try {
                    if (as_1_1 && !as_1_1.done && (_a = as_1["return"])) _a.call(as_1);
                }
                finally { if (e_9) throw e_9.error; }
                return [7 /*endfinally*/];
            case 14: return [2 /*return*/];
        }
    });
}
exports.pairs = pairs;
function triplets(as, bs, cs) {
    var bs_, cs_, as_2, as_2_1, a, bs_2, bs_2_1, b, cs_1, cs_1_1, c, e_10_1, e_11_1, e_12_1;
    var e_12, _a, e_11, _b, e_10, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                bs_ = __spread(bs);
                cs_ = __spread(cs);
                _d.label = 1;
            case 1:
                _d.trys.push([1, 18, 19, 20]);
                as_2 = __values(as), as_2_1 = as_2.next();
                _d.label = 2;
            case 2:
                if (!!as_2_1.done) return [3 /*break*/, 17];
                a = as_2_1.value;
                _d.label = 3;
            case 3:
                _d.trys.push([3, 14, 15, 16]);
                bs_2 = (e_11 = void 0, __values(bs_)), bs_2_1 = bs_2.next();
                _d.label = 4;
            case 4:
                if (!!bs_2_1.done) return [3 /*break*/, 13];
                b = bs_2_1.value;
                _d.label = 5;
            case 5:
                _d.trys.push([5, 10, 11, 12]);
                cs_1 = (e_10 = void 0, __values(cs_)), cs_1_1 = cs_1.next();
                _d.label = 6;
            case 6:
                if (!!cs_1_1.done) return [3 /*break*/, 9];
                c = cs_1_1.value;
                return [4 /*yield*/, [a, b, c]];
            case 7:
                _d.sent();
                _d.label = 8;
            case 8:
                cs_1_1 = cs_1.next();
                return [3 /*break*/, 6];
            case 9: return [3 /*break*/, 12];
            case 10:
                e_10_1 = _d.sent();
                e_10 = { error: e_10_1 };
                return [3 /*break*/, 12];
            case 11:
                try {
                    if (cs_1_1 && !cs_1_1.done && (_c = cs_1["return"])) _c.call(cs_1);
                }
                finally { if (e_10) throw e_10.error; }
                return [7 /*endfinally*/];
            case 12:
                bs_2_1 = bs_2.next();
                return [3 /*break*/, 4];
            case 13: return [3 /*break*/, 16];
            case 14:
                e_11_1 = _d.sent();
                e_11 = { error: e_11_1 };
                return [3 /*break*/, 16];
            case 15:
                try {
                    if (bs_2_1 && !bs_2_1.done && (_b = bs_2["return"])) _b.call(bs_2);
                }
                finally { if (e_11) throw e_11.error; }
                return [7 /*endfinally*/];
            case 16:
                as_2_1 = as_2.next();
                return [3 /*break*/, 2];
            case 17: return [3 /*break*/, 20];
            case 18:
                e_12_1 = _d.sent();
                e_12 = { error: e_12_1 };
                return [3 /*break*/, 20];
            case 19:
                try {
                    if (as_2_1 && !as_2_1.done && (_a = as_2["return"])) _a.call(as_2);
                }
                finally { if (e_12) throw e_12.error; }
                return [7 /*endfinally*/];
            case 20: return [2 /*return*/];
        }
    });
}
exports.triplets = triplets;
function digits(n) {
    return ("" + n).split("").map(function (n) { return parseInt(n); });
}
exports.digits = digits;
exports.digitsCount = function (n) {
    return ("" + n).length;
};
function digitsReversed(n) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(n !== 0)) return [3 /*break*/, 2];
                return [4 /*yield*/, n % 10];
            case 1:
                _a.sent();
                n = Math.floor(n / 10);
                return [3 /*break*/, 0];
            case 2: return [2 /*return*/];
        }
    });
}
exports.digitsReversed = digitsReversed;
function digitsReversedB(n) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(n !== 0n)) return [3 /*break*/, 2];
                return [4 /*yield*/, n % 10n];
            case 1:
                _a.sent();
                n = n / 10n;
                return [3 /*break*/, 0];
            case 2: return [2 /*return*/];
        }
    });
}
exports.digitsReversedB = digitsReversedB;
function join(iters) {
    var iters_1, iters_1_1, iter_3, e_13_1;
    var e_13, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, 6, 7]);
                iters_1 = __values(iters), iters_1_1 = iters_1.next();
                _b.label = 1;
            case 1:
                if (!!iters_1_1.done) return [3 /*break*/, 4];
                iter_3 = iters_1_1.value;
                return [5 /*yield**/, __values(iter_3)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                iters_1_1 = iters_1.next();
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 7];
            case 5:
                e_13_1 = _b.sent();
                e_13 = { error: e_13_1 };
                return [3 /*break*/, 7];
            case 6:
                try {
                    if (iters_1_1 && !iters_1_1.done && (_a = iters_1["return"])) _a.call(iters_1);
                }
                finally { if (e_13) throw e_13.error; }
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}
exports.join = join;
function filter(as, pred) {
    var as_3, as_3_1, a, e_14_1;
    var e_14, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, 6, 7]);
                as_3 = __values(as), as_3_1 = as_3.next();
                _b.label = 1;
            case 1:
                if (!!as_3_1.done) return [3 /*break*/, 4];
                a = as_3_1.value;
                if (!pred(a)) return [3 /*break*/, 3];
                return [4 /*yield*/, a];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3:
                as_3_1 = as_3.next();
                return [3 /*break*/, 1];
            case 4: return [3 /*break*/, 7];
            case 5:
                e_14_1 = _b.sent();
                e_14 = { error: e_14_1 };
                return [3 /*break*/, 7];
            case 6:
                try {
                    if (as_3_1 && !as_3_1.done && (_a = as_3["return"])) _a.call(as_3);
                }
                finally { if (e_14) throw e_14.error; }
                return [7 /*endfinally*/];
            case 7: return [2 /*return*/];
        }
    });
}
exports.filter = filter;
function remove(vals, valToRemove, removeCount) {
    var removed, vals_1, vals_1_1, val, e_15_1;
    var e_15, _a;
    if (removeCount === void 0) { removeCount = Infinity; }
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                removed = 0;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, 8, 9]);
                vals_1 = __values(vals), vals_1_1 = vals_1.next();
                _b.label = 2;
            case 2:
                if (!!vals_1_1.done) return [3 /*break*/, 6];
                val = vals_1_1.value;
                if (!(removed < removeCount && val === valToRemove)) return [3 /*break*/, 3];
                removed++;
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, val];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                vals_1_1 = vals_1.next();
                return [3 /*break*/, 2];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_15_1 = _b.sent();
                e_15 = { error: e_15_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (vals_1_1 && !vals_1_1.done && (_a = vals_1["return"])) _a.call(vals_1);
                }
                finally { if (e_15) throw e_15.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/];
        }
    });
}
exports.remove = remove;
function find(as, pred) {
    var e_16, _a;
    try {
        for (var _b = __values(indexed(as)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), a = _d[0], index = _d[1];
            if (pred(a)) {
                return { value: a, index: index };
            }
        }
    }
    catch (e_16_1) { e_16 = { error: e_16_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_16) throw e_16.error; }
    }
    return { value: null, index: -1 };
}
exports.find = find;
function count(as, pred) {
    var e_17, _a;
    var count = 0;
    try {
        for (var as_4 = __values(as), as_4_1 = as_4.next(); !as_4_1.done; as_4_1 = as_4.next()) {
            var a = as_4_1.value;
            if (pred(a)) {
                count++;
            }
        }
    }
    catch (e_17_1) { e_17 = { error: e_17_1 }; }
    finally {
        try {
            if (as_4_1 && !as_4_1.done && (_a = as_4["return"])) _a.call(as_4);
        }
        finally { if (e_17) throw e_17.error; }
    }
    return count;
}
exports.count = count;
function all(as, pred) {
    var e_18, _a;
    try {
        for (var as_5 = __values(as), as_5_1 = as_5.next(); !as_5_1.done; as_5_1 = as_5.next()) {
            var a = as_5_1.value;
            if (!pred(a)) {
                return false;
            }
        }
    }
    catch (e_18_1) { e_18 = { error: e_18_1 }; }
    finally {
        try {
            if (as_5_1 && !as_5_1.done && (_a = as_5["return"])) _a.call(as_5);
        }
        finally { if (e_18) throw e_18.error; }
    }
    return true;
}
exports.all = all;
exports.none = function (as, pred) { return !any(as, pred); };
function any(as, pred) {
    var e_19, _a;
    try {
        for (var as_6 = __values(as), as_6_1 = as_6.next(); !as_6_1.done; as_6_1 = as_6.next()) {
            var a = as_6_1.value;
            if (pred(a)) {
                return true;
            }
        }
    }
    catch (e_19_1) { e_19 = { error: e_19_1 }; }
    finally {
        try {
            if (as_6_1 && !as_6_1.done && (_a = as_6["return"])) _a.call(as_6);
        }
        finally { if (e_19) throw e_19.error; }
    }
    return false;
}
exports.any = any;
exports.rotate = function (elems, dir) {
    if (dir === void 0) { dir = "right"; }
    if (dir === "right") {
        return elems.map(function (_, i) { return elems[(i + 1) % elems.length]; });
    }
    return elems.map(function (_, i) { return elems[i === 0 ? elems.length - 1 : (i - 1)]; });
};
function selfCompose(f, arg) {
    var r;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                r = arg;
                return [4 /*yield*/, arg];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                r = f(r);
                return [4 /*yield*/, r];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                if (true) return [3 /*break*/, 2];
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}
exports.selfCompose = selfCompose;
function slices(elems) {
    var els, elems_1, elems_1_1, elem, e_20_1;
    var e_20, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                els = [];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, 7, 8]);
                elems_1 = __values(elems), elems_1_1 = elems_1.next();
                _b.label = 2;
            case 2:
                if (!!elems_1_1.done) return [3 /*break*/, 5];
                elem = elems_1_1.value;
                return [4 /*yield*/, __spread(els, [elem])];
            case 3:
                _b.sent();
                els.push(elem);
                _b.label = 4;
            case 4:
                elems_1_1 = elems_1.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_20_1 = _b.sent();
                e_20 = { error: e_20_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (elems_1_1 && !elems_1_1.done && (_a = elems_1["return"])) _a.call(elems_1);
                }
                finally { if (e_20) throw e_20.error; }
                return [7 /*endfinally*/];
            case 8: return [2 /*return*/];
        }
    });
}
exports.slices = slices;
function shifts(elems, slideLen) {
    var it, els, it_3, it_3_1, elem, e_21_1;
    var e_21, _a;
    if (slideLen === void 0) { slideLen = 1; }
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                it = exports.iter(elems);
                els = __spread(take(it, slideLen));
                return [4 /*yield*/, __spread(els)];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 7, 8, 9]);
                it_3 = __values(it), it_3_1 = it_3.next();
                _b.label = 3;
            case 3:
                if (!!it_3_1.done) return [3 /*break*/, 6];
                elem = it_3_1.value;
                els.shift();
                return [4 /*yield*/, __spread(els, [elem])];
            case 4:
                _b.sent();
                els.push(elem);
                _b.label = 5;
            case 5:
                it_3_1 = it_3.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_21_1 = _b.sent();
                e_21 = { error: e_21_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (it_3_1 && !it_3_1.done && (_a = it_3["return"])) _a.call(it_3);
                }
                finally { if (e_21) throw e_21.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/];
        }
    });
}
exports.shifts = shifts;
function chunks(it, len) {
    var chunk, it_4, it_4_1, val, e_22_1;
    var e_22, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (len <= 0)
                    return [2 /*return*/];
                chunk = [];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 6, 7, 8]);
                it_4 = __values(it), it_4_1 = it_4.next();
                _b.label = 2;
            case 2:
                if (!!it_4_1.done) return [3 /*break*/, 5];
                val = it_4_1.value;
                chunk.push(val);
                if (!(chunk.length % len === 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, chunk];
            case 3:
                _b.sent();
                chunk = [];
                _b.label = 4;
            case 4:
                it_4_1 = it_4.next();
                return [3 /*break*/, 2];
            case 5: return [3 /*break*/, 8];
            case 6:
                e_22_1 = _b.sent();
                e_22 = { error: e_22_1 };
                return [3 /*break*/, 8];
            case 7:
                try {
                    if (it_4_1 && !it_4_1.done && (_a = it_4["return"])) _a.call(it_4);
                }
                finally { if (e_22) throw e_22.error; }
                return [7 /*endfinally*/];
            case 8:
                if (!(chunk.length > 0)) return [3 /*break*/, 10];
                return [4 /*yield*/, chunk];
            case 9:
                _b.sent();
                _b.label = 10;
            case 10: return [2 /*return*/];
        }
    });
}
exports.chunks = chunks;
exports.foldLeft = function (it, fn, base) {
    var e_23, _a;
    var acc = base !== undefined ? base : nth(it, 0);
    try {
        for (var it_5 = __values(it), it_5_1 = it_5.next(); !it_5_1.done; it_5_1 = it_5.next()) {
            var val = it_5_1.value;
            acc = fn(acc, val);
        }
    }
    catch (e_23_1) { e_23 = { error: e_23_1 }; }
    finally {
        try {
            if (it_5_1 && !it_5_1.done && (_a = it_5["return"])) _a.call(it_5);
        }
        finally { if (e_23) throw e_23.error; }
    }
    return acc;
};
function scanLeft(it, fn, base) {
    var acc, it_6, it_6_1, val, e_24_1;
    var e_24, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                acc = base !== undefined ? base : nth(it, 0);
                return [4 /*yield*/, acc];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 7, 8, 9]);
                it_6 = __values(it), it_6_1 = it_6.next();
                _b.label = 3;
            case 3:
                if (!!it_6_1.done) return [3 /*break*/, 6];
                val = it_6_1.value;
                acc = fn(acc, val);
                return [4 /*yield*/, acc];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                it_6_1 = it_6.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_24_1 = _b.sent();
                e_24 = { error: e_24_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (it_6_1 && !it_6_1.done && (_a = it_6["return"])) _a.call(it_6);
                }
                finally { if (e_24) throw e_24.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/];
        }
    });
}
exports.scanLeft = scanLeft;
function scanLeft2(it, fn, base) {
    var acc, it_7, it_7_1, val, e_25_1;
    var e_25, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                acc = base;
                return [4 /*yield*/, acc];
            case 1:
                _b.sent();
                _b.label = 2;
            case 2:
                _b.trys.push([2, 7, 8, 9]);
                it_7 = __values(it), it_7_1 = it_7.next();
                _b.label = 3;
            case 3:
                if (!!it_7_1.done) return [3 /*break*/, 6];
                val = it_7_1.value;
                acc = fn(acc, val);
                return [4 /*yield*/, acc];
            case 4:
                _b.sent();
                _b.label = 5;
            case 5:
                it_7_1 = it_7.next();
                return [3 /*break*/, 3];
            case 6: return [3 /*break*/, 9];
            case 7:
                e_25_1 = _b.sent();
                e_25 = { error: e_25_1 };
                return [3 /*break*/, 9];
            case 8:
                try {
                    if (it_7_1 && !it_7_1.done && (_a = it_7["return"])) _a.call(it_7);
                }
                finally { if (e_25) throw e_25.error; }
                return [7 /*endfinally*/];
            case 9: return [2 /*return*/];
        }
    });
}
exports.scanLeft2 = scanLeft2;
function accumulateWhile(fn, pred, base) {
    var acc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                acc = base;
                _a.label = 1;
            case 1: return [4 /*yield*/, acc];
            case 2:
                _a.sent();
                acc = fn(acc);
                _a.label = 3;
            case 3:
                if (pred(acc)) return [3 /*break*/, 1];
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}
exports.accumulateWhile = accumulateWhile;
function accumulate(fn, base) {
    var acc;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                acc = base;
                _a.label = 1;
            case 1: return [4 /*yield*/, acc];
            case 2:
                _a.sent();
                acc = fn(acc);
                _a.label = 3;
            case 3:
                if (true) return [3 /*break*/, 1];
                _a.label = 4;
            case 4: return [2 /*return*/];
        }
    });
}
exports.accumulate = accumulate;
function foldLeft2(it, fn, base) {
    var e_26, _a;
    var acc = base;
    try {
        for (var it_8 = __values(it), it_8_1 = it_8.next(); !it_8_1.done; it_8_1 = it_8.next()) {
            var val = it_8_1.value;
            acc = fn(acc, val);
        }
    }
    catch (e_26_1) { e_26 = { error: e_26_1 }; }
    finally {
        try {
            if (it_8_1 && !it_8_1.done && (_a = it_8["return"])) _a.call(it_8);
        }
        finally { if (e_26) throw e_26.error; }
    }
    return acc;
}
exports.foldLeft2 = foldLeft2;
exports.has = function (it) {
    var e_27, _a;
    var elems = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        elems[_i - 1] = arguments[_i];
    }
    var elemsSet = new Set(elems);
    try {
        for (var it_9 = __values(it), it_9_1 = it_9.next(); !it_9_1.done; it_9_1 = it_9.next()) {
            var elem = it_9_1.value;
            elemsSet["delete"](elem);
        }
    }
    catch (e_27_1) { e_27 = { error: e_27_1 }; }
    finally {
        try {
            if (it_9_1 && !it_9_1.done && (_a = it_9["return"])) _a.call(it_9);
        }
        finally { if (e_27) throw e_27.error; }
    }
    return elemsSet.size === 0;
};
exports.fill = function (val, count) {
    var vals = [];
    for (var i = 0; i < count; i++) {
        vals.push(val);
    }
    return vals;
};
exports.zeros = function (count) { return exports.fill(0, count); };
exports.allEq = function (vals) {
    var e_28, _a;
    try {
        for (var _b = __values(history(vals, 2)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var _d = __read(_c.value, 2), p = _d[0], c = _d[1];
            if (p !== c)
                return false;
        }
    }
    catch (e_28_1) { e_28 = { error: e_28_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
        }
        finally { if (e_28) throw e_28.error; }
    }
    return true;
};
