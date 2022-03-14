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
exports.SpHistoryService = void 0;
var moment_1 = __importDefault(require("moment"));
var SpHistoryService = /** @class */ (function () {
    function SpHistoryService(spHistoryRepository) {
        this.spHistoryRepository = spHistoryRepository;
        this.spHistoryRepository = spHistoryRepository;
    }
    SpHistoryService.prototype.findUser = function (Email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.spHistoryRepository.findUser(Email)];
            });
        });
    };
    SpHistoryService.prototype.getAllCompletedRequest = function (ZipCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.spHistoryRepository.getAllCompletedRequest(ZipCode)];
            });
        });
    };
    SpHistoryService.prototype.getServiceById = function (ServiceId, ZipCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.spHistoryRepository.getServiceById(ServiceId, ZipCode)];
            });
        });
    };
    SpHistoryService.prototype.serviceReq = function (service) {
        return __awaiter(this, void 0, void 0, function () {
            var details, _a, _b, _i, s, userdetails, addressdetails, Time, Extra, StartTime, total, time;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        details = [];
                        _a = [];
                        for (_b in service)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        s = _a[_i];
                        return [4 /*yield*/, this.spHistoryRepository.findUserById(service[s].UserId)];
                    case 2:
                        userdetails = _c.sent();
                        return [4 /*yield*/, this.spHistoryRepository.findAddressById(service[s].ServiceRequestId)];
                    case 3:
                        addressdetails = _c.sent();
                        Time = (service[s].ServiceHours);
                        Extra = (service[s].ExtraHours);
                        StartTime = ((service[s].ServiceStartTime).toString().split(':'));
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
                        service[s].update({ EndTime: time });
                        if (!userdetails) return [3 /*break*/, 5];
                        if (!addressdetails) return [3 /*break*/, 5];
                        return [4 /*yield*/, details.push({
                                ServiceID: service[s].ServiceId,
                                ServiceStartDate: service[s].ServiceStartDate,
                                Duration: service[s].ServiceStartTime + " - " + time,
                                CustomerDetails: {
                                    Name: userdetails.FirstName + " " + userdetails.LastName,
                                    Address: addressdetails.AddressLine1 + ", " + addressdetails.AddressLine2 + ", " + addressdetails.City + ", " + addressdetails.PostalCode,
                                },
                                Payment: service[s].TotalCost + " €"
                            })];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, details];
                }
            });
        });
    };
    SpHistoryService.prototype.findUserById = function (UserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.spHistoryRepository.findUserById(UserId)];
            });
        });
    };
    SpHistoryService.prototype.findAddressById = function (ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.spHistoryRepository.findAddressById(ServiceRequestId)];
            });
        });
    };
    SpHistoryService.prototype.findExtraById = function (ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.spHistoryRepository.findExtraById(ServiceRequestId)];
            });
        });
    };
    SpHistoryService.prototype.compareDate = function (history) {
        var sphistory = [];
        var currentDate = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
        for (var h in history) {
            var date = history[h].ServiceStartDate;
            var ServiceStartDate = new Date((0, moment_1.default)(date).format("YYYY-MM-DD"));
            if (ServiceStartDate <= currentDate) {
                sphistory.push(history[h]);
            }
        }
        return sphistory;
    };
    SpHistoryService.prototype.Export = function (service) {
        return __awaiter(this, void 0, void 0, function () {
            var exportHistory, _a, _b, _i, s, userdetails, addressdetails, Time, Extra, StartTime, total, time;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        exportHistory = [];
                        _a = [];
                        for (_b in service)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        s = _a[_i];
                        return [4 /*yield*/, this.findUserById(service[s].UserId)];
                    case 2:
                        userdetails = _c.sent();
                        return [4 /*yield*/, this.spHistoryRepository.findAddressById(service[s].ServiceRequestId)];
                    case 3:
                        addressdetails = _c.sent();
                        Time = (service[s].ServiceHours);
                        Extra = (service[s].ExtraHours);
                        StartTime = ((service[s].ServiceStartTime).toString().split(':'));
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
                        service[s].update({ EndTime: time });
                        exportHistory.push({
                            ServiceId: service[s].ServiceId,
                            StartDate: service[s].ServiceStartDate,
                            Duration: service[s].ServiceStartTime + " - " + time,
                            CustomerName: (userdetails === null || userdetails === void 0 ? void 0 : userdetails.FirstName) + " " + (userdetails === null || userdetails === void 0 ? void 0 : userdetails.LastName),
                            Address: (addressdetails === null || addressdetails === void 0 ? void 0 : addressdetails.AddressLine1) + ", " + (addressdetails === null || addressdetails === void 0 ? void 0 : addressdetails.AddressLine2) + ", " + (addressdetails === null || addressdetails === void 0 ? void 0 : addressdetails.City) + ", " + (addressdetails === null || addressdetails === void 0 ? void 0 : addressdetails.PostalCode)
                        });
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 1];
                    case 5: return [2 /*return*/, exportHistory];
                }
            });
        });
    };
    return SpHistoryService;
}());
exports.SpHistoryService = SpHistoryService;
