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
exports.FavController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require('dotenv').config();
var FavController = /** @class */ (function () {
    function FavController(favService) {
        var _this = this;
        this.favService = favService;
        this.SPworkedwithCustomer = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.favService
                                .findByEmail(user.Email)
                                .then(function (user) {
                                if (user) {
                                    if (user.UserTypeId === 1) {
                                        return _this.favService
                                            .findServiceById(user.UserId)
                                            .then(function (service) {
                                            if (service) {
                                                var spId_1 = _this.favService.findAllSpIdWorkedWithCustInPast(service);
                                                if (spId_1.length > 0) {
                                                    return _this.favService
                                                        .findAllSPWorkedWithCustInPast(spId_1)
                                                        .then(function (sp) { return __awaiter(_this, void 0, void 0, function () {
                                                        var Sp;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0:
                                                                    if (!(sp && sp.length > 0)) return [3 /*break*/, 2];
                                                                    return [4 /*yield*/, this.favService.findAllSpWorkedWithCust(spId_1)];
                                                                case 1:
                                                                    Sp = _a.sent();
                                                                    if (Sp) {
                                                                        if (Sp.length > 0) {
                                                                            return [2 /*return*/, res.status(200).json(Sp)];
                                                                        }
                                                                        else {
                                                                            return [2 /*return*/, res.status(404).json("sp not found!")];
                                                                        }
                                                                    }
                                                                    else {
                                                                        return [2 /*return*/, res.status(404).json("No sp exists!")];
                                                                    }
                                                                    return [3 /*break*/, 3];
                                                                case 2: return [2 /*return*/, res.status(404).json("There is no helper worked with you in past!")];
                                                                case 3: return [2 /*return*/];
                                                            }
                                                        });
                                                    }); })
                                                        .catch(function (error) {
                                                        return res.status(500).json({ error: error });
                                                    });
                                                }
                                                else {
                                                    return res.status(404).json("There is no helper worked with you in past!");
                                                }
                                            }
                                            else {
                                                return res.status(404).json("Service not exists!");
                                            }
                                        })
                                            .catch(function (error) {
                                            return res.status(500).json({ error: error });
                                        });
                                    }
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
                    return [2 /*return*/, res.status(400).json("Some error occurred!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.FavSP = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.favService
                                .findByEmail(user.Email)
                                .then(function (user) {
                                if (user) {
                                    if (user.UserTypeId === 1) {
                                        req.body.UserId = user.UserId;
                                        req.body.TargetUserId = req.params.spId;
                                        return _this.favService
                                            .findServiceById(user.UserId)
                                            .then(function (service) {
                                            if (service) {
                                                var helperId = _this.favService.findAllSpIdWorkedWithCustInPast(service);
                                                if (helperId.length > 0) {
                                                    var spArray = helperId.includes(parseInt(req.params.spId));
                                                    if (spArray) {
                                                        if (req.body.IsFavorite) {
                                                            return _this.favService
                                                                .findFavoriteSp(user.UserId, +req.params.spId)
                                                                .then(function (fav) {
                                                                if (fav) {
                                                                    if (fav.IsFavorite) {
                                                                        return res.status(400).json("Service Provider already exists in your Favourite Service Provider list!");
                                                                    }
                                                                    else {
                                                                        return _this.favService
                                                                            .updateFavoriteSp(req.body)
                                                                            .then(function (favorite) {
                                                                            if (favorite.length > 0) {
                                                                                res.status(200).json("Favorite Service Provider updated successfully!");
                                                                            }
                                                                            else {
                                                                                res.status(400).json("Updation failed!");
                                                                            }
                                                                        })
                                                                            .catch(function (error) {
                                                                            return res.status(500).json({ error: error });
                                                                        });
                                                                    }
                                                                }
                                                                else {
                                                                    req.body.IsBlocked = false;
                                                                    return _this.favService
                                                                        .createFavoriteSp(req.body)
                                                                        .then(function (favSp) {
                                                                        if (favSp) {
                                                                            return res.status(200).json("Favourite Service Provider created successfully!");
                                                                        }
                                                                        return res.status(400).json("Creation failed!");
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
                                                        else if (req.body.IsFavorite === false) {
                                                            next();
                                                        }
                                                        else {
                                                            return res.status(400).json("Not found!");
                                                        }
                                                    }
                                                    else {
                                                        return res.status(404).json("Service Provider not worked with customer in past!");
                                                    }
                                                }
                                                else {
                                                    return res.status(404).json("There is no helper worked with you in past!");
                                                }
                                            }
                                            else {
                                                return res.status(404).json("Service not exists!");
                                            }
                                        })
                                            .catch(function (error) {
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {
                                        return res.status(404).json("User not exists!");
                                    }
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
                    return [2 /*return*/, res.status(400).json("Some error occurred!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.removeFavSp = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.favService
                                .findByEmail(user.Email)
                                .then(function (user) {
                                if (user) {
                                    if (user.UserTypeId === 1) {
                                        return _this.favService
                                            .findFavoriteSp(user.UserId, +req.params.spId)
                                            .then(function (fav) {
                                            if (fav) {
                                                if (fav === null || fav === void 0 ? void 0 : fav.IsFavorite) {
                                                    return _this.favService
                                                        .updateFavoriteSp(req.body)
                                                        .then(function (favSp) {
                                                        if (favSp) {
                                                            return res.status(200).json("Service Provider updated successfully!");
                                                        }
                                                        else {
                                                            return res.status(400).json("Updation failed!");
                                                        }
                                                    })
                                                        .catch(function (error) {
                                                        return res.status(500).json({ error: error });
                                                    });
                                                }
                                                else if ((fav === null || fav === void 0 ? void 0 : fav.IsFavorite) === false) {
                                                    return res.status(400).json("Service Provider already in unfavourite list!");
                                                }
                                                else {
                                                    return res.status(404).json("No helper exists to remove!");
                                                }
                                            }
                                            else {
                                                return res.status(404).json("No helper exists!");
                                            }
                                        })
                                            .catch(function (error) {
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {
                                        return res.status(404).json("User not exists!");
                                    }
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
                    return [2 /*return*/, res.status(400).json("Some error occurred!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.blockSP = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.favService
                                .findByEmail(user.Email)
                                .then(function (user) {
                                if (user) {
                                    if (user.UserTypeId === 1) {
                                        req.body.UserId = user.UserId;
                                        req.body.TargetUserId = req.params.spId;
                                        return _this.favService
                                            .findServiceById(user.UserId)
                                            .then(function (service) {
                                            var helperId = _this.favService.findAllSpIdWorkedWithCustInPast(service);
                                            if (helperId.length > 0) {
                                                var spArray = helperId.includes(parseInt(req.params.spId));
                                                if (spArray) {
                                                    if (req.body.IsBlocked) {
                                                        return _this.favService
                                                            .findFavoriteSp(user.UserId, req.body.TargetUserId)
                                                            .then(function (helper) {
                                                            if (helper) {
                                                                if (helper.IsBlocked) {
                                                                    return res.status(400).json("Service Provider already in blocked list!");
                                                                }
                                                                else {
                                                                    return _this.favService
                                                                        .updateBlockedSp(req.body)
                                                                        .then(function (sp) {
                                                                        if (sp.length > 0) {
                                                                            return res.status(200).json("Service Provider added in blocked list!");
                                                                        }
                                                                        else {
                                                                            return res.status(400).json("Failure in adding Service Provider to the blocked list!");
                                                                        }
                                                                    })
                                                                        .catch(function (error) {
                                                                        return res.status(500).json({ error: error });
                                                                    });
                                                                }
                                                            }
                                                            else {
                                                                req.body.IsFavorite = false;
                                                                return _this.favService
                                                                    .createFavoriteSp(req.body)
                                                                    .then(function (blockedSP) {
                                                                    if (blockedSP) {
                                                                        return res.status(200).json("Blocked Service Provider created successfully!");
                                                                    }
                                                                    else {
                                                                        return res.status(400).json("Failure in creating blocked Service Provider!");
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
                                                    else if (req.body.IsBlocked === false) {
                                                        next();
                                                    }
                                                    else {
                                                        return res.status(404).json("Not found!");
                                                    }
                                                }
                                                else {
                                                    return res.status(404).json("Service Provider not worked with customer in past!");
                                                }
                                            }
                                            else {
                                                return res.status(404).json("There is no helper worked with you in past!");
                                            }
                                        })
                                            .catch(function (error) {
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {
                                        return res.status(404).json("User not exists!");
                                    }
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
                    return [2 /*return*/, res.status(400).json("Some error occurred!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.removeBlockedSp = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
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
                            return _this.favService
                                .findByEmail(user.Email)
                                .then(function (user) {
                                if (user) {
                                    if (user.UserTypeId === 1) {
                                        return _this.favService
                                            .findFavoriteSp(user.UserId, req.body.TargetUserId)
                                            .then(function (blocked) {
                                            if (blocked) {
                                                if (blocked === null || blocked === void 0 ? void 0 : blocked.IsBlocked) {
                                                    return _this.favService
                                                        .updateBlockedSp(req.body)
                                                        .then(function (blockedSp) {
                                                        if (blockedSp) {
                                                            return res.status(200).json("Blocked Service Provider updated successfully!");
                                                        }
                                                        else {
                                                            return res.status(400).json("Updation failed!");
                                                        }
                                                    })
                                                        .catch(function (error) {
                                                        return res.status(500).json({ error: error });
                                                    });
                                                }
                                                else if ((blocked === null || blocked === void 0 ? void 0 : blocked.IsBlocked) === false) {
                                                    return res.status(400).json("Service Provider already in unblocked list!");
                                                }
                                                else {
                                                    return res.status(404).json("No helper exists to remove!");
                                                }
                                            }
                                            else {
                                                return res.status(404).json("No helper exists!");
                                            }
                                        })
                                            .catch(function (error) {
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {
                                        return res.status(404).json("User not exists!");
                                    }
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
                    return [2 /*return*/, res.status(400).json("Some error occurred!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.favService = favService;
    }
    return FavController;
}());
exports.FavController = FavController;
