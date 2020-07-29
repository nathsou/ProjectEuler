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
exports.__esModule = true;
exports.primitivePythagorianTriplets = exports.countPythagorianTripletsSummingTo = exports.isPythagorianTripletPrimitive = exports.genPythagorianTriplet = void 0;
var iters_1 = require("./iters");
var math_1 = require("./math");
// https://en.wikipedia.org/wiki/Pythagorean_triple
exports.genPythagorianTriplet = function (n, m) {
    var a = Math.pow(m, 2) - Math.pow(n, 2);
    var b = 2 * m * n;
    var c = Math.pow(m, 2) + Math.pow(n, 2);
    if (a < b) {
        return [a, b, c];
    }
    return [b, a, c];
};
exports.isPythagorianTripletPrimitive = function (triplet) {
    return math_1.gcd(triplet) === 1;
};
// if [a, b, c] is a pythagorean triplet, then [ka, kb, kc] with k in N is also
// a pythagorean triplet.
// if sum(triplet) = d where d is a divisor of n, then [ka, kb, kc] with k = (n / d)
// will generate a triplet whose sum is n.
// therefore to count triplets whose sum is n, we can simply count how many of n's divisors
// can be obtained as the sum of primitive triplets
exports.countPythagorianTripletsSummingTo = function (n, primitiveTripletSums) {
    return iters_1.count(math_1.divisors(n), function (d) { return primitiveTripletSums.has(d); });
};
function primitivePythagorianTriplets(maxSum) {
    var max, n, m, t;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                max = Math.ceil((-2 + Math.sqrt(4 + 8 * maxSum)) / 4);
                n = 0;
                _a.label = 1;
            case 1:
                if (!(n <= max)) return [3 /*break*/, 6];
                m = n + 1;
                _a.label = 2;
            case 2:
                if (!(m <= max)) return [3 /*break*/, 5];
                t = exports.genPythagorianTriplet(n, m);
                if (!exports.isPythagorianTripletPrimitive(t)) return [3 /*break*/, 4];
                return [4 /*yield*/, t];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                m++;
                return [3 /*break*/, 2];
            case 5:
                n++;
                return [3 /*break*/, 1];
            case 6: return [2 /*return*/];
        }
    });
}
exports.primitivePythagorianTriplets = primitivePythagorianTriplets;
