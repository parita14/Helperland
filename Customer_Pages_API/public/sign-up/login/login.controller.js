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
exports.LogInController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
require('dotenv').config();
var LogInController = /** @class */ (function () {
    function LogInController(loginService) {
        var _this = this;
        this.loginService = loginService;
        this.logIn = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var Email, Password;
            var _this = this;
            return __generator(this, function (_a) {
                Email = req.body.Email;
                Password = req.body.Password;
                if (!Email) {
                    return [2 /*return*/, res.status(400).json("Please write all required fields!")];
                }
                else if (!Password) {
                    return [2 /*return*/, res.status(400).json("Please write all required fields!")];
                }
                return [2 /*return*/, this.loginService
                        .findUsersByEmail(Email)
                        .then(function (user) {
                        if (!user) {
                            return res.status(404).json("User not exist, Please Sign Up first!");
                        }
                        else if (user.IsRegisteredUser !== true) {
                            return res.status(400).json("Please activate your account!");
                        }
                        else if (user.IsActive !== true) {
                            return res.status(400).json("Please activate your account!");
                        }
                        else {
                            bcryptjs_1.default
                                .compare(Password, user.Password)
                                .then(function (doMatch) { return __awaiter(_this, void 0, void 0, function () {
                                var token;
                                return __generator(this, function (_a) {
                                    if (doMatch) {
                                        token = this.loginService.generateToken(user.Email);
                                        if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 1) {
                                            return [2 /*return*/, res
                                                    .status(200)
                                                    .cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 600000) })
                                                    .json({ message: "Customer named ".concat(user.FirstName, " is Logged In Successfully"), token: token })];
                                        }
                                        else if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 2) {
                                            return [2 /*return*/, res
                                                    .status(200)
                                                    .cookie("token", token, { httpOnly: true, expires: new Date(Date.now() + 600000) })
                                                    .json({ message: "Service Provider named ".concat(user.FirstName, " is Logged In Successfully"), token: token })];
                                        }
                                    }
                                    else {
                                        return [2 /*return*/, res.status(400).json("Password is not matching, Please write correct password!")];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })
                                .catch(function (error) {
                                return res.status(500).json(error);
                            });
                        }
                    })
                        .catch(function (error) {
                        return res.status(500).json(error);
                    })];
            });
        }); };
        this.validateToken = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.headers.authorization;
                if (token == null) {
                    return [2 /*return*/, res.status(401).json("Invalid login credentials!")];
                }
                jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (error, decodedToken) {
                    if (error) {
                        return res.status(400).json("Invalid login credentials!!");
                    }
                    var Email = decodedToken.Email;
                    if (Email) {
                        return _this.loginService
                            .findUsersByEmail(Email)
                            .then(function (user) {
                            if (user === null) {
                                return res.status(404).json("User not found!");
                            }
                            else {
                                next();
                            }
                        })
                            .catch(function (error) {
                            return res.status(500).json({ error: error });
                        });
                    }
                    else {
                        return res.json("Some error occurred!");
                    }
                });
                return [2 /*return*/];
            });
        }); };
        this.logout = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    res.clearCookie('token');
                    return [2 /*return*/, res.status(200).json("You Logged Out Successfully!")];
                }
                catch (error) {
                    return [2 /*return*/, res.status(401).json("Log Out Process Failed!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.loginService = loginService;
    }
    return LogInController;
}());
exports.LogInController = LogInController;
