"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var service_repository_1 = require("../../5)service-provider-screens/new-service-requests/service.repository");
var service_service_1 = require("../../5)service-provider-screens/new-service-requests/service.service");
var service_controller_1 = require("../../5)service-provider-screens/new-service-requests/service.controller");
var login_repository_1 = require("../../2)sign-up/login/login.repository");
var login_service_1 = require("../../2)sign-up/login/login.service");
var login_controller_1 = require("../../2)sign-up/login/login.controller");
var newServiceRouter = express_1.default.Router();
var loginRepo = new login_repository_1.LogInRepository();
var loginService = new login_service_1.LogInService(loginRepo);
var loginController = new login_controller_1.LogInController(loginService);
var repo = new service_repository_1.ServiceRepository();
var service = new service_service_1.ServiceService(repo);
var controller = new service_controller_1.ServiceController(service);
/**
 * @swagger
 * /get-new-service-request:
 *  get:
 *   summary: SP New Service Request
 *   description: SP New Service Request
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
newServiceRouter.get('/get-new-service-request', loginController.validateToken, controller.newServices);
/**
 * @swagger
 * /get-new-service-request/{ServiceId}:
 *  get:
 *   summary: SP New Service Request Pop Up
 *   description: SP New Service Request Pop Up
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: ServiceId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
newServiceRouter.get('/get-new-service-request/:ServiceId', loginController.validateToken, controller.getServiceById);
/**
 * @swagger
 * /accept-service-request/{ServiceId}:
 *  put:
 *   summary: Accept Service Request
 *   description: Accept Service Request
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: ServiceId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
newServiceRouter.put('/accept-service-request/:ServiceId', loginController.validateToken, controller.acceptValidService, controller.acceptService);
module.exports = newServiceRouter;
