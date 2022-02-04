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
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var mailgun_js_1 = __importDefault(require("mailgun-js"));
var DOMAIN = 'sandbox95ed9a33e16a4d37826b4d80df84cf49.mailgun.org';
var mg = mailgun_js_1.default({ apiKey: 'f7729eb1e723a00d0e223afad8e00907-c250c684-90a175b4', domain: DOMAIN });
var saltRouds = 10;
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
                return [2 /*return*/, this.loginService
                        .findUsersByEmail(Email)
                        .then(function (user) {
                        if (!user) {
                            return res.status(404).json("User not exist, Please Sign Up first!");
                        }
                        if (user.IsRegisteredUser !== true) {
                            return res.status(404).json("User is not registered, activate your account!");
                        }
                        if (user.IsApproved !== true) {
                            return res.status(404).json("User is not approved!");
                        }
                        if (user.IsActive !== true) {
                            return res.status(404).json("User is not active, You must verify your email to activate your account");
                        }
                        else {
                            bcryptjs_1.default
                                .compare(Password, user.Password)
                                .then(function (doMatch) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    if (doMatch) {
                                        return [2 /*return*/, this.loginService
                                                .logIn(req.body)
                                                .then(function (user) {
                                                if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 1) {
                                                    res.status(200).json("Customer named " + user.FirstName + " is Logged In Successfully");
                                                }
                                                else if ((user === null || user === void 0 ? void 0 : user.UserTypeId) === 2) {
                                                    res.status(200).json("Service Provider named " + user.FirstName + " is Logged In Successfully");
                                                }
                                            })
                                                .catch(function (error) {
                                                return res.status(500).json({ error: error });
                                            })];
                                    }
                                    else {
                                        return [2 /*return*/, res.status(404).json("Password is not matching, Please write correct password!")];
                                    }
                                    return [2 /*return*/];
                                });
                            }); })
                                .catch(function (error) {
                                return res.status(500).json({ error: error });
                            });
                        }
                    })
                        .catch(function (error) {
                        return res.status(500).json({ error: error });
                    })];
            });
        }); };
        this.activateCustomer = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var Email, token;
            var _this = this;
            return __generator(this, function (_a) {
                Email = req.body.Email;
                token = req.params.token;
                return [2 /*return*/, this.loginService
                        .findUsersByEmail(Email)
                        .then(function (user) {
                        if (!user) {
                            return res.status(404).json("User is not registered or token expired!");
                        }
                        if (user.IsActive == true) {
                            return res.json("User is already activated!");
                        }
                        if (user) {
                            if (token !== (user === null || user === void 0 ? void 0 : user.emailToken)) {
                                return res.status(404).json("Your activation link is incorrect!");
                            }
                            else {
                                user.IsRegisteredUser = true;
                                user.IsActive = true;
                                return _this.loginService
                                    .activateCustomer(user.IsRegisteredUser, user.IsActive, user.Email)
                                    .then(function (user) {
                                    return res.status(200).json(" Your Account activated Successfully");
                                })
                                    .catch(function (error) {
                                    return res.status(500).json({ error: error });
                                });
                            }
                        }
                    })
                        .catch(function (error) {
                        return res.status(500).json({ error: error });
                    })];
            });
        }); };
        this.forgotPassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var Email;
            var _this = this;
            return __generator(this, function (_a) {
                Email = req.body.Email;
                return [2 /*return*/, this.loginService
                        .findUsersByEmail(Email)
                        .then(function (user) {
                        if (!user) {
                            return res.status(404).json("User is not exists with this email address!");
                        }
                        var code = Math.floor(100000 + Math.random() * 900000);
                        var expiry = Date.now() + 60 * 1000 * 60;
                        var sendCode = {
                            from: 'helperland@gmail.com',
                            to: req.body.Email,
                            subject: 'Reset Password',
                            html: "<!DOCTYPE>\n                   <html>\n                   <body>\n                   <p>Your reset password link is: </p> \n                   <p>Click here to<a href=\"http://localhost:3000/reset-password/" + code + "\"> Reset </a>your account password</p>\n                   </body>\n                   </html>"
                        };
                        mg.messages().send(sendCode);
                        req.body.resetPasswordToken = code;
                        req.body.resetPasswordExpires = new Date(expiry);
                        return _this.loginService
                            .forgotPassword(req.body.resetPasswordToken, req.body.resetPasswordExpires, user.Email)
                            .then(function (user) {
                            return res.status(200).json("An email has been sent to your account. Click on the link in received email to reset the password.");
                        })
                            .catch(function (error) {
                            return res.status(500).json({ error: error });
                        });
                    })
                        .catch(function (error) {
                        return res.status(500).json({ error: error });
                    })];
            });
        }); };
        this.resetPassword = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var Email, NewPassword, ConfirmPassword, resetPasswordToken;
            var _this = this;
            return __generator(this, function (_a) {
                Email = req.body.Email;
                NewPassword = req.body.NewPassword;
                ConfirmPassword = req.body.ConfirmPassword;
                resetPasswordToken = req.params.token;
                if (!Email || !NewPassword || !ConfirmPassword) {
                    return [2 /*return*/, res.status(403).json("Couldn't process request. Please provide all mandatory fields!")];
                }
                return [2 /*return*/, this.loginService
                        .findUsersByEmail(Email)
                        .then(function (user) { return __awaiter(_this, void 0, void 0, function () {
                        var hash;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!user) {
                                        return [2 /*return*/, res.status(404).json("User is not exists with this email address!")];
                                    }
                                    if (!(resetPasswordToken !== user.resetPasswordToken)) return [3 /*break*/, 1];
                                    return [2 /*return*/, res.status(404).json("Your reset password link is incorrect!")];
                                case 1:
                                    if (NewPassword !== ConfirmPassword) {
                                        return [2 /*return*/, res.status(401).json("Password is not matching, please write correct password!")];
                                    }
                                    return [4 /*yield*/, bcryptjs_1.default.hash(NewPassword, saltRouds)];
                                case 2:
                                    hash = _a.sent();
                                    user.Password = hash;
                                    return [2 /*return*/, this.loginService
                                            .resetPassword(user.Password, user.Email)
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
                    })];
            });
        }); };
        this.loginService = loginService;
    }
    return LogInController;
}());
exports.LogInController = LogInController;
