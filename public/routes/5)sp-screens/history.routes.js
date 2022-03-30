"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var history_repository_1 = require("../../5)service-provider-screens/sp-service-history/history.repository");
var history_service_1 = require("../../5)service-provider-screens/sp-service-history/history.service");
var history_controller_1 = require("../../5)service-provider-screens/sp-service-history/history.controller");
var login_repository_1 = require("../../2)sign-up/login/login.repository");
var login_service_1 = require("../../2)sign-up/login/login.service");
var login_controller_1 = require("../../2)sign-up/login/login.controller");
var spHistoryRouter = express_1.default.Router();
var loginRepo = new login_repository_1.LogInRepository();
var loginService = new login_service_1.LogInService(loginRepo);
var loginController = new login_controller_1.LogInController(loginService);
var repo = new history_repository_1.SpHistoryRepository();
var service = new history_service_1.SpHistoryService(repo);
var controller = new history_controller_1.SpHistoryController(service);
/**
 * @swagger
 * /get-sp-history:
 *  get:
 *   summary: Get SP Service History
 *   description: Get SP Service History
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
spHistoryRouter.get('/get-sp-history', loginController.validateToken, controller.spHistory);
/**
 * @swagger
 * /get-sp-history/{ServiceId}:
 *  get:
 *   summary: SP Service History Pop Up
 *   description: SP Service History Pop Up
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
spHistoryRouter.get('/get-sp-history/:ServiceId', loginController.validateToken, controller.getServiceById);
/**
 * @swagger
 * /export-sp-history:
 *  get:
 *   summary: Export SP Service History
 *   description: Export SP Service History
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
spHistoryRouter.get('/export-sp-history', loginController.validateToken, controller.export);
module.exports = spHistoryRouter;
