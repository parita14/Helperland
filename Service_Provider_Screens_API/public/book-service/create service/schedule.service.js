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
exports.ScheduleService = void 0;
var ScheduleService = /** @class */ (function () {
    function ScheduleService(scheduleRepository) {
        this.scheduleRepository = scheduleRepository;
        this.scheduleRepository = scheduleRepository;
    }
    ScheduleService.prototype.findByZipCode = function (ZipCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.scheduleRepository.findByZipCode(ZipCode)];
            });
        });
    };
    ScheduleService.prototype.findByEmail = function (Email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.scheduleRepository.findByEmail(Email)];
            });
        });
    };
    ScheduleService.prototype.scheduleService = function (ServiceRequest) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.scheduleRepository.scheduleService(ServiceRequest)];
            });
        });
    };
    ScheduleService.prototype.getSP = function (ZipCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.scheduleRepository.getSP(ZipCode)];
            });
        });
    };
    ScheduleService.prototype.serviceRequest = function (Email, ServiceId) {
        var data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'New Service Request',
            html: "<html>\n            <body>\n            <h2>New Service Request Created of Service Id #".concat(ServiceId, "!</h2>\n            <p>Logged in to your account to accept Service Request.</p>\n            </body></html>")
        };
        return data;
    };
    ScheduleService.prototype.serviceForSP = function (Email, ServiceId) {
        var data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'New Service Request',
            html: "<html>\n            <body>\n            <h2>New Service Request Created by Customer of Service Id #".concat(ServiceId, "!</h2>\n            <p>This is directly assigned to you!</p>\n            </body></html>")
        };
        return data;
    };
    ScheduleService.prototype.findAddressEmail = function (Email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.scheduleRepository.findAddressEmail(Email)];
            });
        });
    };
    ScheduleService.prototype.getServiceAddresses = function (Email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.scheduleRepository.getServiceAddresses(Email)];
            });
        });
    };
    ScheduleService.prototype.createFAndB = function (FAndB) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.scheduleRepository.createFAndB(FAndB)];
            });
        });
    };
    ScheduleService.prototype.getFAndB = function (UserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.scheduleRepository.getFAndB(UserId)];
            });
        });
    };
    ScheduleService.prototype.findUserById = function (UserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.scheduleRepository.findUserById(UserId)];
            });
        });
    };
    ScheduleService.prototype.findById = function (UserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.scheduleRepository.findById(UserId)];
            });
        });
    };
    ScheduleService.prototype.getTargetUser = function (user, ZipCode) {
        return __awaiter(this, void 0, void 0, function () {
            var spId, favSpDetail, u, blockedSp, favSp, _a, _b, _i, s, spDetail;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        spId = [];
                        favSpDetail = [];
                        for (u in user) {
                            spId.push(user[u].TargetUserId);
                        }
                        return [4 /*yield*/, this.scheduleRepository.findAllBlockedCustOfSp(spId)];
                    case 1:
                        blockedSp = _c.sent();
                        favSp = user.filter(function (a) { return !blockedSp.find(function (r) { return (r.UserId === a.TargetUserId && a.UserId === r.TargetUserId); }); });
                        _a = [];
                        for (_b in favSp)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        s = _a[_i];
                        return [4 /*yield*/, this.scheduleRepository.findSpById(favSp[s].TargetUserId)];
                    case 3:
                        spDetail = _c.sent();
                        if (spDetail && spDetail.ZipCode === ZipCode) {
                            favSpDetail.push({
                                ServiceProviderId: spDetail.UserId,
                                ServiceProviderName: spDetail.FirstName + " " + spDetail.LastName,
                                ProfilePicture: spDetail.UserProfilePicture
                            });
                        }
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, favSpDetail];
                }
            });
        });
    };
    ScheduleService.prototype.findSpById = function (UserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.scheduleRepository.findSpById(UserId)];
            });
        });
    };
    ScheduleService.prototype.findBlockedSp = function (UserId, sp) {
        return __awaiter(this, void 0, void 0, function () {
            var spId, s;
            return __generator(this, function (_a) {
                spId = [];
                for (s in sp) {
                    spId.push(sp[s].UserId);
                }
                return [2 /*return*/, this.scheduleRepository.findBlockedSp(UserId, spId)];
            });
        });
    };
    ScheduleService.prototype.removeBlockedSp = function (User, blockedSp) {
        var users = User.filter(function (u) {
            return blockedSp.every(function (s) {
                return s.TargetUserId !== u.UserId;
            });
        });
        return users;
    };
    ScheduleService.prototype.getEmail = function (User, body) {
        var Email = [];
        if (body.HasPets === true) {
            for (var u in User) {
                if (User[u].WorksWithPets === true)
                    Email.push(User[u].Email);
            }
        }
        else {
            for (var u in User) {
                Email.push(User[u].Email);
            }
        }
        return Email;
    };
    ScheduleService.prototype.findByTargetId = function (UserId, TargetUserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.scheduleRepository.findByTargetId(UserId, TargetUserId)];
            });
        });
    };
    ScheduleService.prototype.removeSPFromCust = function (UserId, SPs) {
        return __awaiter(this, void 0, void 0, function () {
            var spId, s, blockedCust, helper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        spId = [];
                        for (s in SPs) {
                            spId.push(SPs[s].UserId);
                        }
                        return [4 /*yield*/, this.scheduleRepository.findSPBlockedCust(UserId, spId)];
                    case 1:
                        blockedCust = _a.sent();
                        helper = SPs.filter(function (s) {
                            return !blockedCust.find(function (a) {
                                return a.UserId === s.UserId;
                            });
                        });
                        return [2 /*return*/, helper];
                }
            });
        });
    };
    return ScheduleService;
}());
exports.ScheduleService = ScheduleService;
