"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var upcoming_repository_1 = require("../../service-provider-screens/upcoming-services/upcoming.repository");
var upcoming_model_1 = require("../../service-provider-screens/upcoming-services/upcoming.model");
var upcoming_service_1 = require("../../service-provider-screens/upcoming-services/upcoming.service");
var upcoming_controller_1 = require("../../service-provider-screens/upcoming-services/upcoming.controller");
var login_repository_1 = require("../../sign-up/login/login.repository");
var login_service_1 = require("../../sign-up/login/login.service");
var login_controller_1 = require("../../sign-up/login/login.controller");
var cancleAdd = upcoming_model_1.UpcomingSchema.cancleAdd;
var upcomingServiceRouter = express_1.default.Router();
var loginRepo = new login_repository_1.LogInRepository();
var loginService = new login_service_1.LogInService(loginRepo);
var loginController = new login_controller_1.LogInController(loginService);
var repo = new upcoming_repository_1.UpcomingRepository();
var service = new upcoming_service_1.UpcomingService(repo);
var controller = new upcoming_controller_1.UpcomingController(service);
/**
 * @swagger
 *  definitions:
 *   CancleBySP:
 *    type: object
 *    properties:
 *     Reason:
 *      type: string
 *      description: Reason for cancelling service
 *      example: "Due to emergency"
 */
/**
 * @swagger
 * /get-upcoming-service-request:
 *  get:
 *   summary: SP Upcoming Service Request
 *   description: SP Upcoming Service Request
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
upcomingServiceRouter.get('/get-upcoming-service-request', loginController.validateToken, controller.upcomingServices);
/**
 * @swagger
 * /get-upcoming-service-request/{ServiceId}:
 *  get:
 *   summary: SP Upcoming Service Pop up
 *   description: SP Upcoming Service Pop up
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
upcomingServiceRouter.get('/get-upcoming-service-request/:ServiceId', loginController.validateToken, controller.getServiceById);
/**
 * @swagger
 * /cancle-service-request-by-SP/{ServiceId}:
 *  post:
 *   summary: Cancle Service by SP
 *   description: Cancle Service by SP
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
 *       $ref: '#/definitions/CancleBySP'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
upcomingServiceRouter.post('/cancle-service-request-by-SP/:ServiceId', (0, celebrate_1.celebrate)(cancleAdd), loginController.validateToken, controller.cancleServiceRequest);
/**
 * @swagger
 * /complete-service-requests/{ServiceId}:
 *  put:
 *   summary: Complete Service Requests
 *   description: Complete Service Requests
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
upcomingServiceRouter.put('/complete-service-requests/:ServiceId', loginController.validateToken, controller.completeService);
module.exports = upcomingServiceRouter;
