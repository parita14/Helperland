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
exports.DashboardService = void 0;
var moment_1 = __importDefault(require("moment"));
var DashboardService = /** @class */ (function () {
    function DashboardService(dashboardRepository) {
        this.dashboardRepository = dashboardRepository;
        this.dashboardRepository = dashboardRepository;
    }
    DashboardService.prototype.findUser = function (Email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardRepository.findUser(Email)];
            });
        });
    };
    DashboardService.prototype.getAllFutureRequest = function (UserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardRepository.getAllFutureRequest(UserId)];
            });
        });
    };
    DashboardService.prototype.getServiceById = function (ServiceId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardRepository.getServiceById(ServiceId)];
            });
        });
    };
    DashboardService.prototype.findServiceById = function (ServiceId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardRepository.findServiceById(ServiceId)];
            });
        });
    };
    DashboardService.prototype.updateService = function (ServiceId, ServiceStartDate, ServiceStartTime) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardRepository.updateService(ServiceId, ServiceStartDate, ServiceStartTime)];
            });
        });
    };
    DashboardService.prototype.compareDate = function (ServiceStartDate) {
        var date1 = new Date(ServiceStartDate);
        var date2 = new Date((0, moment_1.default)(new Date()).format("YYYY-MM-DD"));
        console.log(date1);
        if (date1 > date2) {
            return true;
        }
        else {
            return false;
        }
    };
    DashboardService.prototype.updateServiceStatus = function (ServiceId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardRepository.updateServiceStatus(ServiceId)];
            });
        });
    };
    DashboardService.prototype.findSPById = function (UserId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardRepository.findSPById(UserId)];
            });
        });
    };
    DashboardService.prototype.cancleService = function (Email, ServiceId, Reason) {
        var data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'Cancellation of Service',
            html: "<!DOCTYPE>\n            <html>\n            <body>\n            <h3>\"Service Request assigned to you of ServiceId ".concat(ServiceId, " is cancelled by Customer due to this reason.\"</h3>\n            <h3>Reason: ").concat(Reason, ".</h3>\n            </body>\n            </html>")
        };
        return data;
    };
    DashboardService.prototype.findByAllSPId = function (ServiceProviderId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.dashboardRepository.findByAllSPId(ServiceProviderId)];
            });
        });
    };
    DashboardService.prototype.SPHasFutureSameDateTime = function (ServiceStartDate, ServiceRequest, totalHour, ServiceStartTime) {
        var startDate;
        var startTime;
        var endTime;
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
                var time_1 = ServiceRequest[s].ServiceStartTime.toString().split(":");
                if (time_1[1] === '30') {
                    time_1[1] = '0.5';
                }
                var availableTime = parseFloat(time_1[0]) + parseFloat(time_1[1]);
                var availableHour = ServiceRequest[s].ServiceHours + ServiceRequest[s].ExtraHours;
                if (updateTime + totalHour < availableTime || availableTime + availableHour < updateTime) {
                    isMatch = false;
                }
                else {
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
        return { isMatch: isMatch, startDate: startDate, startTime: startTime, endTime: endTime };
    };
    DashboardService.prototype.rescheduleService = function (ServiceStartDate, ServiceStartTime, Email, ServiceId) {
        var data = {
            from: 'helperland@gmail.com',
            to: Email,
            subject: 'Rescheduled Service Request',
            html: "\n                <!DOCTYPE>\n                <html>\n                <body>\n                <h3>\"Service Request assigned to you of ServiceId ".concat(ServiceId, " is rescheduled by customer. New date and time are ").concat(ServiceStartDate, " ").concat(ServiceStartTime, "\".</h3>\n                </body>\n                </html>\n                ")
        };
        return data;
    };
    ;
    return DashboardService;
}());
exports.DashboardService = DashboardService;
