"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavService = void 0;
var FavService = /** @class */ (function () {
    function FavService(favRepository) {
        this.favRepository = favRepository;
        this.favRepository = favRepository;
    }
    FavService.prototype.findFavoriteSp = function (UserId, spId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.favRepository.findFavoriteSp(UserId, spId)];
            });
        });
    };
    FavService.prototype.updateFavoriteSp = function (favorite) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.favRepository.updateFavoriteSp(favorite)];
            });
        });
    };
    FavService.prototype.createFavoriteSp = function (favorite) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.favRepository.createFavoriteSp(favorite)];
            });
        });
    };
    FavService.prototype.findByEmail = function (Email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.favRepository.findByEmail(Email)];
            });
        });
    };
    FavService.prototype.findServiceById = function (UserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.favRepository.findServiceById(UserId)];
            });
        });
    };
    FavService.prototype.findAllSPWorkedWithCustInPast = function (UserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.favRepository.findAllSPWorkedWithCustInPast(UserId)];
            });
        });
    };
    FavService.prototype.updateBlockedSp = function (blocked) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.favRepository.updateBlockedSp(blocked)];
            });
        });
    };
    FavService.prototype.findAllSpIdWorkedWithCustInPast = function (service) {
        var spId = [];
        for (var s in service) {
            if (service[s].Status === 2 && service[s].ServiceProviderId != null) {
                spId.push(service[s].ServiceProviderId);
            }
        }
        return spId;
    };
    FavService.prototype.findAllSpWorkedWithCust = function (UserId) {
        return __awaiter(this, void 0, void 0, function () {
            var cust, service, _a, _b, _i, s, user, userId, users;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        cust = [];
                        return [4 /*yield*/, this.favRepository.findAllSPWorkedWithCustInPast(UserId)];
                    case 1:
                        service = _c.sent();
                        if (!service) return [3 /*break*/, 5];
                        if (!(service.length > 0)) return [3 /*break*/, 5];
                        _a = [];
                        for (_b in service)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        s = _a[_i];
                        return [4 /*yield*/, this.favRepository.findByUId(service[s].UserId)];
                    case 3:
                        user = _c.sent();
                        if (user) {
                            cust.push({
                                UserId: user.UserId,
                                Name: user.FirstName + " " + user.LastName,
                                Avatar: user.UserProfilePicture,
                                Email: user.Email,
                                ZipCode: user.ZipCode
                            });
                        }
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        userId = cust.map(function (o) { return o.UserId; });
                        users = cust.filter(function (_a, index) {
                            var UserId = _a.UserId;
                            return !userId.includes(UserId, index + 1);
                        });
                        return [2 /*return*/, users];
                }
            });
        });
    };
    ;
    return FavService;
}());
exports.FavService = FavService;
