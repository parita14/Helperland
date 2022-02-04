"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var login_repository_1 = require("../login/login.repository");
var login_model_1 = require("../login/login.model");
var login_service_1 = require("../login/login.service");
var login_controller_1 = require("../login/login.controller");
var add = login_model_1.LogInSchema.add;
var LogInRouter = express_1.default.Router();
var repo = new login_repository_1.LogInRepository();
var service = new login_service_1.LogInService(repo);
var controller = new login_controller_1.LogInController(service);
/**
 * @swagger
 * definitions:
 *  LogIn:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of user
 *     example: 'parita14@gmail.com'
 *    Password:
 *     type: string
 *     description: Password of user
 *     example: 'parita14'
 *  activate:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of user
 *     example: 'parita14@gmail.com'
 *  forgotPassword:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of user
 *     example: 'parita14@gmail.com'
 *  resetPassword:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of user
 *     example: 'parita14@gmail.com'
 *    NewPassword:
 *     type: string
 *     description: Password of customer
 *     example: 'parita14'
 *    ConfirmPassword:
 *     type: string
 *     description: Confirmed Password of customer
 *     example: 'parita14'
 */
/**
 * @swagger
 * /login:
 *   post:
 *    summary: login
 *    description: login
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/LogIn'
 *    responses:
 *     200:
 *      description: user logged in successfully
 *     500:
 *      description: failure in login
 */
LogInRouter.post('/login', controller.logIn);
/**
* @swagger
* /activate/{token}:
*  post:
*   summary: activate users
*   description: activate users
*   requestBody:
*    content:
*     application/json:
*      schema:
*       $ref: '#definitions/activate'
*   parameters:
*    - in: path
*      name: token
*      schema:
*       type: string
*      required: true
*      description: token of user
*      example: 123456
*   responses:
*    200:
*     description: success
*    500:
*     description: failure
*/
LogInRouter.post('/activate/:token', controller.activateCustomer);
/**
 * @swagger
 * /forgot-password:
 *   post:
 *    summary: forgot password
 *    description: forgot password
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/forgotPassword'
 *    responses:
 *     200:
 *      description: user logged in successfully
 *     500:
 *      description: failure in login
 */
LogInRouter.post('/forgot-password', controller.forgotPassword);
/**
* @swagger
* /reset-password/{token}:
*  post:
*   summary: reset password of users
*   description: reset password of activate users
*   requestBody:
*    content:
*     application/json:
*      schema:
*       $ref: '#definitions/resetPassword'
*   parameters:
*    - in: path
*      name: token
*      schema:
*       type: string
*      required: true
*      description: token of user
*      example: 123456
*   responses:
*    200:
*     description: success
*    500:
*     description: failure
*/
LogInRouter.post('/reset-password/:token', controller.resetPassword);
module.exports = LogInRouter;
