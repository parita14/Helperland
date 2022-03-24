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
exports.ServiceController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mailgun_js_1 = __importDefault(require("mailgun-js"));
require('dotenv').config();
var DOMAIN = process.env.DOMAIN;
var mg = mailgun_js_1.default({ apiKey: process.env.API_KEY, domain: DOMAIN });
var ServiceController = /** @class */ (function () {
    function ServiceController(serviceService) {
        var _this = this;
        this.serviceService = serviceService;
        this.newServices = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.serviceService
                                .findUser(user.Email)
                                .then(function (findUser) {
                                if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 2) {
                                    return _this.serviceService
                                        .getAllFutureRequest(findUser.ZipCode, findUser.UserId)
                                        .then(function (service) { return __awaiter(_this, void 0, void 0, function () {
                                        var serviceDetails;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(service && service.length > 0)) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, this.serviceService.serviceReq(service)];
                                                case 1:
                                                    serviceDetails = _a.sent();
                                                    if (serviceDetails.length > 0) {
                                                        return [2 /*return*/, res.status(200).json(serviceDetails)];
                                                    }
                                                    else {
                                                        return [2 /*return*/, res.status(404).json("Service not exists!")];
                                                    }
                                                    return [3 /*break*/, 3];
                                                case 2: return [2 /*return*/, res.status(400).json("No service exists!")];
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); })
                                        .catch(function (error) {
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(400).json("You are not SP, Please login with your SP account!");
                                }
                            })
                                .catch(function (error) {
                                return res.status(500).json({ error: error });
                            });
                        }
                    });
                }
                else {
                    return [2 /*return*/, res.status(400).json("Some error occurred!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.getServiceById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.serviceService
                                .findUser(user.Email)
                                .then(function (findUser) {
                                if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 2) {
                                    return _this.serviceService
                                        .getServiceById(+req.params.ServiceId, findUser.ZipCode)
                                        .then(function (service) { return __awaiter(_this, void 0, void 0, function () {
                                        var details, userdetails, addressdetails, extradetails, Time, Extra, StartTime, total, time;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    details = [];
                                                    if (!service) return [3 /*break*/, 6];
                                                    return [4 /*yield*/, this.serviceService.findUserById(service.UserId)];
                                                case 1:
                                                    userdetails = _a.sent();
                                                    return [4 /*yield*/, this.serviceService.findAddressById(service.ServiceRequestId)];
                                                case 2:
                                                    addressdetails = _a.sent();
                                                    return [4 /*yield*/, this.serviceService
                                                            .findExtraById(service.ServiceRequestId)
                                                            .then(function (extra) {
                                                            var ExtraService = [];
                                                            if (extra) {
                                                                for (var i = 0; i < extra.length; i++) {
                                                                    var extras = extra[i].ServiceExtraId;
                                                                    ExtraService.push(extras);
                                                                }
                                                                return ExtraService;
                                                            }
                                                        })];
                                                case 3:
                                                    extradetails = _a.sent();
                                                    Time = (service.ServiceHours);
                                                    Extra = (service.ExtraHours);
                                                    StartTime = ((service.ServiceStartTime).toString().split(':'));
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
                                                    service.update({ EndTime: time });
                                                    if (!userdetails) return [3 /*break*/, 5];
                                                    if (!addressdetails) return [3 /*break*/, 5];
                                                    return [4 /*yield*/, details.push({
                                                            ServiceStartDate: service.ServiceStartDate,
                                                            ServiceTime: service.ServiceStartTime + " - " + time,
                                                            Duration: service.ServiceHours + service.ExtraHours,
                                                            ServiceID: service.ServiceId,
                                                            Extras: extradetails,
                                                            Payment: service.TotalCost + " €",
                                                            CustomerName: userdetails.FirstName + " " + userdetails.LastName,
                                                            ServiceAddress: addressdetails.AddressLine1 + ", " + addressdetails.AddressLine2 + ", " + addressdetails.City + ", " + addressdetails.PostalCode,
                                                            Comments: service.Comments,
                                                        })];
                                                case 4:
                                                    _a.sent();
                                                    _a.label = 5;
                                                case 5:
                                                    if (details.length > 0) {
                                                        return [2 /*return*/, res.status(200).json(details)];
                                                    }
                                                    else {
                                                        return [2 /*return*/, res.status(404).json("Service not exists!")];
                                                    }
                                                    return [3 /*break*/, 7];
                                                case 6: return [2 /*return*/, res.status(404).json("No service request detail found with this service ID!")];
                                                case 7: return [2 /*return*/];
                                            }
                                        });
                                    }); })
                                        .catch(function (error) {
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(400).json("You are not SP, Please login with your SP account!");
                                }
                            })
                                .catch(function (error) {
                                return res.status(500).json({ error: error });
                            });
                        }
                    });
                }
                else {
                    return [2 /*return*/, res.status(400).json("Some error occurred!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.acceptValidService = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.serviceService
                                .findUser(user.Email)
                                .then(function (findUser) {
                                if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 2) {
                                    return _this.serviceService
                                        .findServiceById(+req.params.ServiceId, findUser.ZipCode)
                                        .then(function (service) {
                                        if (service) {
                                            if (service.Status === 1 && service.ServiceProviderId === null) {
                                                req.body.ZipCode = service.ZipCode;
                                                return _this.serviceService
                                                    .findServiceOfHelper(findUser.UserId)
                                                    .then(function (serviceReq) { return __awaiter(_this, void 0, void 0, function () {
                                                    var _a, srId, matched;
                                                    return __generator(this, function (_b) {
                                                        switch (_b.label) {
                                                            case 0:
                                                                req.body.totalHour = service.ExtraHours + service.ServiceHours;
                                                                if (!serviceReq) return [3 /*break*/, 2];
                                                                return [4 /*yield*/, this.serviceService.helperHasFutureSameDateAndTime(service.ServiceStartDate, serviceReq, req.body.totalHour, service.ServiceStartTime)];
                                                            case 1:
                                                                _a = _b.sent(), srId = _a.srId, matched = _a.matched;
                                                                if (matched) {
                                                                    return [2 /*return*/, res.status(200).json("Another Service Request of ServiceId #" + srId + " has already been assigned which has time overlap with service request. You can't pick this one!")];
                                                                }
                                                                else {
                                                                    next();
                                                                }
                                                                return [3 /*break*/, 3];
                                                            case 2:
                                                                next();
                                                                _b.label = 3;
                                                            case 3: return [2 /*return*/];
                                                        }
                                                    });
                                                }); })
                                                    .catch(function (error) {
                                                    return res.status(500).json({ error: error });
                                                });
                                            }
                                            else if (service.Status === 4 && service.ServiceProviderId === findUser.UserId) {
                                                return res.status(400).json("Service Request of " + service.ServiceId + " is already accepted by you!");
                                            }
                                            else if (service.Status === 4 && service.ServiceProviderId !== findUser.UserId) {
                                                return res.status(400).json("Service is assigned to another service provider!");
                                            }
                                            else {
                                                return res.status(404).json("No service exists!");
                                            }
                                        }
                                        else {
                                            return res.status(404).json("No service exists!");
                                        }
                                    })
                                        .catch(function (error) {
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(400).json("You are not SP, Please login with your SP account!");
                                }
                            })
                                .catch(function (error) {
                                return res.status(500).json({ error: error });
                            });
                        }
                    });
                }
                else {
                    return [2 /*return*/, res.status(404).json("No token exists!!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.acceptService = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.serviceService
                                .findUser(user.Email)
                                .then(function (findUser) {
                                if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 2) {
                                    return _this.serviceService
                                        .updateServiceStatus(+req.params.ServiceId, req.body.ZipCode, findUser.UserId)
                                        .then(function (s) {
                                        if (s) {
                                            return _this.serviceService
                                                .findAllSP(req.body.ZipCode)
                                                .then(function (sp) { return __awaiter(_this, void 0, void 0, function () {
                                                var users, email, _a, _b, _i, e, serviceReq;
                                                return __generator(this, function (_c) {
                                                    switch (_c.label) {
                                                        case 0:
                                                            if (!sp) return [3 /*break*/, 6];
                                                            users = sp.filter(function (s) {
                                                                return findUser.UserId !== s.UserId;
                                                            });
                                                            return [4 /*yield*/, this.serviceService.getEmail(users, req.body)];
                                                        case 1:
                                                            email = _c.sent();
                                                            _a = [];
                                                            for (_b in email)
                                                                _a.push(_b);
                                                            _i = 0;
                                                            _c.label = 2;
                                                        case 2:
                                                            if (!(_i < _a.length)) return [3 /*break*/, 6];
                                                            e = _a[_i];
                                                            return [4 /*yield*/, this.serviceService.newservice(email[e], +req.params.ServiceId)];
                                                        case 3:
                                                            serviceReq = _c.sent();
                                                            return [4 /*yield*/, mg.messages().send(serviceReq)];
                                                        case 4:
                                                            _c.sent();
                                                            _c.label = 5;
                                                        case 5:
                                                            _i++;
                                                            return [3 /*break*/, 2];
                                                        case 6: return [2 /*return*/, res.status(200).json("Service Request is accepted by you successfully!")];
                                                    }
                                                });
                                            }); })
                                                .catch(function (error) {
                                                return res.status(500).json({ error: error });
                                            });
                                        }
                                        else {
                                            return res.status(400).json("Error in accepting service!");
                                        }
                                    })
                                        .catch(function (error) {
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(400).json("You are not SP, Please login with your SP account!");
                                }
                            })
                                .catch(function (error) {
                                return res.status(500).json({ error: error });
                            });
                        }
                    });
                }
                else {
                    return [2 /*return*/, res.status(404).json("No token exists!!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.serviceService = serviceService;
    }
    return ServiceController;
}());
exports.ServiceController = ServiceController;
