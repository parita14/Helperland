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
        this.getUserDetails = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                                .then(function (user) {
                                if (user && user.UserTypeId === 1) {
                                    return res.status(200).json(user);
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
                    return [2 /*return*/, res.status(404).json("No token exists!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.updateUserDetails = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            var Email_1 = user.Email;
                            if (Email_1) {
                                var UserEmail_1 = Email_1;
                                var FirstName_1 = req.body.FirstName;
                                var LastName_1 = req.body.LastName;
                                var Mobile_1 = req.body.Mobile;
                                var DateOfBirth_1 = req.body.DateOfBirth;
                                var LanguageId_1 = req.body.LanguageId;
                                return _this.settingsService
                                    .findUserByEmail(Email_1)
                                    .then(function (findUser) {
                                    if (findUser) {
                                        return _this.settingsService
                                            .updateUserDetails(UserEmail_1, FirstName_1, LastName_1, Mobile_1, DateOfBirth_1, LanguageId_1)
                                            .then(function (user) {
                                            return res.status(200).json({
                                                FirstName: FirstName_1,
                                                LastName: LastName_1,
                                                Email: Email_1,
                                                Mobile: Mobile_1,
                                                DateOfBirth: DateOfBirth_1,
                                                LanguageId: LanguageId_1
                                            });
                                        })
                                            .catch(function (error) {
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {
                                        return res.status(404).json("No user found with this email!");
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
        this.createUserAddress = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            req.body.Email = user.Email;
                            return _this.settingsService
                                .findUserByEmail(user.Email)
                                .then(function (user) {
                                if (!user) {
                                    return res.status(404).json("There is no user found with this email address!");
                                }
                                else {
                                    req.body.UserId = user.UserId;
                                    req.body.IsDeleted = false;
                                    return _this.settingsService
                                        .createUserAddress(req.body)
                                        .then(function (address) {
                                        return res.status(200).json({
                                            Address: req.body.AddressLine1 + ', ' + req.body.AddressLine2 + ', ' + req.body.City + ', ' + req.body.State + ', ' + req.body.PostalCode,
                                            PhoneNumber: req.body.Mobile
                                        });
                                    })
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
        this.getUserAddress = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token, userAddress;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.headers.authorization || req.header('auth');
                userAddress = [];
                if (token) {
                    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (error, user) {
                        if (error) {
                            return res.status(400).json("Invalid login!");
                        }
                        else {
                            return _this.settingsService
                                .findUserByEmail(user.Email)
                                .then(function (findUser) {
                                if (!findUser) {
                                    return res.status(404).json("There is no user found with this email address!");
                                }
                                else {
                                    return _this.settingsService
                                        .findAddresByUserId(findUser.UserId)
                                        .then(function (address) {
                                        if (address.length > 0) {
                                            for (var a in address) {
                                                address[a].UserId = findUser.UserId;
                                                userAddress.push(address[a]);
                                            }
                                            if (userAddress.length > 0) {
                                                for (var a in address) {
                                                    return res.status(200).json({ userAddress: userAddress });
                                                }
                                            }
                                            else {
                                                return res.status(404).json("There is no address!");
                                            }
                                        }
                                        else {
                                            return res.status(404).json("User Address not found!");
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
                        }
                    });
                }
                else {
                    return [2 /*return*/, res.status(400).json("No token exists!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.getAddressById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                                .then(function (user) {
                                if (user && user.UserTypeId === 1) {
                                    return _this.settingsService
                                        .findByAddressId(+req.params.AddressId)
                                        .then(function (address) {
                                        if (address) {
                                            if (user.UserId === address.UserId) {
                                                return res.status(200).json(address);
                                            }
                                            else {
                                                return res.status(404).json("Invalid User!");
                                            }
                                        }
                                        else {
                                            return res.status(404).json("No address found!");
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
                    return [2 /*return*/, res.status(404).json("No token exists!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.updateUserAddress = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                                var AddressLine1_1 = req.body.AddressLine1;
                                var AddressLine2_1 = req.body.AddressLine2;
                                var City_1 = req.body.City;
                                var State_1 = req.body.State;
                                var PostalCode_1 = req.body.PostalCode;
                                var Mobile_2 = req.body.Mobile;
                                return _this.settingsService
                                    .findUserByEmail(Email)
                                    .then(function (findUser) {
                                    if (findUser) {
                                        return _this.settingsService
                                            .findByAddressId(+req.params.AddressId)
                                            .then(function (id) {
                                            if (id) {
                                                if (findUser.Email === id.Email) {
                                                    return _this.settingsService
                                                        .updateUserAddress(+req.params.AddressId, AddressLine1_1, AddressLine2_1, City_1, State_1, PostalCode_1, Mobile_2)
                                                        .then(function (address) {
                                                        return res.status(200).json({
                                                            Address: AddressLine1_1 + ', ' + AddressLine2_1 + ', ' + City_1 + ', ' + State_1 + ', ' + PostalCode_1,
                                                            PhoneNumber: Mobile_2
                                                        });
                                                    })
                                                        .catch(function (error) {
                                                        return res.status(500).json({ error: error });
                                                    });
                                                }
                                                else {
                                                    return res.status(404).json("Enter valid Id!");
                                                }
                                            }
                                            else {
                                                return res.status(404).json("Id not found!");
                                            }
                                        })
                                            .catch(function (error) {
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {
                                        return res.status(404).json("No user found with this email!");
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
        this.deleteAddress = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                                .then(function (findUser) {
                                if (findUser) {
                                    return _this.settingsService
                                        .findByAddressId(+req.params.AddressId)
                                        .then(function (id) {
                                        if (id) {
                                            if (findUser.Email === id.Email) {
                                                return _this.settingsService
                                                    .deleteAddress(+req.params.AddressId)
                                                    .then(function (address) {
                                                    return res.status(200).json("Address deleted Successfully!");
                                                })
                                                    .catch(function (error) {
                                                    return res.status(500).json({ error: error });
                                                });
                                            }
                                            else {
                                                return res.status(404).json("Enter valid Id");
                                            }
                                        }
                                        else {
                                            return res.status(404).json("Id not found!");
                                        }
                                    })
                                        .catch(function (error) {
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(404).json("No user found with this email!");
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
        this.changePassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                                .then(function (findUser) { return __awaiter(_this, void 0, void 0, function () {
                                var isOld, _a;
                                var _this = this;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            if (!(findUser && findUser.UserTypeId === 1)) return [3 /*break*/, 7];
                                            return [4 /*yield*/, bcryptjs_1.default.compare(req.body.OldPassword, findUser.Password)];
                                        case 1:
                                            isOld = _b.sent();
                                            if (!!isOld) return [3 /*break*/, 2];
                                            return [2 /*return*/, res.status(400).json("Incorrect Old Password!")];
                                        case 2:
                                            if (!(req.body.OldPassword === req.body.NewPassword)) return [3 /*break*/, 3];
                                            return [2 /*return*/, res.status(400).json("Choose different password other than older one!")];
                                        case 3:
                                            if (!(req.body.NewPassword !== req.body.ConfirmPassword)) return [3 /*break*/, 4];
                                            return [2 /*return*/, res.status(400).json("New Password & Confirm Password is not matching!")];
                                        case 4:
                                            _a = req.body;
                                            return [4 /*yield*/, bcryptjs_1.default.hash(req.body.NewPassword, saltRouds)];
                                        case 5:
                                            _a.NewPassword = _b.sent();
                                            return [2 /*return*/, this.settingsService
                                                    .changePassword(user.Email, req.body.NewPassword)
                                                    .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                                                    return __generator(this, function (_a) {
                                                        return [2 /*return*/, res.status(200).status(200).json("Password changed Successfully!")];
                                                    });
                                                }); })
                                                    .catch(function (error) {
                                                    console.log(error);
                                                    return res.status(500).json({ error: error });
                                                })];
                                        case 6: return [3 /*break*/, 8];
                                        case 7: return [2 /*return*/, res.status(404).json("User not exist!")];
                                        case 8: return [2 /*return*/];
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
