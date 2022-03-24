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
exports.rAndbController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
var rAndbController = /** @class */ (function () {
    function rAndbController(rAndbService) {
        var _this = this;
        this.rAndbService = rAndbService;
        this.getAllRatings = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.rAndbService
                                .findUser(user.Email)
                                .then(function (findUser) {
                                if ((findUser === null || findUser === void 0 ? void 0 : findUser.UserTypeId) === 2) {
                                    return _this.rAndbService
                                        .getAllRatings(findUser.UserId)
                                        .then(function (ratings) { return __awaiter(_this, void 0, void 0, function () {
                                        var getAllRatings;
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0:
                                                    if (!(ratings && ratings.length > 0)) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, this.rAndbService.Ratings(ratings)];
                                                case 1:
                                                    getAllRatings = _a.sent();
                                                    if (getAllRatings.length > 0) {
                                                        return [2 /*return*/, res.status(200).json(getAllRatings)];
                                                    }
                                                    else {
                                                        return [2 /*return*/, res.status(404).json("No ratings found!")];
                                                    }
                                                    return [3 /*break*/, 3];
                                                case 2: return [2 /*return*/, res.status(400).json("No rating exists!")];
                                                case 3: return [2 /*return*/];
                                            }
                                        });
                                    }); })
                                        .catch(function (error) {
                                        console.log(error);
                                        return res.status(500).json({ error: error });
                                    });
                                }
                                else {
                                    return res.status(400).json("You are not SP, Please login with you SP account!");
                                }
                            })
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
        this.custSpHadWorkedFor = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.rAndbService
                                .findUser(user.Email)
                                .then(function (findUser) { return __awaiter(_this, void 0, void 0, function () {
                                var cust;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!(findUser && findUser.UserTypeId === 2)) return [3 /*break*/, 2];
                                            return [4 /*yield*/, this.rAndbService.findAllcustSpHadWorkedFor(findUser.UserId)];
                                        case 1:
                                            cust = _a.sent();
                                            if (cust) {
                                                if (cust.length > 0) {
                                                    return [2 /*return*/, res.status(200).json(cust)];
                                                }
                                                else {
                                                    return [2 /*return*/, res.status(404).json("Customer not found!")];
                                                }
                                            }
                                            else {
                                                return [2 /*return*/, res.status(404).json("No customer exists!")];
                                            }
                                            return [3 /*break*/, 3];
                                        case 2: return [2 /*return*/, res.status(404).json("User not exists!")];
                                        case 3: return [2 /*return*/];
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
                    return [2 /*return*/, res.status(404).json("No token exists!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.blockCust = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.rAndbService
                                .findUser(user.Email)
                                .then(function (findUser) {
                                if (findUser && findUser.UserTypeId === 2) {
                                    req.body.UserId = findUser.UserId;
                                    req.body.TargetUserId = req.params.custId;
                                    return _this.rAndbService
                                        .findServiceBySpId(findUser.UserId)
                                        .then(function (service) {
                                        if (service) {
                                            var cId = _this.rAndbService.findAllcustIdSpHadWorkedFor(service);
                                            if (cId.length > 0) {
                                                var custArray = cId.includes(parseInt(req.params.custId));
                                                if (custArray) {
                                                    if (req.body.IsBlocked) {
                                                        return _this.rAndbService
                                                            .findBlockedCust(findUser.UserId, req.body.TargetUserId)
                                                            .then(function (customer) {
                                                            if (customer) {
                                                                if (customer.IsBlocked) {
                                                                    return res.status(400).json("Customer already in blocked list!");
                                                                }
                                                                else {
                                                                    return _this.rAndbService
                                                                        .updateBlockedCust(req.body)
                                                                        .then(function (updateCust) {
                                                                        if (updateCust.length > 0) {
                                                                            return res.status(200).json("Customer addedd in blocked list!");
                                                                        }
                                                                        else {
                                                                            return res.status(400).json("Failure in adding customer in blocked list!");
                                                                        }
                                                                    })
                                                                        .catch(function (error) {
                                                                        return res.status(500).json(error);
                                                                    });
                                                                }
                                                            }
                                                            else {
                                                                req.body.IsFavorite = false;
                                                                return _this.rAndbService
                                                                    .createBlockedCust(req.body)
                                                                    .then(function (blockedCust) {
                                                                    if (blockedCust) {
                                                                        return res.status(200).json("Blocked customer created successfully!");
                                                                    }
                                                                    else {
                                                                        return res.status(404).json("Failure in creating blocked customer!");
                                                                    }
                                                                })
                                                                    .catch(function (error) {
                                                                    return res.status(500).json(error);
                                                                });
                                                            }
                                                        })
                                                            .catch(function (error) {
                                                            return res.status(500).json(error);
                                                        });
                                                    }
                                                    else if (req.body.IsBlocked === false) {
                                                        next();
                                                    }
                                                    else {
                                                        return res.status(404).json("Not Found!");
                                                    }
                                                }
                                                else {
                                                    return res.status(404).json("Service Provider not worked for customer in past!");
                                                }
                                            }
                                            else {
                                                return res.status(404).json("SP not worked with any customer in past!");
                                            }
                                        }
                                        else {
                                            return res.status(404).json("Service not exists!");
                                        }
                                    })
                                        .catch(function (error) {
                                        return res.status(500).json(error);
                                    });
                                }
                                else {
                                    return res.status(404).json("No Sp exists!");
                                }
                            })
                                .catch(function (error) {
                                return res.status(500).json(error);
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
        this.removeBlockedCust = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.rAndbService
                                .findUser(user.Email)
                                .then(function (findUser) {
                                if (findUser && findUser.UserTypeId === 2) {
                                    return _this.rAndbService
                                        .findBlockedCust(findUser.UserId, req.body.TargetUserId)
                                        .then(function (blocked) {
                                        if (blocked) {
                                            if (blocked.IsBlocked) {
                                                return _this.rAndbService
                                                    .updateBlockedCust(req.body)
                                                    .then(function (blockedCust) {
                                                    if (blockedCust) {
                                                        return res.status(200).json("Blocked Customer updated successfully!");
                                                    }
                                                    else {
                                                        return res.status(400).json("Updation failed!");
                                                    }
                                                })
                                                    .catch(function (error) {
                                                    return res.status(500).json(error);
                                                });
                                            }
                                            else if (blocked.IsBlocked === false) {
                                                return res.status(400).json("Customer already in unblocked list!");
                                            }
                                            else {
                                                return res.status(404).json("No customer exists to remove!");
                                            }
                                        }
                                        else {
                                            return res.status(404).json("No customer exists!");
                                        }
                                    })
                                        .catch(function (error) {
                                        return res.status(500).json(error);
                                    });
                                }
                                else {
                                    return res.status(404).json("No Sp Exists!");
                                }
                            })
                                .catch(function (error) {
                                return res.status(500).json(error);
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
        this.rAndbService = rAndbService;
    }
    return rAndbController;
}());
exports.rAndbController = rAndbController;
