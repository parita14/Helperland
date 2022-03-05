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
exports.SPController = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var mailgun_js_1 = __importDefault(require("mailgun-js"));
require('dotenv').config();
var DOMAIN = process.env.DOMAIN;
var mg = (0, mailgun_js_1.default)({ apiKey: process.env.API_KEY, domain: DOMAIN });
var saltRouds = 10;
var SPController = /** @class */ (function () {
    function SPController(spService) {
        var _this = this;
        this.spService = spService;
        this.createSP = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var isSame;
            var _this = this;
            return __generator(this, function (_a) {
                isSame = req.body.Password === req.body.ConfirmPassword;
                if (!req.body.Email) {
                    return [2 /*return*/, res.status(400).json("Please write all required fields!")];
                }
                if (!req.body.Password) {
                    return [2 /*return*/, res.status(400).json("Please write all required fields!")];
                }
                return [2 /*return*/, this.spService
                        .findSPByEmail(req.body.Email)
                        .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, emailToken, activateLink;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (user) {
                                        return [2 /*return*/, res.status(400).json("User exists, try Login instead or try with another email address!")];
                                    }
                                    if (!isSame) {
                                        return [2 /*return*/, res.status(400).json("Password is not matching, please write correct password!")];
                                    }
                                    _a = req.body;
                                    return [4 /*yield*/, bcryptjs_1.default.hash(req.body.Password, saltRouds)];
                                case 1:
                                    _a.Password = _b.sent();
                                    emailToken = this.spService.generateToken(req.body.Email);
                                    return [4 /*yield*/, this.spService.activateLink(req.body.Email, emailToken)];
                                case 2:
                                    activateLink = _b.sent();
                                    return [4 /*yield*/, mg.messages().send(activateLink)];
                                case 3:
                                    _b.sent();
                                    return [2 /*return*/, this.spService
                                            .createSP(req.body)
                                            .then(function (user) {
                                            return res.status(200).json("Registration Success, Please verify your account within 2 hours!");
                                        })
                                            .catch(function (error) {
                                            return res.status(500).json({ error: error });
                                        })];
                            }
                        });
                    }); })
                        .catch(function (error) {
                        return res.status(500).json(error);
                    })];
            });
        }); };
        this.activateHelper = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var token;
            var _this = this;
            return __generator(this, function (_a) {
                token = req.params.token;
                if (token) {
                    jsonwebtoken_1.default.verify(token, process.env.ACTIVATION_LINK, function (error, decodedToken) {
                        if (error) {
                            return res.status(400).json("Invalid or Expired link!");
                        }
                        var Email = decodedToken.Email;
                        if (Email) {
                            return _this.spService
                                .findSPByEmail(Email)
                                .then(function (helper) {
                                if (helper) {
                                    if (helper.IsRegisteredUser === true) {
                                        return res.status(200).json("Your account is already activated!");
                                    }
                                    if (helper.Email === req.body.Email) {
                                        helper.IsRegisteredUser = true;
                                        helper.IsActive = true;
                                        return _this.spService
                                            .activateHelper(helper.IsRegisteredUser, helper.IsActive, helper.Email)
                                            .then(function (helper) {
                                            return res.status(200).json("Your account activated successfully!");
                                        })
                                            .catch(function (error) {
                                            return res.status(500).json({ error: error });
                                        });
                                    }
                                    else {
                                        return res.status(400).json("write correct Email address!");
                                    }
                                }
                                return res.status(400).json("Some error occurred!");
                            })
                                .catch(function (error) {
                                return res.status(500).json({ error: error });
                            });
                        }
                        return res.status(400).json("Some error occurred!");
                    });
                }
                else {
                    return [2 /*return*/, res.status(400).json("token not exists!")];
                }
                return [2 /*return*/];
            });
        }); };
        this.spService = spService;
    }
    return SPController;
}());
exports.SPController = SPController;
