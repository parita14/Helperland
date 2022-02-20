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
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var body_parser_1 = __importDefault(require("body-parser"));
var models_1 = require("./models");
var multer_1 = __importDefault(require("multer"));
var contacts_routes_1 = __importDefault(require("./routes/contact-us/contacts.routes"));
var customer_routes_1 = __importDefault(require("./routes/sign-up/customer.routes"));
var sp_routes_1 = __importDefault(require("./routes/sign-up/sp.routes"));
var login_routes_1 = __importDefault(require("./routes/sign-up/login.routes"));
var password_routes_1 = __importDefault(require("./routes/sign-up/password.routes"));
var useraddress_routes_1 = __importDefault(require("./routes/book-service/useraddress.routes"));
var setService_routes_1 = __importDefault(require("./routes/book-service/setService.routes"));
var schedule_routes_1 = __importDefault(require("./routes/book-service/schedule.routes"));
var swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SignUp LogIn API',
            version: '1.0.0',
            description: 'SignUp LogIn API for Helperland Project',
            contact: {
                name: 'Parita Solanki',
                url: 'http://web1.anasource.com/trainee2021/',
                email: 'helperland@tatvasoft.com'
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: [
        "public/routes/contact-us/contacts.routes.js",
        "public/routes/sign-up/sp.routes.js",
        "public/routes/sign-up/customer.routes.js",
        "public/routes/sign-up/login.routes.js",
        "public/routes/sign-up/password.routes.js",
        "public/routes/book-service/useraddress.routes.js",
        "public/routes/book-service/setService.routes.js",
        "public/routes/book-service/schedule.routes.js"
    ]
};
var swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, multer_1.default)({ dest: 'Files' }).single('file'));
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use('/', contacts_routes_1.default);
app.use('/', customer_routes_1.default);
app.use('/', sp_routes_1.default);
app.use('/', login_routes_1.default);
app.use('/', setService_routes_1.default);
app.use('/', password_routes_1.default);
app.use('/', schedule_routes_1.default);
app.use('/', useraddress_routes_1.default);
app.listen(process.env.PORT, function () {
    console.log("Server rocking at ".concat(process.env.PORT));
    models_1.sequelize.authenticate().then(function () { return __awaiter(void 0, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("database connected");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, models_1.sequelize.sync()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }).catch(function (e) {
        console.log(e.message);
    });
});
