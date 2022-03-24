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
exports.srService = void 0;
var srService = /** @class */ (function () {
    function srService(srRepository) {
        this.srRepository = srRepository;
        this.srRepository = srRepository;
    }
    srService.prototype.findUser = function (Email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.srRepository.findUser(Email)];
            });
        });
    };
    srService.prototype.findByServiceId = function (ServiceId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.srRepository.findByServiceId(ServiceId)];
            });
        });
    };
    srService.prototype.findBySId = function (ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.srRepository.findBySId(ServiceRequestId)];
            });
        });
    };
    srService.prototype.updateServiceStatus = function (ServiceId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.srRepository.updateServiceStatus(ServiceId)];
            });
        });
    };
    srService.prototype.updateStatus = function (ServiceRequestId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.srRepository.updateStatus(ServiceRequestId)];
            });
        });
    };
    srService.prototype.updateAddress = function (ServiceRequestId, AddressLine1, AddressLine2, PostalCode, City) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.srRepository.updateAddress(ServiceRequestId, AddressLine1, AddressLine2, PostalCode, City)];
            });
        });
    };
    srService.prototype.findByAllSPId = function (ServiceProviderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.srRepository.findByAllSPId(ServiceProviderId)];
            });
        });
    };
    srService.prototype.updateService = function (ServiceRequestId, ServiceStartDate, ServiceStartTime) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.srRepository.updateService(ServiceRequestId, ServiceStartDate, ServiceStartTime)];
            });
        });
    };
    srService.prototype.findAllService = function () {
        return __awaiter(this, void 0, void 0, function () {
            var details, service, _a, _b, _i, s, userdetails, addressdetails, spdetails, spRating, Time, Extra, StartTime, total, time, Status, spId, spName, spAvatar, spRatings;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        details = [];
                        return [4 /*yield*/, this.srRepository.findAllService()];
                    case 1:
                        service = _c.sent();
                        _a = [];
                        for (_b in service)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 9];
                        s = _a[_i];
                        return [4 /*yield*/, this.srRepository.findUserById(service[s].UserId)];
                    case 3:
                        userdetails = _c.sent();
                        return [4 /*yield*/, this.srRepository.findAddressById(service[s].ServiceRequestId)];
                    case 4:
                        addressdetails = _c.sent();
                        return [4 /*yield*/, this.srRepository.findSPById(service[s].ServiceProviderId)];
                    case 5:
                        spdetails = _c.sent();
                        return [4 /*yield*/, this.srRepository.findSpRatings(service[s].ServiceRequestId)];
                    case 6:
                        spRating = _c.sent();
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
                        if (service[s].Status === 1) {
                            Status = 'Booked';
                        }
                        else if (service[s].Status === 2) {
                            Status = 'Completed';
                        }
                        else if (service[s].Status === 3) {
                            Status = 'Cancelled';
                        }
                        else if (service[s].Status === 4) {
                            Status = 'Assigned';
                        }
                        else {
                            Status = null;
                        }
                        if (spdetails) {
                            spId = spdetails.UserId;
                            spName = (spdetails === null || spdetails === void 0 ? void 0 : spdetails.FirstName) + " " + (spdetails === null || spdetails === void 0 ? void 0 : spdetails.LastName);
                            spAvatar = spdetails === null || spdetails === void 0 ? void 0 : spdetails.UserProfilePicture;
                            if (spRating) {
                                spRatings = spRating === null || spRating === void 0 ? void 0 : spRating.Ratings;
                            }
                            else {
                                spRatings = null;
                            }
                        }
                        else {
                            spId = null;
                            spName = null;
                            spAvatar = null;
                        }
                        return [4 /*yield*/, details.push({
                                ServiceId: service[s].ServiceId,
                                ServiceDate: service[s].ServiceStartDate,
                                Duration: service[s].ServiceStartTime + " - " + time,
                                CustomerDetails: {
                                    UserId: userdetails === null || userdetails === void 0 ? void 0 : userdetails.UserId,
                                    Name: (userdetails === null || userdetails === void 0 ? void 0 : userdetails.FirstName) + " " + (userdetails === null || userdetails === void 0 ? void 0 : userdetails.LastName),
                                    Address: {
                                        StreetName: addressdetails === null || addressdetails === void 0 ? void 0 : addressdetails.AddressLine1,
                                        HouseNumber: addressdetails === null || addressdetails === void 0 ? void 0 : addressdetails.AddressLine2,
                                        City: addressdetails === null || addressdetails === void 0 ? void 0 : addressdetails.City,
                                        PostalCode: addressdetails === null || addressdetails === void 0 ? void 0 : addressdetails.PostalCode,
                                    }
                                },
                                ServiceProvider: {
                                    ServiceProviderId: spId,
                                    Name: spName,
                                    Avatar: spAvatar,
                                    Ratings: spRatings
                                },
                                GrossAmount: service[s].TotalCost + " €",
                                NetAmount: service[s].TotalCost + " €",
                                HasIssue: service[s].HasIssue,
                                Status: Status
                            })];
                    case 7:
                        _c.sent();
                        _c.label = 8;
                    case 8:
                        _i++;
                        return [3 /*break*/, 2];
                    case 9: return [2 /*return*/, details];
                }
            });
        });
    };
    srService.prototype.findService = function (service, filters) {
        return __awaiter(this, void 0, void 0, function () {
            var services, userbyEmail_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, service.filter(function (x) {
                            return (!filters.ServiceId || (x.ServiceId && x.ServiceId === filters.ServiceId)) &&
                                (!filters.ZipCode || (x.CustomerDetails.Address.PostalCode && x.CustomerDetails.Address.PostalCode === filters.ZipCode)) &&
                                (!(filters.Status === 'Booked') || (x.Status === 'Booked' && x.Status === 'Booked')) &&
                                (!(filters.Status === 'Completed') || (x.Status === 'Completed' && x.Status === 'Completed')) &&
                                (!(filters.Status === 'Cancelled') || (x.Status === 'Cancelled' && x.Status === 'Cancelled')) &&
                                (!(filters.Status === 'Assigned') || (x.Status === 'Assigned' && x.Status === 'Assigned')) &&
                                (!filters.HelperName || (x.ServiceProvider.Name && x.ServiceProvider.Name === filters.HelperName)) &&
                                (!filters.CustomerName || (x.CustomerDetails.Name && x.CustomerDetails.Name === filters.CustomerName)) &&
                                (!(filters.HasIssue === true) || (x.HasIssue === true && x.HasIssue === true)) &&
                                (!(filters.HasIssue === false) || (x.HasIssue === false && x.HasIssue === false));
                        })];
                    case 1:
                        services = _a.sent();
                        if (filters.FromDate) {
                            if (services) {
                                services = services.filter(function (x) {
                                    var FromDate = new Date(filters.FromDate);
                                    var ServiceDate = new Date(x.ServiceDate);
                                    return (!FromDate || (ServiceDate && ServiceDate.getTime() >= FromDate.getTime()));
                                });
                            }
                            else {
                                services = service.filter(function (x) {
                                    var FromDate = new Date(filters.FromDate);
                                    var ServiceDate = new Date(x.ServiceDate);
                                    return (!FromDate || (ServiceDate && ServiceDate.getTime() >= FromDate.getTime()));
                                });
                            }
                        }
                        if (filters.ToDate) {
                            if (services) {
                                services = services.filter(function (x) {
                                    var ToDate = new Date(filters.ToDate);
                                    var ServiceDate = new Date(x.ServiceDate);
                                    return (!ToDate || (ServiceDate && ToDate.getTime() >= ServiceDate.getTime()));
                                });
                            }
                            else {
                                services = service.filter(function (x) {
                                    var ToDate = new Date(filters.ToDate);
                                    var ServiceDate = new Date(x.ServiceDate);
                                    return (!ToDate || (ServiceDate && ToDate.getTime() >= ServiceDate.getTime()));
                                });
                            }
                        }
                        if (!filters.Email) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.srRepository.findUser(filters.Email)];
                    case 2:
                        userbyEmail_1 = _a.sent();
                        if (userbyEmail_1) {
                            if (services) {
                                services = services.filter(function (x) {
                                    return x.CustomerDetails.UserId === userbyEmail_1.UserId ||
                                        x.ServiceProvider.ServiceProviderId === userbyEmail_1.UserId;
                                });
                            }
                            else {
                                services = service.filter(function (x) {
                                    return x.CustomerDetails.UserId === userbyEmail_1.UserId ||
                                        x.ServiceProvider.ServiceProviderId === userbyEmail_1.UserId;
                                });
                            }
                        }
                        else {
                            services = [];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, services];
                }
            });
        });
    };
    srService.prototype.cancleService = function (Email, ServiceId) {
        var data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'Cancellation of Service',
            html: "<!DOCTYPE>\n            <html>\n            <body>\n            <h3>\"Service Request of ServiceId " + ServiceId + " is cancelled by Admin on behalf of customer.\"</h3>\n            </body>\n            </html>"
        };
        return data;
    };
    srService.prototype.getEmails = function (service) {
        return __awaiter(this, void 0, void 0, function () {
            var email, cust, sp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = [];
                        return [4 /*yield*/, this.srRepository.findUserById(service.UserId)];
                    case 1:
                        cust = _a.sent();
                        return [4 /*yield*/, this.srRepository.findUserById(service.ServiceProviderId)];
                    case 2:
                        sp = _a.sent();
                        if (cust && service.UserId) {
                            email.push(cust.Email);
                        }
                        if (sp && service.ServiceProviderId) {
                            email.push(sp.Email);
                        }
                        return [2 /*return*/, email];
                }
            });
        });
    };
    srService.prototype.rescheduleWithAddress = function (ServiceStartDate, ServiceStartTime, Email, ServiceId, AddressLine1, AddressLine2, PostalCode, City) {
        var data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'Rescheduled Service Request',
            html: "\n                <!DOCTYPE>\n                <html>\n                <body>\n                <p>Service Request of ServiceId <b>" + ServiceId + "</b> is rescheduled by Admin on behalf of customer.</p>\n                <p>Service Request Details:</p>\n                <p>New date: " + ServiceStartDate + ".</p>\n                <p>New time: " + ServiceStartTime + ".</p>\n                <p>New Address: " + AddressLine1 + ", " + AddressLine2 + ", " + City + ", " + PostalCode + ".</p>\n                </body>\n                </html>\n                "
        };
        return data;
    };
    srService.prototype.SPHasFutureSameDateTime = function (ServiceStartDate, ServiceRequest, totalHour, ServiceStartTime) {
        var startDate;
        var startTime;
        var endTime;
        var ServiceId;
        var uTime = ServiceStartTime.split(":");
        if (uTime[1] === '30') {
            uTime[1] = '0.5';
        }
        var updateTime = parseFloat(uTime[0]) + parseFloat(uTime[1]);
        var enteredDate = new Date(ServiceStartDate);
        var isMatch;
        for (var s in ServiceRequest) {
            if (new Date(ServiceRequest[s].ServiceStartDate).getTime() > enteredDate.getTime()) {
                isMatch = false;
            }
            else if (new Date(ServiceRequest[s].ServiceStartDate).getTime() < enteredDate.getTime()) {
                isMatch = false;
            }
            else {
                var time = ServiceRequest[s].ServiceStartTime.toString().split(":");
                if (time[1] === '30') {
                    time[1] = '0.5';
                }
                var availableTime = parseFloat(time[0]) + parseFloat(time[1]);
                var availableHour = ServiceRequest[s].ServiceHours + ServiceRequest[s].ExtraHours;
                if (updateTime + totalHour < availableTime || availableTime + availableHour < updateTime) {
                    isMatch = false;
                }
                else {
                    ServiceId = ServiceRequest[s].ServiceId;
                    startDate = ServiceRequest[s].ServiceStartDate;
                    var srTime = availableTime.toString().split('.');
                    if (srTime[1] === '5') {
                        srTime[1] = '30';
                    }
                    else {
                        srTime[1] = '00';
                    }
                    startTime = srTime.join(':');
                    var eTime = (availableTime + availableHour).toString().split('.');
                    if (parseInt(eTime[1]) === 5) {
                        eTime[1] = '30';
                    }
                    else {
                        eTime[1] = '00';
                    }
                    endTime = eTime.join(':');
                    isMatch = true;
                    break;
                }
            }
        }
        return { isMatch: isMatch, startDate: startDate, startTime: startTime, endTime: endTime, ServiceId: ServiceId };
    };
    return srService;
}());
exports.srService = srService;
