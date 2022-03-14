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
exports.rAndbService = void 0;
var rAndbService = /** @class */ (function () {
    function rAndbService(rAndbRepository) {
        this.rAndbRepository = rAndbRepository;
        this.rAndbRepository = rAndbRepository;
    }
    rAndbService.prototype.findUser = function (Email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.rAndbRepository.findUser(Email)];
            });
        });
    };
    rAndbService.prototype.getAllRatings = function (RatingTo) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.rAndbRepository.getAllRatings(RatingTo)];
            });
        });
    };
    rAndbService.prototype.findServiceBySpId = function (ServiceProviderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.rAndbRepository.findServiceBySpId(ServiceProviderId)];
            });
        });
    };
    rAndbService.prototype.findAllcustIdSpHadWorkedFor = function (service) {
        var custId = [];
        for (var s in service) {
            if (service[s].Status === 2 && service[s].UserId != null) {
                custId.push(service[s].UserId);
            }
        }
        return custId;
    };
    rAndbService.prototype.findAllcustSpHadWorkedFor = function (ServiceProviderId) {
        return __awaiter(this, void 0, void 0, function () {
            var cust, service, _a, _b, _i, s, user, userId, users;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        cust = [];
                        return [4 /*yield*/, this.rAndbRepository.findAllcustSpHadWorkedFor(ServiceProviderId)];
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
                        return [4 /*yield*/, this.rAndbRepository.findByUId(service[s].UserId)];
                    case 3:
                        user = _c.sent();
                        if (user) {
                            cust.push({
                                UserId: user.UserId,
                                Name: user.FirstName + " " + user.LastName,
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
    rAndbService.prototype.findBlockedCust = function (UserId, custId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.rAndbRepository.findBlockedCust(UserId, custId)];
            });
        });
    };
    rAndbService.prototype.updateBlockedCust = function (blocked) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.rAndbRepository.updateBlockedCust(blocked)];
            });
        });
    };
    rAndbService.prototype.createBlockedCust = function (favorite) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.rAndbRepository.createBlockedCust(favorite)];
            });
        });
    };
    rAndbService.prototype.Ratings = function (rating) {
        return __awaiter(this, void 0, void 0, function () {
            var details, _loop_1, this_1, time, _a, _b, _i, r;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        details = [];
                        _loop_1 = function (r) {
                            var service, Time, Extra, StartTime, total, userdetails;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0: return [4 /*yield*/, this_1.rAndbRepository.findService(rating[r].ServiceRequestId)];
                                    case 1:
                                        service = _d.sent();
                                        Time = (service === null || service === void 0 ? void 0 : service.ServiceHours);
                                        Extra = (service === null || service === void 0 ? void 0 : service.ExtraHours);
                                        StartTime = ((service === null || service === void 0 ? void 0 : service.ServiceStartTime).toString().split(':'));
                                        total = ((Time + Extra).toString()).split('.');
                                        if (StartTime[1] == "30") {
                                            if (total[1] == '5') {
                                                time = (((+StartTime[0]) + (+total[0]) + 1).toString()) + ":00";
                                            }
                                            else {
                                                time = (((+StartTime[0]) + (+total[0])).toString()) + ":30";
                                            }
                                        }
                                        else {
                                            if (total[1] == '5') {
                                                time = (((+StartTime[0]) + (+total[0])).toString()) + ":30";
                                            }
                                            else {
                                                time = (((+StartTime[0]) + (+total[0])).toString()) + ":00";
                                            }
                                        }
                                        service === null || service === void 0 ? void 0 : service.update({ EndTime: time });
                                        return [4 /*yield*/, this_1.rAndbRepository
                                                .findByUId(rating[r].RatingFrom)
                                                .then(function (user) {
                                                if (service) {
                                                    if (user) {
                                                        details.push({
                                                            ServiceID: service.ServiceId,
                                                            ServiceStartDate: service.ServiceStartDate,
                                                            Duration: service.ServiceStartTime + " - " + time,
                                                            Name: user.FirstName + " " + user.LastName,
                                                            Comments: rating[r].Comments,
                                                            Ratings: rating[r].Ratings
                                                        });
                                                    }
                                                }
                                            })];
                                    case 2:
                                        userdetails = _d.sent();
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _a = [];
                        for (_b in rating)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 4];
                        r = _a[_i];
                        return [5 /*yield**/, _loop_1(r)];
                    case 2:
                        _c.sent();
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, details];
                }
            });
        });
    };
    return rAndbService;
}());
exports.rAndbService = rAndbService;
