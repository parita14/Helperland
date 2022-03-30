"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var user_repository_1 = require("../../6)Admin-screens/User-management/user.repository");
var user_model_1 = require("../../6)Admin-screens/User-management/user.model");
var user_service_1 = require("../../6)Admin-screens/User-management/user.service");
var user_controller_1 = require("../../6)Admin-screens/User-management/user.controller");
var login_repository_1 = require("../../2)sign-up/login/login.repository");
var login_service_1 = require("../../2)sign-up/login/login.service");
var login_controller_1 = require("../../2)sign-up/login/login.controller");
var userRouter = express_1.default.Router();
var userAdd = user_model_1.UserSchema.userAdd, activateAdd = user_model_1.UserSchema.activateAdd;
var loginRepo = new login_repository_1.LogInRepository();
var loginService = new login_service_1.LogInService(loginRepo);
var loginController = new login_controller_1.LogInController(loginService);
var repo = new user_repository_1.UserRepository();
var service = new user_service_1.UserService(repo);
var controller = new user_controller_1.UserController(service);
/**
 * @swagger
 * definitions:
 *  UserFilter:
 *   type: object
 *   properties:
 *    UserName:
 *     type: string
 *     description: Name of User
 *     example: 'Darshan Diwan'
 *    UserType:
 *     type: string
 *     description: Type of User
 *     example: 'Service Provider'
 *    Phone:
 *     type: string
 *     description: Phone of User
 *     example: '1122778899'
 *    PostalCode:
 *     type: integer
 *     description: PostalCode
 *     example: '380021'
 *    Email:
 *     type: string
 *     description: Email of User
 *     example: 'pricetracker916@gmail.com'
 *    FromDate:
 *     type: date
 *     descript: FromDate
 *     example: '2022-03-10'
 *    ToDate:
 *     type: date
 *     descript: ToDate
 *     example: '2022-03-25'
 *  Activate:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of User
 *     example: 'customer@yopmail.com'
 */
/**
 * @swagger
 * /admin/get-all-users:
 *  post:
 *   summary: Get All Users
 *   description: Get All Users
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UserFilter'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
userRouter.post('/admin/get-all-users', celebrate_1.celebrate(userAdd), loginController.validateToken, controller.getAllUsers);
/**
 * @swagger
 * /admin/activate-deactivate-users:
 *  put:
 *   summary: Actiate-Deactivate Users
 *   description: Actiate-Deactivate Users
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Activate'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
userRouter.put('/admin/activate-deactivate-users', celebrate_1.celebrate(activateAdd), loginController.validateToken, controller.updateUserStatus);
/**
 * @swagger
 * /admin/export-users:
 *  get:
 *   summary: Export All Users
 *   description: Export All Users
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
userRouter.get('/admin/export-users', loginController.validateToken, controller.export);
module.exports = userRouter;
