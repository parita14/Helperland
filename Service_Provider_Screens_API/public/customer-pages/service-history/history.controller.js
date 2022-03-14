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
                                        var s;
                                        return __generator(this, function (_a) {
                                            if (service) {
                                                if (service.length > 0) {
                                                    for (s in service) {
                                                        // const date1 = new Date(service[s].ServiceStartDate);
                                                        // const date2 = new Date(moment(new Date()).format("YYYY-MM-DD"));
                                                        // if(date1 <= date2) {
                                                        serviceRequest.push(service[s]);
                                                        // }
                                                    }
                                                    if (serviceRequest.length > 0) {
                                                        return [2 /*return*/, res.status(200).json({ serviceRequest: serviceRequest })];
                                                    }
                                                    else {
                                                        return [2 /*return*/, res.status(400).json("No service exists!")];
                                                    }
                                                }
                                                else {
                                                    return [2 /*return*/, res.status(400).json("No service exists!!")];
                                                }
                                            }
                                            else {
                                                return [2 /*return*/, res.status(400).json("No service exists!!!")];
                                            }
                                            return [2 /*return*/];
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
                                .then(function (user) {
                                if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 1) {
                                    return _this.historyService
                                        .getServiceById(+req.params.ServiceId)
                                        .then(function (service) {
                                        if (service) {
                                            if (user.UserId === service.UserId) {
                                                return res.status(200).json(service);
                                            }
                                            else {
                                                return res.status(404).json("No service request detail found with this service ID!");
                                            }
                                        }
                                        else {
                                            return res.status(404).json("No service request detail found with this service ID!");
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
                                .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var data, workbook, worksheet_1, count_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(user && user.UserTypeId === 1)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.historyService.getAllPastRequest(user.UserId)];
                                        case 1:
                                            data = _a.sent();
                                            workbook = new exceljs_1.default.Workbook();
                                            worksheet_1 = workbook.addWorksheet('Service History');
                                            worksheet_1.columns = [
                                                { header: 'Id', key: 'Id', width: 10 },
                                                { header: 'ServiceId', key: 'ServiceId', width: 10 },
                                                { header: 'ServiceStartDate', key: 'ServiceStartDate', width: 18 },
                                                { header: 'ServiceStartTime', key: 'ServiceStartTime', width: 18 },
                                                { header: 'ServiceProviderId', key: 'ServiceProviderId', width: 18 },
                                                { header: 'TotalCost', key: 'TotalCost', width: 10 },
                                                { header: 'Status', key: 'Status', width: 10 }
                                            ];
                                            count_1 = 1;
                                            data.forEach(function (d) {
                                                d.Id = count_1;
                                                worksheet_1.addRow(d);
                                                count_1 += 1;
                                            });
                                            worksheet_1.getRow(1).eachCell(function (cell) {
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
                                        case 2: return [2 /*return*/, res.status(404).json("User not exists!")];
                                        case 3: return [2 /*return*/];
                                    }
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
