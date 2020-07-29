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
exports.combinations = exports.binomial = exports.nthPermutation = exports.reverseLexicographicPermutations = exports.lexicographicPermutations = exports.prevPermutation = exports.nextPermutation = exports.permutations = exports.swap = void 0;
var iters_1 = require("./iters");
exports.swap = function (elems, i, j) {
    var _a;
    _a = __read([elems[j], elems[i]], 2), elems[i] = _a[0], elems[j] = _a[1];
};
// Heap algorithm
var generate = function (A, perms, k) {
    if (k === void 0) { k = A.length; }
    if (k === 1) {
        perms.push(__spread(A));
        return;
    }
    generate(A, perms, k - 1);
    for (var i = 0; i < k - 1; i++) {
        if (k % 2 === 0) {
            exports.swap(A, i, k - 1);
        }
        else {
            exports.swap(A, 0, k - 1);
        }
        generate(A, perms, k - 1);
    }
};
exports.permutations = function (elems) {
    var perms = [];
    generate(elems, perms);
    return perms;
};
// returns false if `elems` is already the last permutation in
// lexicographic order
exports.nextPermutation = function (elems) {
    var i = iters_1.findIndexRight(elems, function (_, i) { return elems[i] < elems[i + 1]; });
    if (i === -1)
        return false;
    var elems_i = elems[i];
    var j = iters_1.findIndexRight(elems, function (elems_j) { return elems_i < elems_j; });
    exports.swap(elems, i, j);
    iters_1.reverseRange(elems, i + 1, elems.length - 1);
    return true;
};
exports.prevPermutation = function (elems) {
    var i = iters_1.findIndexRight(elems, function (_, i) { return elems[i - 1] > elems[i]; });
    if (i === -1)
        return false;
    var j = iters_1.findIndexRight(elems, function (elems_j, j) { return j >= i && elems_j < elems[i - 1]; });
    exports.swap(elems, i - 1, j);
    iters_1.reverseRange(elems, i, elems.length - 1);
    return true;
};
function lexicographicPermutations(elems) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, __spread(elems)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                if (!exports.nextPermutation(elems)) return [3 /*break*/, 4];
                return [4 /*yield*/, __spread(elems)];
            case 3:
                _a.sent();
                return [3 /*break*/, 2];
            case 4: return [2 /*return*/];
        }
    });
}
exports.lexicographicPermutations = lexicographicPermutations;
function reverseLexicographicPermutations(elems) {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, __spread(elems)];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                if (!exports.prevPermutation(elems)) return [3 /*break*/, 4];
                return [4 /*yield*/, __spread(elems)];
            case 3:
                _a.sent();
                return [3 /*break*/, 2];
            case 4: return [2 /*return*/];
        }
    });
}
exports.reverseLexicographicPermutations = reverseLexicographicPermutations;
exports.nthPermutation = function (n, elems) {
    var copy = __spread(elems);
    for (var i = 0; i < n - 1; i++) {
        exports.nextPermutation(copy);
    }
    return copy;
};
// see https://projecteuler.net/overview=053
exports.binomial = function (n, k) {
    if (k > n - k) {
        k = n - k;
    }
    var res = 1;
    for (var i = 0; i <= k - 1; i++) {
        res = res * (n - i) / (i + 1);
    }
    return res;
};
var nextCombination = function (indices, n) {
    var k = indices.length;
    for (var i = k - 1; i >= 0; i--) {
        if (indices[i] < n - k + i + 1) {
            indices[i]++;
            for (var j = i + 1; j < k; j++) {
                indices[j] = indices[j - 1] + 1;
            }
            return true;
        }
    }
    return false;
};
function combinations(elems, k) {
    var comb, items, n;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                comb = __spread(iters_1.range(k - 1));
                items = __spread(elems);
                n = items.length - 1;
                return [4 /*yield*/, comb.map(function (i) { return items[i]; })];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2:
                if (!nextCombination(comb, n)) return [3 /*break*/, 4];
                return [4 /*yield*/, comb.map(function (i) { return items[i]; })];
            case 3:
                _a.sent();
                return [3 /*break*/, 2];
            case 4: return [2 /*return*/];
        }
    });
}
exports.combinations = combinations;
;
