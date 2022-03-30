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
exports.UserController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
var exceljs_1 = __importDefault(require("exceljs"));
var UserController = /** @class */ (function () {
    function UserController(userService) {
        var _this = this;
        this.userService = userService;
        this.getAllUsers = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.userService
                                .findUser(user.Email)
                                .then(function (findUser) {
                                if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 3) {
                                    return _this.userService
                                        .findAllUsers()
                                        .then(function (users) { return __awaiter(_this, void 0, void 0, function () {
                                        var services, userDetails;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!users) return [3 /*break*/, 2];
                                                    services = users.filter(function (x) {
                                                        return (!req.body.UserName || (x.FirstName + " " + x.LastName && x.FirstName + " " + x.LastName === req.body.UserName)) &&
                                                            (!(req.body.UserType === 'Customer') || (x.UserTypeId === 1 && x.UserTypeId === 1)) &&
                                                            (!(req.body.UserType === 'Service Provider') || (x.UserTypeId === 2 && x.UserTypeId === 2)) &&
                                                            (!req.body.Phone || (x.Mobile && x.Mobile === req.body.Phone)) &&
                                                            (!req.body.PostalCode || (x.ZipCode && x.ZipCode === req.body.PostalCode)) &&
                                                            (!req.body.Email || (x.Email && x.Email === req.body.Email)) &&
                                                            (!req.body.FromDate || (x.DateOfRegistration && x.DateOfRegistration >= req.body.FromDate)) &&
                                                            (!req.body.ToDate || (x.DateOfRegistration && x.DateOfRegistration <= req.body.ToDate));
                                                    });
                                                    return [4 /*yield*/, this.userService.userdetails(services)];
                                                case 1:
                                                    userDetails = _a.sent();
                                                    if (userDetails.length > 0) {
                                                        return [2 /*return*/, res.status(200).json(userDetails)];
                                                    }
                                                    else {
                                                        return [2 /*return*/, res.status(404).json("User not exists!")];
                                                    }
                                                    return [3 /*break*/, 3];
                                                case 2: return [2 /*return*/, res.status(404).json("No user exists!")];
                                                case 3: return [2 /*return*/];
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
        this.updateUserStatus = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.userService
                                .findUser(user.Email)
                                .then(function (findUser) {
                                if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 3) {
                                    if (req.body.Email) {
                                        return _this.userService
                                            .findUser(req.body.Email)
                                            .then(function (userbyEmail) {
                                            if (userbyEmail) {
                                                if (userbyEmail.IsApproved) {
                                                    return _this.userService
                                                        .deactivateUser(req.body.Email)
                                                        .then(function (u) {
                                                        if (u) {
                                                            return res.status(200).json("User " + (userbyEmail.FirstName + " " + userbyEmail.LastName) + " deactivated successfully!");
                                                        }
                                                        else {
                                                            return res.status(400).json("Updation failed!");
                                                        }
                                                    })
                                                        .catch(function (error) {
                                                        return res.status(500).json({ error: error });
                                                    });
                                                }
                                                else {
                                                    return _this.userService
                                                        .activateUser(req.body.Email)
                                                        .then(function (u) {
                                                        if (u) {
                                                            return res.status(200).json("User " + (userbyEmail.FirstName + " " + userbyEmail.LastName) + " activated successfully!");
                                                        }
                                                        else {
                                                            return res.status(400).json("Updation failed!");
                                                        }
                                                    })
                                                        .catch(function (error) {
                                                        return res.status(500).json({ error: error });
                                                    });
                                                }
                                            }
                                            else {
                                                return res.status(404).json("No user found with this Email");
                                            }
                                        })
                                            .catch(function (error) {
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {
                                        return res.status(400).json("Please write Email");
                                    }
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
        this.export = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var exportusers, token;
            var _this = this;
            return __generator(this, function (_a) {
                exportusers = [];
                token = req.headers.authorization || req.header('auth');
                if (token) {
                    jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (error, user) {
                        if (error) {
                            return res.status(400).json("Invalid Login!");
                        }
                        else {
                            return _this.userService
                                .findUser(user.Email)
                                .then(function (findUser) { return __awaiter(_this, void 0, void 0, function () {
                                var _this = this;
                                return __generator(this, function (_a) {
                                    if (findUser && findUser.UserTypeId === 3) {
                                        this.userService
                                            .findAllUsers()
                                            .then(function (allUsers) { return __awaiter(_this, void 0, void 0, function () {
                                            var workbook, worksheet;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!(allUsers.length > 0)) return [3 /*break*/, 2];
                                                        return [4 /*yield*/, this.userService.Export(allUsers)];
                                                    case 1:
                                                        exportusers = _a.sent();
                                                        workbook = new exceljs_1.default.Workbook();
                                                        worksheet = workbook.addWorksheet('All Users');
                                                        worksheet.columns = [
                                                            { header: 'UserName', key: 'UserName', width: 15 },
                                                            { header: 'DateOfRegistration', key: 'DateOfRegistration', width: 15 },
                                                            { header: 'UserType', key: 'UserType', width: 15 },
                                                            { header: 'Phone', key: 'Phone', width: 15 },
                                                            { header: 'PostalCode', key: 'PostalCode', width: 12 },
                                                            { header: 'Status', key: 'Status', width: 10 }
                                                        ];
                                                        worksheet.addRows(exportusers);
                                                        worksheet.getRow(1).eachCell(function (cell) {
                                                            cell.font = { bold: true };
                                                        });
                                                        workbook.xlsx.writeFile('All_Users' + '.xlsx')
                                                            .then(function (service) {
                                                            return res.status(200).json("Data exported successfully!");
                                                        })
                                                            .catch(function (error) {
                                                            console.log(error);
                                                            return res.status(500).json({ error: error });
                                                        });
                                                        return [3 /*break*/, 3];
                                                    case 2: return [2 /*return*/, res.status(404).json("No users found!")];
                                                    case 3: return [2 /*return*/];
                                                }
                                            });
                                        }); })
                                            .catch(function (error) {
                                            return res.status(500).json({ error: error });
                                        });
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
        this.userService = userService;
    }
    return UserController;
}());
exports.UserController = UserController;
