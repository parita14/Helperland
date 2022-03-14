"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var dashboard_repository_1 = require("../../customer-pages/dashboard/dashboard.repository");
var dashboard_model_1 = require("../../customer-pages/dashboard/dashboard.model");
var dashboard_service_1 = require("../../customer-pages/dashboard/dashboard.service");
var dashboard_controller_1 = require("../../customer-pages/dashboard/dashboard.controller");
var login_repository_1 = require("../../sign-up/login/login.repository");
var login_service_1 = require("../../sign-up/login/login.service");
var login_controller_1 = require("../../sign-up/login/login.controller");
var rescheduleAdd = dashboard_model_1.DashboardSchema.rescheduleAdd, cancleAdd = dashboard_model_1.DashboardSchema.cancleAdd;
var dashboardRouter = express_1.default.Router();
var loginRepo = new login_repository_1.LogInRepository();
var loginService = new login_service_1.LogInService(loginRepo);
var loginController = new login_controller_1.LogInController(loginService);
var repo = new dashboard_repository_1.DashboardRepository();
var service = new dashboard_service_1.DashboardService(repo);
var controller = new dashboard_controller_1.DashboardController(service);
/**
 * @swagger
 *  definitions:
 *   Reschedule:
 *    type: object
 *    properties:
 *     ServiceStartDate:
 *      type: date
 *      description: Service Start Date
 *      example: "2022-03-08"
 *     ServiceStartTime:
 *      type: string
 *      description: Service Start Time
 *      example: "11:00"
 *   Cancle:
 *    type: object
 *    properties:
 *     Reason:
 *      type: string
 *      description: Reason for cancelling service
 *      example: "Due to emergency"
 */
/**
 * @swagger
 * /get-future-service-request:
 *  get:
 *   summary: Get Dashboard
 *   description: Get Dashboard
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
dashboardRouter.get('/get-future-service-request', loginController.validateToken, controller.dashboard);
/**
 * @swagger
 * /get-future-service-request/{ServiceId}:
 *  get:
 *   summary: Dashboard Service Pop up
 *   description: Dashboard Service Pop up
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
dashboardRouter.get('/get-future-service-request/:ServiceId', loginController.validateToken, controller.getServiceById);
/**
 * @swagger
 * /reschedule-service/{ServiceId}:
 *  post:
 *   summary: Reschedule Service
 *   description: Reschedule Service
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: ServiceId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Reschedule'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
dashboardRouter.post('/reschedule-service/:ServiceId', (0, celebrate_1.celebrate)(rescheduleAdd), loginController.validateToken, controller.rescheduleService, controller.rescheduleIfTimeSlotNotConflicts);
/**
 * @swagger
 * /cancle-service-request/{ServiceId}:
 *  post:
 *   summary: Cancle Service
 *   description: Cancle Service
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: ServiceId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Cancle'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
dashboardRouter.post('/cancle-service-request/:ServiceId', (0, celebrate_1.celebrate)(cancleAdd), loginController.validateToken, controller.cancleServiceRequest);
module.exports = dashboardRouter;
