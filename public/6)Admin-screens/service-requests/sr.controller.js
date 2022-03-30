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
exports.srController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var mailgun_js_1 = __importDefault(require("mailgun-js"));
require('dotenv').config();
var DOMAIN = process.env.DOMAIN;
var mg = mailgun_js_1.default({ apiKey: process.env.API_KEY, domain: DOMAIN });
var srController = /** @class */ (function () {
    function srController(srService) {
        var _this = this;
        this.srService = srService;
        this.serviceRequests = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token, filterData;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.headers.authorization || req.header('auth');
                filterData = req.body;
                if (token) {
                    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (error, user) {
                        if (error) {
                            return res.status(400).json("Invalid Login!");
                        }
                        else {
                            return _this.srService
                                .findUser(user.Email)
                                .then(function (findUser) {
                                if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 3) {
                                    return _this.srService
                                        .findAllService()
                                        .then(function (sr) { return __awaiter(_this, void 0, void 0, function () {
                                        var serviceArray;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(sr && sr.length > 0)) return [3 /*break*/, 4];
                                                    if (!req.body) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, this.srService.findService(sr, filterData)];
                                                case 1:
                                                    serviceArray = _a.sent();
                                                    if (serviceArray && serviceArray.length > 0) {
                                                        return [2 /*return*/, res.status(200).json(serviceArray)];
                                                    }
                                                    else {
                                                        return [2 /*return*/, res.status(200).json("No Filtered service exists!")];
                                                    }
                                                    return [3 /*break*/, 3];
                                                case 2: return [2 /*return*/, res.status(200).json(sr)];
                                                case 3: return [3 /*break*/, 5];
                                                case 4: return [2 /*return*/, res.status(400).json("No service exists!")];
                                                case 5: return [2 /*return*/];
                                            }
                                        });
                                    }); })
                                        .catch(function (error) {
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(400).json("You are not Admin, Please login with your Admin account!");
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
        this.rescheduleIfTimeSlotNotConflicts = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
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
                            if (req.params.ServiceRequestId) {
                                return _this.srService
                                    .findUser(user.Email)
                                    .then(function (finduser) {
                                    if (finduser && finduser.UserTypeId === 3) {
                                        var date_1 = req.body.ServiceStartDate;
                                        return _this.srService
                                            .findBySId(+req.params.ServiceRequestId)
                                            .then(function (serviceReq) {
                                            if (!serviceReq) {
                                                return res.status(404).json("No service found with this Id!");
                                            }
                                            if ((serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.Status) === 2) {
                                                return res.status(400).json("Service is completed, you can't reschedule it!");
                                            }
                                            else {
                                                if ((new Date(req.body.ServiceStartDate).getTime() === new Date(serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.ServiceStartDate).getTime()) && (req.body.ServiceStartTime === (serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.ServiceStartTime))) {
                                                    return _this.srService
                                                        .updateAddress(+req.params.ServiceRequestId, req.body.Address.AddressLine1, req.body.Address.AddressLine2, req.body.Address.PostalCode, req.body.Address.City)
                                                        .then(function (address) { return __awaiter(_this, void 0, void 0, function () {
                                                        var email, e, sendmail;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, this.srService.getEmails(serviceReq)];
                                                                case 1:
                                                                    email = _a.sent();
                                                                    for (e in email) {
                                                                        sendmail = this.srService.rescheduleWithAddress(date_1, req.body.ServiceStartTime, email[e], serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.ServiceId, req.body.Address.AddressLine1, req.body.Address.AddressLine2, req.body.Address.PostalCode, req.body.Address.City);
                                                                        mg.messages().send(sendmail);
                                                                    }
                                                                    if ((serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.Status) === 3) {
                                                                        return [2 /*return*/, this.srService
                                                                                .updateStatus(+req.params.ServiceRequestId)
                                                                                .then(function (status) {
                                                                                return res.status(200).json("Service Request with Service Id #" + (serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.ServiceId) + " rescheduled successfully!");
                                                                            })
                                                                                .catch(function (error) {
                                                                                return res.status(500).json({ error: error });
                                                                            })];
                                                                    }
                                                                    return [2 /*return*/, res.status(200).json("Service Request with Service Id #" + (serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.ServiceId) + " rescheduled successfully!")];
                                                            }
                                                        });
                                                    }); })
                                                        .catch(function (error) {
                                                        console.log(error);
                                                        return res.status(500).json({ error: error });
                                                    });
                                                }
                                                else {
                                                    req.body.totalHour = (serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.ServiceHours) + (serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.ExtraHours);
                                                    if (serviceReq === null || serviceReq === void 0 ? void 0 : serviceReq.ServiceProviderId) {
                                                        req.body.ServiceProviderId = serviceReq.ServiceProviderId;
                                                        return _this.srService
                                                            .findByAllSPId(serviceReq.ServiceProviderId)
                                                            .then(function (serviceReq) { return __awaiter(_this, void 0, void 0, function () {
                                                            var _a, startDate, isMatch, startTime, endTime, ServiceId;
                                                            return __generator(this, function (_b) {
                                                                switch (_b.label) {
                                                                    case 0:
                                                                        if (!serviceReq) return [3 /*break*/, 2];
                                                                        return [4 /*yield*/, this.srService
                                                                                .SPHasFutureSameDateTime(req.body.ServiceStartDate, serviceReq, req.body.totalHour, req.body.ServiceStartTime)];
                                                                    case 1:
                                                                        _a = _b.sent(), startDate = _a.startDate, isMatch = _a.isMatch, startTime = _a.startTime, endTime = _a.endTime, ServiceId = _a.ServiceId;
                                                                        if (isMatch) {
                                                                            return [2 /*return*/, res.status(200).json("Another service request of ServiceId #" + ServiceId + " has been assigned to the service provider on " + startDate + " from " + startTime +
                                                                                    " to " + endTime + ". Either choose another date or pick up a different time slot.")];
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
                                                        }); });
                                                    }
                                                    else {
                                                        next();
                                                    }
                                                }
                                            }
                                        })
                                            .catch(function (error) {
                                            console.log(error);
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {
                                        return res.status(404).json("User not exists!");
                                    }
                                })
                                    .catch(function (error) {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(404).json("ServiceId not exists!");
                            }
                        }
                    });
                }
                else {
                    return [2 /*return*/, res.status(400).json("Some error occurred!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.RescheduleWithAddress = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var date;
            var _this = this;
            return __generator(this, function (_a) {
                date = req.body.ServiceStartDate;
                return [2 /*return*/, this.srService
                        .findBySId(+req.params.ServiceRequestId)
                        .then(function (service) {
                        if (service) {
                            return _this.srService
                                .updateService(+req.params.ServiceRequestId, new Date(date), req.body.ServiceStartTime)
                                .then(function (s) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, this.srService
                                            .updateAddress(+req.params.ServiceRequestId, req.body.Address.AddressLine1, req.body.Address.AddressLine2, req.body.Address.PostalCode, req.body.Address.City)
                                            .then(function (address) { return __awaiter(_this, void 0, void 0, function () {
                                            var email, e, sendmail;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, this.srService.getEmails(service)];
                                                    case 1:
                                                        email = _a.sent();
                                                        for (e in email) {
                                                            sendmail = this.srService.rescheduleWithAddress(date, req.body.ServiceStartTime, email[e], service === null || service === void 0 ? void 0 : service.ServiceId, req.body.Address.AddressLine1, req.body.Address.AddressLine2, req.body.Address.PostalCode, req.body.Address.City);
                                                            mg.messages().send(sendmail);
                                                        }
                                                        if ((service === null || service === void 0 ? void 0 : service.Status) === 3) {
                                                            return [2 /*return*/, this.srService
                                                                    .updateStatus(+req.params.ServiceRequestId)
                                                                    .then(function (status) {
                                                                    return res.status(200).json("Service Request with Service Id #" + (service === null || service === void 0 ? void 0 : service.ServiceId) + " rescheduled successfully!");
                                                                })
                                                                    .catch(function (error) {
                                                                    return res.status(500).json({ error: error });
                                                                })];
                                                        }
                                                        return [2 /*return*/, res.status(200).json("Service Request with Service Id #" + (service === null || service === void 0 ? void 0 : service.ServiceId) + " rescheduled successfully!")];
                                                }
                                            });
                                        }); })
                                            .catch(function (error) {
                                            console.log(error);
                                            return res.status(500).json({ error: error });
                                        })];
                                });
                            }); })
                                .catch(function (error) {
                                console.log(error);
                                return res.status(500).json({ error: error });
                            });
                        }
                        else {
                            return res.status(404).json("No service exists!");
                        }
                    })
                        .catch(function (error) {
                        return res.status(500).json({ error: error });
                    })];
            });
        }); };
        this.cancleServiceRequest = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.srService
                                .findUser(user.Email)
                                .then(function (user) {
                                if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 3) {
                                    return _this.srService
                                        .findByServiceId(+req.params.ServiceId)
                                        .then(function (service) {
                                        if ((service === null || service === void 0 ? void 0 : service.Status) === 3) {
                                            return res.status(400).json("Service request already cancelled!");
                                        }
                                        else {
                                            if ((service === null || service === void 0 ? void 0 : service.Status) !== 2) {
                                                for (var s in service) {
                                                    return _this.srService
                                                        .updateServiceStatus(+req.params.ServiceId)
                                                        .then(function (serviceRequest) { return __awaiter(_this, void 0, void 0, function () {
                                                        var email, e, sendmail;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0:
                                                                    if (!(serviceRequest && serviceRequest.length > 0)) return [3 /*break*/, 2];
                                                                    return [4 /*yield*/, this.srService.getEmails(service)];
                                                                case 1:
                                                                    email = _a.sent();
                                                                    for (e in email) {
                                                                        sendmail = this.srService.cancleService(email[e], service.ServiceId);
                                                                        mg.messages().send(sendmail);
                                                                    }
                                                                    return [2 /*return*/, res.status(200).json("Service Request with Service Id #" + service.ServiceId + " cancelled successfully!")];
                                                                case 2: return [2 /*return*/, res.status(400).json("Cancellation of service is failed!")];
                                                            }
                                                        });
                                                    }); })
                                                        .catch(function (error) {
                                                        return res.status(500).json({ error: error });
                                                    });
                                                }
                                            }
                                            else {
                                                return res.status(400).json("Service Request is completed, You can't cancle it!");
                                            }
                                        }
                                    })
                                        .catch(function (error) {
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(400).json("You are not Admin, Please login with you Admin account!");
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
        this.RefundAmount = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.srService
                                .findUser(user.Email)
                                .then(function (user) {
                                if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 3) {
                                    return _this.srService
                                        .findByServiceId(+req.params.ServiceId)
                                        .then(function (service) { return __awaiter(_this, void 0, void 0, function () {
                                        var amount_1;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(service && (service === null || service === void 0 ? void 0 : service.Status) === 2)) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, this.srService.calculateAmount(service.TotalCost, req.body.Amount)];
                                                case 1:
                                                    amount_1 = _a.sent();
                                                    if (+service.TotalCost > +amount_1) {
                                                        return [2 /*return*/, this.srService
                                                                .updateRefund(+req.params.ServiceId, +amount_1)
                                                                .then(function (refund) {
                                                                if (refund) {
                                                                    return res.status(200).json({
                                                                        PaidAmount: service.TotalCost + " €",
                                                                        RefundedAmount: amount_1 + " €",
                                                                        InBalanceAmount: ((+service.TotalCost) - (+amount_1)) + " €"
                                                                    });
                                                                }
                                                                else {
                                                                    return res.status(400).json("Failure in Refunding Amount!");
                                                                }
                                                            })
                                                                .catch(function (error) {
                                                                return res.status(500).json({ error: error });
                                                            })];
                                                    }
                                                    else {
                                                        return [2 /*return*/, res.status(400).json("Refund Amount must be less than Paid Amount!")];
                                                    }
                                                    return [3 /*break*/, 3];
                                                case 2: return [2 /*return*/, res.status(404).json("Service not found or Service is not completed!")];
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); })
                                        .catch(function (error) {
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(400).json("You are not Admin, Please login with you Admin account!");
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
        this.srService = srService;
    }
    return srController;
}());
exports.srController = srController;
