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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
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
exports.allEq = exports.zeros = exports.fill = exports.has = exports.foldLeft2 = exports.accumulate = exports.accumulateWhile = exports.scanLeft2 = exports.scanLeft = exports.foldLeft = exports.chunks = exports.shifts = exports.slices = exports.selfCompose = exports.rotate = exports.any = exports.none = exports.all = exports.count = exports.find = exports.remove = exports.filter = exports.join = exports.digitsReversedB = exports.digitsReversed = exports.digitsCount = exports.digits = exports.triplets = exports.pairs = exports.zip = exports.range = exports.min = exports.max = exports.reverseRange = exports.findIndexRight = exports.len = exports.skip = exports.cycle = exports.repeat = exports.nth = exports.takeAt = exports.takeWhile = exports.take = exports.map = exports.iter = exports.history = exports.indexed = void 0;
var permutations_1 = require("./permutations");
function indexed(iter) {
    var i, _i, iter_1, elem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                i = 0;
                _i = 0, iter_1 = iter;
                _a.label = 1;
            case 1:
                if (!(_i < iter_1.length)) return [3 /*break*/, 4];
                elem = iter_1[_i];
                return [4 /*yield*/, [elem, i++]];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
exports.indexed = indexed;
function history(it_, historyLen) {
    var it, prev, _i, it_1, val;
    if (historyLen === void 0) { historyLen = 2; }
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                it = exports.iter(it_);
                prev = __spreadArrays(take(it, historyLen));
                return [4 /*yield*/, __spreadArrays(prev)];
            case 1:
                _a.sent();
                _i = 0, it_1 = it;
                _a.label = 2;
            case 2:
                if (!(_i < it_1.length)) return [3 /*break*/, 5];
                val = it_1[_i];
                prev.shift();
                return [4 /*yield*/, __spreadArrays(prev, [val])];
            case 3:
                _a.sent();
                prev.push(val);
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}
exports.history = history;
exports.iter = function (it) {
    return it[Symbol.iterator]();
};
function map(iter, fn) {
    var _i, iter_2, val;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, iter_2 = iter;
                _a.label = 1;
            case 1:
                if (!(_i < iter_2.length)) return [3 /*break*/, 4];
                val = iter_2[_i];
                return [4 /*yield*/, fn(val)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
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
    var idxs, next, _i, _a, _b, val, i;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                idxs = __spreadArrays(new Set(indices)).sort(function (a, b) { return b - a; });
                next = idxs.pop();
                _i = 0, _a = indexed(it);
                _c.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                _b = _a[_i], val = _b[0], i = _b[1];
                if (!(i === next)) return [3 /*break*/, 3];
                return [4 /*yield*/, val];
            case 2:
                _c.sent();
                if (idxs.length === 0)
                    return [3 /*break*/, 4];
                next = idxs.pop();
                _c.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
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
                vals = __spreadArrays(it);
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
                vals = __spreadArrays(it);
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
    var count = 0;
    for (var _i = 0, it_2 = it; _i < it_2.length; _i++) {
        var _ = it_2[_i];
        count++;
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
    if (gtr === void 0) { gtr = function (a, b) { return a > b; }; }
    var it = exports.iter(iterable);
    var max = it.next().value;
    var maxIdx = 0;
    for (var _i = 0, _a = indexed(it); _i < _a.length; _i++) {
        var _b = _a[_i], val = _b[0], i = _b[1];
        if (gtr(val, max)) {
            max = val;
            maxIdx = i + 1;
        }
    }
    return { value: max, index: maxIdx };
};
exports.min = function (iterable, lss) {
    if (lss === void 0) { lss = function (a, b) { return a < b; }; }
    var it = exports.iter(iterable);
    var min = it.next().value;
    var minIdx = 0;
    for (var _i = 0, _a = indexed(it); _i < _a.length; _i++) {
        var _b = _a[_i], val = _b[0], i = _b[1];
        if (lss(val, min)) {
            min = val;
            minIdx = i + 1;
        }
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
    var bs_, _i, as_1, a, _a, bs_1, b;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                bs_ = __spreadArrays(bs);
                _i = 0, as_1 = as;
                _b.label = 1;
            case 1:
                if (!(_i < as_1.length)) return [3 /*break*/, 6];
                a = as_1[_i];
                _a = 0, bs_1 = bs_;
                _b.label = 2;
            case 2:
                if (!(_a < bs_1.length)) return [3 /*break*/, 5];
                b = bs_1[_a];
                return [4 /*yield*/, [a, b]];
            case 3:
                _b.sent();
                _b.label = 4;
            case 4:
                _a++;
                return [3 /*break*/, 2];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}
exports.pairs = pairs;
function triplets(as, bs, cs) {
    var bs_, cs_, _i, as_2, a, _a, bs_2, b, _b, cs_1, c;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                bs_ = __spreadArrays(bs);
                cs_ = __spreadArrays(cs);
                _i = 0, as_2 = as;
                _c.label = 1;
            case 1:
                if (!(_i < as_2.length)) return [3 /*break*/, 8];
                a = as_2[_i];
                _a = 0, bs_2 = bs_;
                _c.label = 2;
            case 2:
                if (!(_a < bs_2.length)) return [3 /*break*/, 7];
                b = bs_2[_a];
                _b = 0, cs_1 = cs_;
                _c.label = 3;
            case 3:
                if (!(_b < cs_1.length)) return [3 /*break*/, 6];
                c = cs_1[_b];
                return [4 /*yield*/, [a, b, c]];
            case 4:
                _c.sent();
                _c.label = 5;
            case 5:
                _b++;
                return [3 /*break*/, 3];
            case 6:
                _a++;
                return [3 /*break*/, 2];
            case 7:
                _i++;
                return [3 /*break*/, 1];
            case 8: return [2 /*return*/];
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
    var _i, iters_1, iter_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, iters_1 = iters;
                _a.label = 1;
            case 1:
                if (!(_i < iters_1.length)) return [3 /*break*/, 4];
                iter_3 = iters_1[_i];
                return [5 /*yield**/, __values(iter_3)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
exports.join = join;
function filter(as, pred) {
    var _i, as_3, a;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _i = 0, as_3 = as;
                _a.label = 1;
            case 1:
                if (!(_i < as_3.length)) return [3 /*break*/, 4];
                a = as_3[_i];
                if (!pred(a)) return [3 /*break*/, 3];
                return [4 /*yield*/, a];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
exports.filter = filter;
function remove(vals, valToRemove, removeCount) {
    var removed, _i, vals_1, val;
    if (removeCount === void 0) { removeCount = Infinity; }
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                removed = 0;
                _i = 0, vals_1 = vals;
                _a.label = 1;
            case 1:
                if (!(_i < vals_1.length)) return [3 /*break*/, 5];
                val = vals_1[_i];
                if (!(removed < removeCount && val === valToRemove)) return [3 /*break*/, 2];
                removed++;
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, val];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 1];
            case 5: return [2 /*return*/];
        }
    });
}
exports.remove = remove;
function find(as, pred) {
    for (var _i = 0, _a = indexed(as); _i < _a.length; _i++) {
        var _b = _a[_i], a = _b[0], index = _b[1];
        if (pred(a)) {
            return { value: a, index: index };
        }
    }
    return { value: null, index: -1 };
}
exports.find = find;
function count(as, pred) {
    var count = 0;
    for (var _i = 0, as_4 = as; _i < as_4.length; _i++) {
        var a = as_4[_i];
        if (pred(a)) {
            count++;
        }
    }
    return count;
}
exports.count = count;
function all(as, pred) {
    for (var _i = 0, as_5 = as; _i < as_5.length; _i++) {
        var a = as_5[_i];
        if (!pred(a)) {
            return false;
        }
    }
    return true;
}
exports.all = all;
exports.none = function (as, pred) { return !any(as, pred); };
function any(as, pred) {
    for (var _i = 0, as_6 = as; _i < as_6.length; _i++) {
        var a = as_6[_i];
        if (pred(a)) {
            return true;
        }
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
    var els, _i, elems_1, elem;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                els = [];
                _i = 0, elems_1 = elems;
                _a.label = 1;
            case 1:
                if (!(_i < elems_1.length)) return [3 /*break*/, 4];
                elem = elems_1[_i];
                return [4 /*yield*/, __spreadArrays(els, [elem])];
            case 2:
                _a.sent();
                els.push(elem);
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
        }
    });
}
exports.slices = slices;
function shifts(elems, slideLen) {
    var it, els, _i, it_3, elem;
    if (slideLen === void 0) { slideLen = 1; }
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                it = exports.iter(elems);
                els = __spreadArrays(take(it, slideLen));
                return [4 /*yield*/, __spreadArrays(els)];
            case 1:
                _a.sent();
                _i = 0, it_3 = it;
                _a.label = 2;
            case 2:
                if (!(_i < it_3.length)) return [3 /*break*/, 5];
                elem = it_3[_i];
                els.shift();
                return [4 /*yield*/, __spreadArrays(els, [elem])];
            case 3:
                _a.sent();
                els.push(elem);
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}
exports.shifts = shifts;
function chunks(it, len) {
    var chunk, _i, it_4, val;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (len <= 0)
                    return [2 /*return*/];
                chunk = [];
                _i = 0, it_4 = it;
                _a.label = 1;
            case 1:
                if (!(_i < it_4.length)) return [3 /*break*/, 4];
                val = it_4[_i];
                chunk.push(val);
                if (!(chunk.length % len === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, chunk];
            case 2:
                _a.sent();
                chunk = [];
                _a.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4:
                if (!(chunk.length > 0)) return [3 /*break*/, 6];
                return [4 /*yield*/, chunk];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}
exports.chunks = chunks;
exports.foldLeft = function (it, fn, base) {
    var acc = base !== undefined ? base : nth(it, 0);
    for (var _i = 0, it_5 = it; _i < it_5.length; _i++) {
        var val = it_5[_i];
        acc = fn(acc, val);
    }
    return acc;
};
function scanLeft(it, fn, base) {
    var acc, _i, it_6, val;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                acc = base !== undefined ? base : nth(it, 0);
                return [4 /*yield*/, acc];
            case 1:
                _a.sent();
                _i = 0, it_6 = it;
                _a.label = 2;
            case 2:
                if (!(_i < it_6.length)) return [3 /*break*/, 5];
                val = it_6[_i];
                acc = fn(acc, val);
                return [4 /*yield*/, acc];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
        }
    });
}
exports.scanLeft = scanLeft;
function scanLeft2(it, fn, base) {
    var acc, _i, it_7, val;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                acc = base;
                return [4 /*yield*/, acc];
            case 1:
                _a.sent();
                _i = 0, it_7 = it;
                _a.label = 2;
            case 2:
                if (!(_i < it_7.length)) return [3 /*break*/, 5];
                val = it_7[_i];
                acc = fn(acc, val);
                return [4 /*yield*/, acc];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5: return [2 /*return*/];
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
    var acc = base;
    for (var _i = 0, it_8 = it; _i < it_8.length; _i++) {
        var val = it_8[_i];
        acc = fn(acc, val);
    }
    return acc;
}
exports.foldLeft2 = foldLeft2;
exports.has = function (it) {
    var elems = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        elems[_i - 1] = arguments[_i];
    }
    var elemsSet = new Set(elems);
    for (var _a = 0, it_9 = it; _a < it_9.length; _a++) {
        var elem = it_9[_a];
        elemsSet["delete"](elem);
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
    for (var _i = 0, _a = history(vals, 2); _i < _a.length; _i++) {
        var _b = _a[_i], p = _b[0], c = _b[1];
        if (p !== c)
            return false;
    }
    return true;
};
