"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var login_repository_1 = require("../../sign-up/login/login.repository");
var login_model_1 = require("../../sign-up/login/login.model");
var login_service_1 = require("../../sign-up/login/login.service");
var login_controller_1 = require("../../sign-up/login/login.controller");
var loginAdd = login_model_1.LogInSchema.loginAdd;
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
 *      description: Success
 *     500:
 *      description: Failure
 */
LogInRouter.post('/login', (0, celebrate_1.celebrate)(loginAdd), controller.logIn);
LogInRouter.delete('/logout', controller.validateToken, controller.logout);
module.exports = LogInRouter;
