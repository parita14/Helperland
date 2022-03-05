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
exports.PasswordController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var mailgun_js_1 = __importDefault(require("mailgun-js"));
require('dotenv').config();
var DOMAIN = process.env.DOMAIN;
var mg = (0, mailgun_js_1.default)({ apiKey: process.env.API_KEY, domain: DOMAIN });
var saltRouds = 10;
var PasswordController = /** @class */ (function () {
    function PasswordController(passwordService) {
        var _this = this;
        this.passwordService = passwordService;
        this.forgotPassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var Email;
            var _this = this;
            return __generator(this, function (_a) {
                Email = req.body.Email;
                if (!Email) {
                    return [2 /*return*/, res.status(400).json("Please write all required fields!")];
                }
                return [2 /*return*/, this.passwordService
                        .findUsersByEmail(Email)
                        .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                        var resetToken, resetLink;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!user) {
                                        return [2 /*return*/, res.status(404).json("User is not exists with this email address!")];
                                    }
                                    resetToken = this.passwordService.generateToken(user.UserId);
                                    return [4 /*yield*/, this.passwordService.resetLink(user.Email, resetToken)];
                                case 1:
                                    resetLink = _a.sent();
                                    return [4 /*yield*/, mg.messages().send(resetLink)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/, res.status(200).json("An email has been sent to your account. Click on the link in received email to reset the password.")];
                            }
                        });
                    }); })
                        .catch(function (error) {
                        return res.status(500).json({ error: error });
                    })];
            });
        }); };
        this.resetPassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var resetToken;
            var _this = this;
            return __generator(this, function (_a) {
                resetToken = req.params.resetToken;
                if (!req.body.NewPassword) {
                    return [2 /*return*/, res.status(403).json("Please write all required fields!")];
                }
                else if (!req.body.ConfirmPassword) {
                    return [2 /*return*/, res.status(403).json("Please write all required fields!")];
                }
                if (resetToken) {
                    jsonwebtoken_1.default.verify(resetToken, process.env.FORGOT_PASSWORD, function (error, decodedToken) {
                        if (error) {
                            return res.status(401).json("Invalid or expired link!");
                        }
                        var UserId = decodedToken.UserId;
                        return _this.passwordService
                            .findUsersById(UserId)
                            .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var doMatch, _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        if (!user) {
                                            return [2 /*return*/, res.status(404).json("User is not exists with this id!")];
                                        }
                                        return [4 /*yield*/, bcryptjs_1.default.compare(req.body.NewPassword, user.Password)];
                                    case 1:
                                        doMatch = _b.sent();
                                        if (!doMatch) return [3 /*break*/, 2];
                                        return [2 /*return*/, res.status(400).json("Please choose different password!")];
                                    case 2:
                                        if (req.body.NewPassword !== req.body.ConfirmPassword) {
                                            return [2 /*return*/, res.status(400).json("Your password is not matching, Please write correct password!")];
                                        }
                                        _a = user;
                                        return [4 /*yield*/, bcryptjs_1.default.hash(req.body.NewPassword, saltRouds)];
                                    case 3:
                                        _a.Password = _b.sent();
                                        return [2 /*return*/, this.passwordService
                                                .resetPassword(user.Password, user.UserId)
                                                .then(function (user) {
                                                return res.status(200).json("Password updated successfully!");
                                            })
                                                .catch(function (error) {
                                                return res.status(500).json({ error: error });
                                            })];
                                }
                            });
                        }); })
                            .catch(function (error) {
                            return res.status(500).json({ error: error });
                        });
                    });
                }
                else {
                    return [2 /*return*/, res.status(400).json("Some error occurred!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.passwordService = passwordService;
    }
    return PasswordController;
}());
exports.PasswordController = PasswordController;
