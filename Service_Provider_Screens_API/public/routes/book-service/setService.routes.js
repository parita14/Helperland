"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var setService_repository_1 = require("../../book-service/setup-service/setService.repository");
var setService_models_1 = require("../../book-service/setup-service/setService.models");
var setService_service_1 = require("../../book-service/setup-service/setService.service");
var setService_controller_1 = require("../../book-service/setup-service/setService.controller");
var login_repository_1 = require("../../sign-up/login/login.repository");
var login_service_1 = require("../../sign-up/login/login.service");
var login_controller_1 = require("../../sign-up/login/login.controller");
var zipAdd = setService_models_1.ServiceSchema.zipAdd;
var serviceRouter = express_1.default.Router();
var loginRepo = new login_repository_1.LogInRepository();
var loginService = new login_service_1.LogInService(loginRepo);
var loginController = new login_controller_1.LogInController(loginService);
var repo = new setService_repository_1.ServiceRepository();
var service = new setService_service_1.ServiceService(repo);
var controller = new setService_controller_1.ServiceController(service);
/**
 * @swagger
 * definitions:
 *  ZipCode:
 *   type: object
 *   properties:
 *    ZipCode:
 *     type: integer
 *     description: ZipCode
 *     example: 380021
 */
/**
 * @swagger
 * /set-service:
 *   post:
 *    summary: Check ZipCode
 *    description: Enter ZipCode
 *    parameters:
 *     - in: header
 *       name: auth
 *       schema:
 *        type: string
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#definitions/ZipCode'
 *    responses:
 *     200:
 *      description: Success
 *     500:
 *      description: Failure
 */
serviceRouter.post('/set-service', (0, celebrate_1.celebrate)(zipAdd), loginController.validateToken, controller.setService);
module.exports = serviceRouter;
