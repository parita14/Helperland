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
exports.ServiceService = void 0;
var ServiceService = /** @class */ (function () {
    function ServiceService(serviceRepository) {
        this.serviceRepository = serviceRepository;
        this.serviceRepository = serviceRepository;
    }
    ServiceService.prototype.findUser = function (Email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceRepository.findUser(Email)];
            });
        });
    };
    ServiceService.prototype.getAllFutureRequest = function (ZipCode, UserId) {
        return __awaiter(this, void 0, void 0, function () {
            var service, serviceReq, blockedCust;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        service = [];
                        return [4 /*yield*/, this.serviceRepository.getAllFutureRequest(ZipCode)];
                    case 1:
                        serviceReq = _a.sent();
                        return [4 /*yield*/, this.serviceRepository.findBlockedCustomerOfSP(UserId)];
                    case 2:
                        blockedCust = _a.sent();
                        if (serviceReq) {
                            if (blockedCust) {
                                service = serviceReq.filter(function (s) {
                                    return !blockedCust.find(function (remove) {
                                        return (remove.TargetUserId === s.UserId);
                                    });
                                });
                            }
                        }
                        return [2 /*return*/, service];
                }
            });
        });
    };
    ServiceService.prototype.getServiceById = function (ServiceId, ZipCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceRepository.getServiceById(ServiceId, ZipCode)];
            });
        });
    };
    ServiceService.prototype.updateServiceStatus = function (ServiceId, ZipCode, ServiceProviderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceRepository.updateServiceStatus(ServiceId, ZipCode, ServiceProviderId)];
            });
        });
    };
    ServiceService.prototype.newservice = function (Email, ServiceId) {
        var data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'New Service Request Accepted',
            html: "<html>\n            <body>\n            <h3>Service Request with Service Id #".concat(ServiceId, " has already been accepted by someone and is no more available to you!</h3>\n            </body></html>")
        };
        return data;
    };
    ServiceService.prototype.findAllSP = function (ZipCode) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceRepository.findAllSP(ZipCode)];
            });
        });
    };
    ServiceService.prototype.getEmail = function (User, body) {
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
    ServiceService.prototype.serviceReq = function (service) {
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
                        return [4 /*yield*/, this.serviceRepository.findUserById(service[s].UserId)];
                    case 2:
                        userdetails = _c.sent();
                        return [4 /*yield*/, this.serviceRepository.findAddressById(service[s].ServiceRequestId)];
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
    ServiceService.prototype.findUserById = function (UserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceRepository.findUserById(UserId)];
            });
        });
    };
    ServiceService.prototype.findAddressById = function (ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceRepository.findAddressById(ServiceRequestId)];
            });
        });
    };
    ServiceService.prototype.findExtraById = function (ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceRepository.findExtraById(ServiceRequestId)];
            });
        });
    };
    ServiceService.prototype.findServiceOfHelper = function (UserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.serviceRepository.findServiceOfHelper(UserId)];
            });
        });
    };
    ServiceService.prototype.helperHasFutureSameDateAndTime = function (date, serviceRequest, acceptTotalHour, time) {
        var srId;
        var matched = false;
        for (var sr in serviceRequest) {
            if (serviceRequest[sr].ServiceStartDate.getTime() === date.getTime()) {
                var acceptTime = time.toString().split(":");
                if (acceptTime[1] === "30") {
                    acceptTime[1] = "0.5";
                }
                var acceptStartTime = parseFloat(acceptTime[0]) + parseFloat(acceptTime[1]);
                var availableTime = serviceRequest[sr].ServiceStartTime.toString().split(":");
                if (availableTime[1] === "30") {
                    availableTime[1] = "0.5";
                }
                var availableStartTime = parseFloat(availableTime[0]) + parseFloat(availableTime[1]);
                var availableTotalHour = serviceRequest[sr].ServiceHours + serviceRequest[sr].ExtraHours;
                var totalAcceptTime = acceptStartTime + acceptTotalHour + 1;
                var totalAvailableTime = availableStartTime + availableTotalHour + 1;
                if (availableStartTime >= totalAcceptTime ||
                    acceptStartTime >= totalAvailableTime) {
                    matched = false;
                }
                else {
                    srId = serviceRequest[sr].ServiceId;
                    matched = true;
                    break;
                }
            }
            else {
                matched = false;
            }
        }
        return { matched: matched, srId: srId };
    };
    return ServiceService;
}());
exports.ServiceService = ServiceService;
