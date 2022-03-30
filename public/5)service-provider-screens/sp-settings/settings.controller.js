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
exports.SettingsController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
require('dotenv').config();
var saltRouds = 10;
var SettingsController = /** @class */ (function () {
    function SettingsController(settingsService) {
        var _this = this;
        this.settingsService = settingsService;
        this.getSpDetails = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.settingsService
                                .findUserByEmail(user.Email)
                                .then(function (findUser) {
                                if (findUser && findUser.UserTypeId === 2) {
                                    return _this.settingsService
                                        .findByUserId(findUser.UserId)
                                        .then(function (address) {
                                        if (address) {
                                            return res.status(200).json({
                                                AccountStatus: findUser.IsActive,
                                                FirstName: findUser.FirstName,
                                                LastName: findUser.LastName,
                                                Email: findUser.Email,
                                                Mobile: findUser.Mobile,
                                                DateOfBirth: findUser.DateOfBirth,
                                                NationalityId: findUser.NationalityId,
                                                Gender: findUser.Gender,
                                                UserProfilePicture: findUser.UserProfilePicture,
                                                StreetName: address.AddressLine1,
                                                HouseNumber: address.AddressLine2,
                                                PostalCode: address.PostalCode,
                                                City: address.City
                                            });
                                        }
                                        else {
                                            return res.status(200).json({
                                                AccountStatus: findUser.IsActive,
                                                FirstName: findUser.FirstName,
                                                LastName: findUser.LastName,
                                                Email: findUser.Email,
                                                Mobile: findUser.Mobile,
                                                DateOfBirth: findUser.DateOfBirth,
                                                NationalityId: findUser.NationalityId,
                                                Gender: findUser.Gender,
                                                UserProfilePicture: findUser.UserProfilePicture
                                            });
                                        }
                                    })
                                        .catch(function (error) {
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(404).json("SP not exists!");
                                }
                            })
                                .catch(function (error) {
                                return res.status(500).json({ error: error });
                            });
                        }
                    });
                }
                else {
                    return [2 /*return*/, res.status(404).json("No token exists!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.updateSPDetails = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            var Email = user.Email;
                            if (Email) {
                                return _this.settingsService
                                    .findUserByEmail(Email)
                                    .then(function (findUser) {
                                    if (findUser) {
                                        var FirstName_1 = req.body.FirstName;
                                        var LastName_1 = req.body.LastName;
                                        var Mobile_1 = req.body.Mobile;
                                        var DateOfBirth_1 = req.body.DateOfBirth;
                                        var NationalityId_1 = req.body.NationalityId;
                                        var Gender_1 = req.body.Gender;
                                        var UserProfilePicture_1 = req.body.UserProfilePicture;
                                        return _this.settingsService
                                            .updateSPDetails(findUser.Email, req.body.FirstName, req.body.LastName, req.body.Mobile, req.body.DateOfBirth, req.body.NationalityId, req.body.Gender, req.body.UserProfilePicture, req.body.PostalCode)
                                            .then(function (user) {
                                            return _this.settingsService
                                                .findByUserId(findUser.UserId)
                                                .then(function (address) {
                                                if (address) {
                                                    var StreetName_1 = req.body.AddressLine1;
                                                    var HouseNumber_1 = req.body.AddressLine2;
                                                    var PostalCode_1 = req.body.PostalCode;
                                                    var City_1 = req.body.City;
                                                    return _this.settingsService
                                                        .updateUserAddress(findUser.UserId, req.body.AddressLine1, req.body.AddressLine2, req.body.City, req.body.PostalCode, req.body.Mobile)
                                                        .then(function (address) {
                                                        if (address) {
                                                            return res.status(200).json({
                                                                AccountStatus: findUser.IsActive,
                                                                FirstName: FirstName_1,
                                                                LastName: LastName_1,
                                                                Email: findUser.Email,
                                                                Mobile: Mobile_1,
                                                                DateOfBirth: DateOfBirth_1,
                                                                NationalityId: NationalityId_1,
                                                                Gender: Gender_1,
                                                                UserProfilePicture: UserProfilePicture_1,
                                                                StreetName: StreetName_1,
                                                                HouseNumber: HouseNumber_1,
                                                                PostalCode: PostalCode_1,
                                                                City: City_1
                                                            });
                                                        }
                                                        else {
                                                            return res.status(400).json("Failure in updating address!");
                                                        }
                                                    })
                                                        .catch(function (error) {
                                                        return res.status(500).json({ error: error });
                                                    });
                                                }
                                                else {
                                                    if (!(req.body.AddressLine1, req.body.AddressLine2, req.body.PostalCode, req.body.City)) {
                                                        return res.status(400).json("Provide addres Details!");
                                                    }
                                                    req.body.UserId = findUser.UserId;
                                                    req.body.Email = findUser.Email;
                                                    req.body.IsDeleted = false;
                                                    return _this.settingsService
                                                        .createUserAddress(req.body)
                                                        .then(function (address) {
                                                        if (address) {
                                                            var StreetName = req.body.AddressLine1;
                                                            var HouseNumber = req.body.AddressLine2;
                                                            var PostalCode = req.body.PostalCode;
                                                            var City = req.body.City;
                                                            return res.status(200).json({
                                                                AccountStatus: findUser.IsActive,
                                                                FirstName: FirstName_1,
                                                                LastName: LastName_1,
                                                                Email: findUser.Email,
                                                                Mobile: Mobile_1,
                                                                DateOfBirth: DateOfBirth_1,
                                                                NationalityId: NationalityId_1,
                                                                Gender: Gender_1,
                                                                UserProfilePicture: UserProfilePicture_1,
                                                                StreetName: StreetName,
                                                                HouseNumber: HouseNumber,
                                                                PostalCode: PostalCode,
                                                                City: City
                                                            });
                                                        }
                                                        else {
                                                            return res.status(400).json("Failure in updating address!");
                                                        }
                                                    })
                                                        .catch(function (error) {
                                                        return res.status(500).json({ error: error });
                                                    });
                                                }
                                            })
                                                .catch(function (error) {
                                                return res.status(500).json({ error: error });
                                            });
                                        })
                                            .catch(function (error) {
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {
                                        return res.status(404).json("No SP found with this email!");
                                    }
                                })
                                    .catch(function (error) {
                                    return res.status(500).json({ error: error });
                                });
                            }
                            else {
                                return res.status(404).json("No email found!");
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
        this.changePassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.settingsService
                                .findUserByEmail(user.Email)
                                .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                var isOld, _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (!(user && user.UserTypeId === 2)) return [3 /*break*/, 6];
                                            return [4 /*yield*/, bcryptjs_1.default.compare(req.body.OldPassword, user.Password)];
                                        case 1:
                                            isOld = _b.sent();
                                            if (!!isOld) return [3 /*break*/, 2];
                                            return [2 /*return*/, res.status(400).json("Incorrect Old Password!")];
                                        case 2:
                                            if (!(req.body.NewPassword !== req.body.ConfirmPassword)) return [3 /*break*/, 3];
                                            return [2 /*return*/, res.status(400).json("New Password & Confirm Password is not matching!")];
                                        case 3:
                                            _a = req.body;
                                            return [4 /*yield*/, bcryptjs_1.default.hash(req.body.NewPassword, saltRouds)];
                                        case 4:
                                            _a.NewPassword = _b.sent();
                                            return [2 /*return*/, this.settingsService
                                                    .changePassword(user.Email, req.body.NewPassword)
                                                    .then(function (password) {
                                                    return res.status(200).json("Password changed Successfully!");
                                                })
                                                    .catch(function (error) {
                                                    console.log(error);
                                                    return res.status(500).json({ error: error });
                                                })];
                                        case 5: return [3 /*break*/, 7];
                                        case 6: return [2 /*return*/, res.status(404).json("SP not found!")];
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            }); })
                                .catch(function (error) {
                                return res.status(500).json(error);
                            });
                        }
                    });
                }
                else {
                    return [2 /*return*/, res.status(404).json("Token not exists!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.settingsService = settingsService;
    }
    return SettingsController;
}());
exports.SettingsController = SettingsController;
