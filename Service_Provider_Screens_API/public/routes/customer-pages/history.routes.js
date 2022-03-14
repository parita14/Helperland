"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var history_repository_1 = require("../../customer-pages/service-history/history.repository");
var history_model_1 = require("../../customer-pages/service-history/history.model");
var history_service_1 = require("../../customer-pages/service-history/history.service");
var history_controller_1 = require("../../customer-pages/service-history/history.controller");
var login_repository_1 = require("../../sign-up/login/login.repository");
var login_service_1 = require("../../sign-up/login/login.service");
var login_controller_1 = require("../../sign-up/login/login.controller");
var ratingAdd = history_model_1.HistorySchema.ratingAdd;
var historyRouter = express_1.default.Router();
var loginRepo = new login_repository_1.LogInRepository();
var loginService = new login_service_1.LogInService(loginRepo);
var loginController = new login_controller_1.LogInController(loginService);
var repo = new history_repository_1.HistoryRepository();
var service = new history_service_1.HistoryService(repo);
var controller = new history_controller_1.HistoryController(service);
/**
 * @swagger
 *  definitions:
 *   Ratings:
 *    type: object
 *    properties:
 *     OnTimeArrival:
 *      type: float
 *      description: On Time Arrival
 *      example: 3.5
 *     Friendly:
 *      type: float
 *      description: Friendly
 *      example: 4.0
 *     QualityOfService:
 *      type: float
 *      description: Quality of Service
 *      example: 4.5
 *     Comments:
 *      type: string
 *      description: Comments
 *      example: "Service is very good"
 */
/**
 * @swagger
 * /get-past-service-request:
 *  get:
 *   summary: Get Service History
 *   description: Get Service History
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
historyRouter.get('/get-past-service-request', loginController.validateToken, controller.history);
/**
 * @swagger
 * /get-past-service-request/{ServiceId}:
 *  get:
 *   summary: Service History Pop up
 *   description: Service History Pop up
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
historyRouter.get('/get-past-service-request/:ServiceId', loginController.validateToken, controller.getServiceById);
/**
 * @swagger
 * /give-ratings/{ServiceRequestId}:
 *  post:
 *   summary: Give Ratings
 *   description: Give Ratings
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: ServiceRequestId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Ratings'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
historyRouter.post('/give-ratings/:ServiceRequestId', (0, celebrate_1.celebrate)(ratingAdd), loginController.validateToken, controller.giveRatings);
/**
 * @swagger
 * /export:
 *  get:
 *   summary: Export Service History
 *   description: Export Service History
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
historyRouter.get('/export', loginController.validateToken, controller.export);
module.exports = historyRouter;
