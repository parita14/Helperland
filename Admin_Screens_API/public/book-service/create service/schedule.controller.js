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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mailgun_js_1 = __importDefault(require("mailgun-js"));
require('dotenv').config();
var DOMAIN = process.env.DOMAIN;
var mg = mailgun_js_1.default({ apiKey: process.env.API_KEY, domain: DOMAIN });
var ScheduleController = /** @class */ (function () {
    function ScheduleController(scheduleService) {
        var _this = this;
        this.scheduleService = scheduleService;
        this.decodeToken = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.headers.authorization || req.header('auth');
                if (token) {
                    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (error, user) {
                        if (error) {
                            return res.status(400).json("Invalid Login!");
                        }
                        else {
                            req.body.ZipCode = user.ZipCode;
                            req.body.Email = user.Email;
                            return _this.scheduleService
                                .findByEmail(user.Email)
                                .then(function (user) {
                                if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 1) {
                                    next();
                                }
                                else {
                                    return res.status(400).json("You are not customer, try to login using customer account!");
                                }
                            })
                                .catch(function (error) {
                                return res.status(500).json({ error: error });
                            });
                        }
                    });
                }
                else {
                    return [2 /*return*/, res.status(400).json("Token not exists!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.createService = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                req.body.Status = 1;
                req.body.ServiceHourlyRate = 25;
                req.body.ExtraHours = req.body.ExtraService.length * 0.5;
                req.body.SubTotal = req.body.ServiceHourlyRate * req.body.ServiceHours;
                req.body.TotalCost = req.body.ExtraService.length * 12.5 + req.body.SubTotal;
                req.body.ServiceRequestAddress.Email = req.body.Email;
                req.body.ServiceRequestAddress.PostalCode = req.body.ZipCode;
                return [2 /*return*/, this.scheduleService
                        .findByEmail(req.body.Email)
                        .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                        var _a;
                        var _this = this;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (user) {
                                        if (user.UserTypeId === 1) {
                                            req.body.UserId = user.UserId;
                                            req.body.ModifiedBy = user.UserId;
                                        }
                                        else {
                                            return [2 /*return*/, res.status(404).json("You are not a Customer!")];
                                        }
                                    }
                                    else {
                                        return [2 /*return*/, res.status(404).json("No user exists with this email!")];
                                    }
                                    _a = req.body;
                                    return [4 /*yield*/, Math.floor(1000 + Math.random() * 9000)];
                                case 1:
                                    _a.ServiceId = _b.sent();
                                    return [2 /*return*/, this.scheduleService
                                            .scheduleService(req.body)
                                            .then(function (service) { return __awaiter(_this, void 0, void 0, function () {
                                            var _this = this;
                                            return __generator(this, function (_a) {
                                                if (service) {
                                                    if (service.ServiceProviderId) {
                                                        return [2 /*return*/, this.scheduleService
                                                                .findSpById(service.ServiceProviderId)
                                                                .then(function (helper) { return __awaiter(_this, void 0, void 0, function () {
                                                                var email;
                                                                return __generator(this, function (_a) {
                                                                    switch (_a.label) {
                                                                        case 0:
                                                                            if (!helper) return [3 /*break*/, 3];
                                                                            return [4 /*yield*/, this.scheduleService.serviceForSP(helper.Email, service.ServiceId)];
                                                                        case 1:
                                                                            email = _a.sent();
                                                                            return [4 /*yield*/, mg.messages().send(email)];
                                                                        case 2:
                                                                            _a.sent();
                                                                            return [3 /*break*/, 4];
                                                                        case 3: return [2 /*return*/, res.status(404).json("Service Provider not found!")];
                                                                        case 4: return [2 /*return*/, res.status(200).json({ message: "Booking has been successfully submitted!", ServiceId: service.ServiceId })];
                                                                    }
                                                                });
                                                            }); })
                                                                .catch(function (error) {
                                                                return res.status(500).json({ error: error });
                                                            })];
                                                    }
                                                    else {
                                                        return [2 /*return*/, this.scheduleService
                                                                .getSP(service.ZipCode)
                                                                .then(function (sp) { return __awaiter(_this, void 0, void 0, function () {
                                                                var SP_1;
                                                                var _this = this;
                                                                return __generator(this, function (_a) {
                                                                    switch (_a.label) {
                                                                        case 0:
                                                                            if (!(sp.length > 0)) return [3 /*break*/, 2];
                                                                            return [4 /*yield*/, this.scheduleService.removeSPFromCust(user.UserId, sp)];
                                                                        case 1:
                                                                            SP_1 = _a.sent();
                                                                            return [2 /*return*/, this.scheduleService.findBlockedSp(user.UserId, SP_1)
                                                                                    .then(function (blockSp) { return __awaiter(_this, void 0, void 0, function () {
                                                                                    var remove, email, _a, _b, _i, e, serviceReq;
                                                                                    return __generator(this, function (_c) {
                                                                                        switch (_c.label) {
                                                                                            case 0:
                                                                                                if (!blockSp) return [3 /*break*/, 7];
                                                                                                return [4 /*yield*/, this.scheduleService.removeBlockedSp(SP_1, blockSp)];
                                                                                            case 1:
                                                                                                remove = _c.sent();
                                                                                                return [4 /*yield*/, this.scheduleService.getEmail(remove, req.body)];
                                                                                            case 2:
                                                                                                email = _c.sent();
                                                                                                _a = [];
                                                                                                for (_b in email)
                                                                                                    _a.push(_b);
                                                                                                _i = 0;
                                                                                                _c.label = 3;
                                                                                            case 3:
                                                                                                if (!(_i < _a.length)) return [3 /*break*/, 7];
                                                                                                e = _a[_i];
                                                                                                return [4 /*yield*/, this.scheduleService.serviceRequest(email[e], service.ServiceId)];
                                                                                            case 4:
                                                                                                serviceReq = _c.sent();
                                                                                                return [4 /*yield*/, mg.messages().send(serviceReq)];
                                                                                            case 5:
                                                                                                _c.sent();
                                                                                                _c.label = 6;
                                                                                            case 6:
                                                                                                _i++;
                                                                                                return [3 /*break*/, 3];
                                                                                            case 7: return [2 /*return*/, res.status(200).json({ message: "Booking has been successfully submitted!", ServiceId: service.ServiceId })];
                                                                                        }
                                                                                    });
                                                                                }); })
                                                                                    .catch(function (error) {
                                                                                    return res.status(500).json({ error: error });
                                                                                })];
                                                                        case 2: return [2 /*return*/, res.status(404).json("No service provider found!")];
                                                                    }
                                                                });
                                                            }); })
                                                                .catch(function (error) {
                                                                return res.status(500).json({ error: error });
                                                            })];
                                                    }
                                                }
                                                else {
                                                    return [2 /*return*/, res.status(500).json("Error")];
                                                }
                                                return [2 /*return*/];
                                            });
                                        }); })
                                            .catch(function (error) {
                                            return res.status(500).json({ error: error });
                                        })];
                            }
                        });
                    }); })
                        .catch(function (error) {
                        return res.status(500).json({ error: error });
                    })];
            });
        }); };
        this.getServiceAddresses = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token, serviceAddress;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.headers.authorization || req.header('auth');
                serviceAddress = [];
                if (token) {
                    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (error, user) {
                        if (error) {
                            return res.status(400).json("Invalid Login!");
                        }
                        else {
                            return _this.scheduleService
                                .findAddressEmail(user.Email)
                                .then(function (address) {
                                if (!address) {
                                    return res.status(404).json("There is no address found with this email!");
                                }
                                else {
                                    return _this.scheduleService
                                        .getServiceAddresses(address.Email)
                                        .then(function (Address) { return __awaiter(_this, void 0, void 0, function () {
                                        var addressDetails;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(Address.length > 0)) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, this.scheduleService.serviceAddress(Address)];
                                                case 1:
                                                    addressDetails = _a.sent();
                                                    if (addressDetails.length > 0) {
                                                        return [2 /*return*/, res.status(200).json(addressDetails)];
                                                    }
                                                    else {
                                                        return [2 /*return*/, res.status(404).json("Address not exists!")];
                                                    }
                                                    return [3 /*break*/, 3];
                                                case 2: return [2 /*return*/, res.status(404).json("Service Request Address not found!")];
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); })
                                        .catch(function (error) {
                                        return res.status(500).json({ error: error });
                                    });
                                }
                            })
                                .catch(function (error) {
                                return res.status(500).json({ error: error });
                            });
                        }
                    });
                }
                else {
                    return [2 /*return*/, res.status(400).json("No token exists!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.createFAndB = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.headers.authorization || req.header('auth');
                if (token) {
                    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (error, user) {
                        if (error) {
                            return res.status(400).json("Invalid login!");
                        }
                        else {
                            return _this.scheduleService
                                .findByEmail(user.Email)
                                .then(function (userbyEmail) {
                                if (userbyEmail) {
                                    return _this.scheduleService
                                        .findUserById(userbyEmail === null || userbyEmail === void 0 ? void 0 : userbyEmail.UserId)
                                        .then(function (user) {
                                        if (user && user.UserTypeId === 1) {
                                            if (req.body.TargetUserId) {
                                                return _this.scheduleService
                                                    .findUserById(req.body.TargetUserId)
                                                    .then(function (sp) {
                                                    if ((sp === null || sp === void 0 ? void 0 : sp.UserTypeId) === 2) {
                                                        req.body.UserId = userbyEmail.UserId;
                                                        return _this.scheduleService
                                                            .createFAndB(req.body)
                                                            .then(function (user) {
                                                            return res.status(200).json(user);
                                                        })
                                                            .catch(function (error) {
                                                            return res.status(500).json({ error: error });
                                                        });
                                                    }
                                                    else {
                                                        return res.status(400).json("Choose correct Favourite Service Provider!");
                                                    }
                                                })
                                                    .catch(function (error) {
                                                    return res.status(500).json({ error: error });
                                                });
                                            }
                                            else {
                                                return res.status(400).json("Favourite Service Provider not found!");
                                            }
                                        }
                                        else {
                                            return res.status(404).json("User not exists!");
                                        }
                                    })
                                        .catch(function (error) {
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(404).json("User not exists!");
                                }
                            })
                                .catch(function (error) {
                                return res.status(500).json({ error: error });
                            });
                        }
                    });
                }
                else {
                    return [2 /*return*/, res.status(400).json("No token exists!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.getFAndB = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.headers.authorization || req.header('auth');
                if (token) {
                    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (error, finduser) {
                        if (error) {
                            return res.status(400).json("Invalid Login!");
                        }
                        else {
                            return _this.scheduleService
                                .findByEmail(finduser.Email)
                                .then(function (finduser) {
                                if (!finduser) {
                                    return res.status(404).json("No user found!");
                                }
                                else {
                                    return _this.scheduleService
                                        .getFAndB(finduser.UserId)
                                        .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                        var sp, favSP;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    sp = [];
                                                    if (!!user) return [3 /*break*/, 1];
                                                    return [2 /*return*/, res.status(404).json("No user found!")];
                                                case 1: return [4 /*yield*/, this.scheduleService.getTargetUser(user, finduser.ZipCode)];
                                                case 2:
                                                    favSP = _a.sent();
                                                    if (favSP.length > 0) {
                                                        return [2 /*return*/, res.status(200).json(favSP)];
                                                    }
                                                    else {
                                                        return [2 /*return*/, res.status(404).json("Favourite service provider not found!")];
                                                    }
                                                    _a.label = 3;
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); })
                                        .catch(function (error) {
                                        return res.status(500).json({ error: error });
                                    });
                                }
                            })
                                .catch(function (error) {
                                return res.status(500).json({ error: error });
                            });
                        }
                    });
                }
                else {
                    return [2 /*return*/, res.status(400).json("No token exists!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.scheduleService = scheduleService;
    }
    return ScheduleController;
}());
exports.ScheduleController = ScheduleController;
