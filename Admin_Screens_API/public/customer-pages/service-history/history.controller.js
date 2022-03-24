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
exports.HistoryController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
var exceljs_1 = __importDefault(require("exceljs"));
var HistoryController = /** @class */ (function () {
    function HistoryController(historyService) {
        var _this = this;
        this.historyService = historyService;
        this.history = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var serviceRequest, token;
            var _this = this;
            return __generator(this, function (_a) {
                serviceRequest = [];
                token = req.headers.authorization || req.header('auth');
                if (token) {
                    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (error, user) {
                        if (error) {
                            return res.status(400).json("Invalid Login!");
                        }
                        else {
                            return _this.historyService
                                .findUser(user.Email)
                                .then(function (user) {
                                if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 1) {
                                    return _this.historyService
                                        .getAllPastRequest(user.UserId)
                                        .then(function (service) { return __awaiter(_this, void 0, void 0, function () {
                                        var serviceDetails;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!service) return [3 /*break*/, 4];
                                                    if (!(service.length > 0)) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, this.historyService.serviceReq(service)];
                                                case 1:
                                                    serviceDetails = _a.sent();
                                                    if (serviceDetails.length > 0) {
                                                        return [2 /*return*/, res.status(200).json(serviceDetails)];
                                                    }
                                                    else {
                                                        return [2 /*return*/, res.status(404).json("Service not exists!")];
                                                    }
                                                    return [3 /*break*/, 3];
                                                case 2: return [2 /*return*/, res.status(400).json("No service exists!!")];
                                                case 3: return [3 /*break*/, 5];
                                                case 4: return [2 /*return*/, res.status(400).json("No service exists!!!")];
                                                case 5: return [2 /*return*/];
                                            }
                                        });
                                    }); })
                                        .catch(function (error) {
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(400).json("You are not Customer, Please login with you customer account!");
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
                            return _this.historyService
                                .findUser(user.Email)
                                .then(function (findUser) {
                                if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 1) {
                                    return _this.historyService
                                        .getServiceById(+req.params.ServiceId)
                                        .then(function (service) { return __awaiter(_this, void 0, void 0, function () {
                                        var Status, details, userdetails, addressdetails, extradetails, Time, Extra, StartTime, total, time;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    details = [];
                                                    if (!service) return [3 /*break*/, 6];
                                                    return [4 /*yield*/, this.historyService.findCustById(service.UserId)];
                                                case 1:
                                                    userdetails = _a.sent();
                                                    return [4 /*yield*/, this.historyService.findAddressById(service.ServiceRequestId)];
                                                case 2:
                                                    addressdetails = _a.sent();
                                                    return [4 /*yield*/, this.historyService
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
                                                    if (service.Status === 3) {
                                                        Status = 'Cancelled';
                                                    }
                                                    else if (service.Status === 2) {
                                                        Status = 'Completed';
                                                    }
                                                    else {
                                                        Status = null;
                                                    }
                                                    if (!userdetails) return [3 /*break*/, 5];
                                                    if (!addressdetails) return [3 /*break*/, 5];
                                                    return [4 /*yield*/, details.push({
                                                            ServiceStartDate: service.ServiceStartDate,
                                                            ServiceTime: service.ServiceStartTime + " - " + time,
                                                            Duration: service.ServiceHours + service.ExtraHours,
                                                            ServiceID: service.ServiceId,
                                                            Extras: extradetails,
                                                            Payment: service.TotalCost + " €",
                                                            ServiceAddress: addressdetails.AddressLine1 + ", " + addressdetails.AddressLine2 + ", " + addressdetails.City + ", " + addressdetails.PostalCode,
                                                            Phone: userdetails.Mobile,
                                                            Email: userdetails.Email,
                                                            Comments: service.Comments,
                                                            Status: Status
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
                                    return res.status(400).json("You are not Customer, Please login with your Customer account!");
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
        this.giveRatings = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.headers.authorization || req.header('auth');
                req.body.RatingDate = new Date();
                if (token) {
                    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (error, user) {
                        if (error) {
                            return res.status(400).json("Invalid Login!");
                        }
                        else {
                            return _this.historyService
                                .findUser(user.Email)
                                .then(function (user) {
                                if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 1) {
                                    return _this.historyService
                                        .getRatingsById(+req.params.ServiceRequestId)
                                        .then(function (rating) {
                                        if (rating) {
                                            return res.status(400).json("You already gave Ratings!");
                                        }
                                        else {
                                            if (req.params.ServiceRequestId) {
                                                return _this.historyService
                                                    .getServiceByRequestId(+req.params.ServiceRequestId)
                                                    .then(function (service) {
                                                    if (service) {
                                                        req.body.ServiceRequestId = service.ServiceRequestId;
                                                        if (user.UserTypeId === 1 && user.UserId === service.UserId) {
                                                            req.body.RatingFrom = service.UserId;
                                                            if (service.Status === 2 && service.ServiceProviderId) {
                                                                req.body.RatingTo = service.ServiceProviderId;
                                                                req.body.Ratings = _this.historyService.getRatings(req.body);
                                                                return _this.historyService
                                                                    .giveRatings(req.body)
                                                                    .then(function (ratings) {
                                                                    return res.status(200).json(ratings);
                                                                })
                                                                    .catch(function (error) {
                                                                    return res.status(500).json({ error: error });
                                                                });
                                                            }
                                                            else {
                                                                return res.status(400).json("Service Request not completed or ServiceProvider Not found!");
                                                            }
                                                        }
                                                        else {
                                                            return res.status(400).json("Please login using your cutomer account!");
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
                                                return res.status(400).json("Service Request Id not exists!");
                                            }
                                        }
                                    })
                                        .catch(function (error) {
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(400).json("You are not Customer, Please login with you customer account!");
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
        this.export = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var exportHistory, token;
            var _this = this;
            return __generator(this, function (_a) {
                exportHistory = [];
                token = req.headers.authorization || req.header('auth');
                if (token) {
                    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (error, user) {
                        if (error) {
                            return res.status(400).json("Invalid Login!");
                        }
                        else {
                            return _this.historyService
                                .findUser(user.Email)
                                .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    if (user && user.UserTypeId === 1) {
                                        return [2 /*return*/, this.historyService
                                                .getAllPastRequest(user.UserId)
                                                .then(function (history) { return __awaiter(_this, void 0, void 0, function () {
                                                var pastHistory, workbook, worksheet;
                                                return __generator(this, function (_a) {
                                                    switch (_a.label) {
                                                        case 0:
                                                            if (!(history.length > 0)) return [3 /*break*/, 2];
                                                            pastHistory = this.historyService.Export(history);
                                                            return [4 /*yield*/, pastHistory];
                                                        case 1:
                                                            exportHistory = _a.sent();
                                                            workbook = new exceljs_1.default.Workbook();
                                                            worksheet = workbook.addWorksheet('Service History');
                                                            worksheet.columns = [
                                                                { header: 'ServiceID', key: 'ServiceID', width: 10 },
                                                                { header: 'ServiceStartDate', key: 'ServiceStartDate', width: 15 },
                                                                { header: 'Duration', key: 'Duration', width: 18 },
                                                                { header: 'ServiceProvider', key: 'ServiceProvider', width: 25 },
                                                                { header: 'Payment', key: 'Payment', width: 10 },
                                                                { header: 'Status', key: 'Status', width: 12 }
                                                            ];
                                                            worksheet.addRows(exportHistory);
                                                            worksheet.getRow(1).eachCell(function (cell) {
                                                                cell.font = { bold: true };
                                                            });
                                                            workbook.xlsx.writeFile('ServiceHistory_' + user.UserId + '.xlsx')
                                                                .then(function (service) {
                                                                return res.status(200).json("Data exported successfully!");
                                                            })
                                                                .catch(function (error) {
                                                                console.log(error);
                                                                return res.status(500).json({ error: error });
                                                            });
                                                            return [3 /*break*/, 3];
                                                        case 2: return [2 /*return*/, res.status(404).json("No requests found!")];
                                                        case 3: return [2 /*return*/];
                                                    }
                                                });
                                            }); })
                                                .catch(function (error) {
                                                return res.status(500).json({ error: error });
                                            })];
                                    }
                                    else {
                                        return [2 /*return*/, res.status(404).json("User not exists!")];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })
                                .catch(function (error) {
                                console.log(error);
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
        this.historyService = historyService;
    }
    return HistoryController;
}());
exports.HistoryController = HistoryController;
