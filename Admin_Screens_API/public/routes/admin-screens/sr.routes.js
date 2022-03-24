"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var sr_repository_1 = require("../../Admin-screens/service-requests/sr.repository");
var sr_model_1 = require("../../Admin-screens/service-requests/sr.model");
var sr_service_1 = require("../../Admin-screens/service-requests/sr.service");
var sr_controller_1 = require("../../Admin-screens/service-requests/sr.controller");
var login_repository_1 = require("../../sign-up/login/login.repository");
var login_service_1 = require("../../sign-up/login/login.service");
var login_controller_1 = require("../../sign-up/login/login.controller");
var srRouter = express_1.default.Router();
var ServiceAdd = sr_model_1.srSchema.ServiceAdd, RescheduleAdd = sr_model_1.srSchema.RescheduleAdd;
var loginRepo = new login_repository_1.LogInRepository();
var loginService = new login_service_1.LogInService(loginRepo);
var loginController = new login_controller_1.LogInController(loginService);
var repo = new sr_repository_1.srRepository();
var service = new sr_service_1.srService(repo);
var controller = new sr_controller_1.srController(service);
/**
 * @swagger
 * definitions:
 *  ServiceFilter:
 *   type: object
 *   properties:
 *    ServiceId:
 *     type: integer
 *     description: ServiceId of Service Request
 *     example: 1753
 *    ZipCode:
 *     type: integer
 *     description: ZipCode of Service Request
 *     example: 380021
 *    Email:
 *     type: string
 *     description: Email of User
 *     example: 'customer@yopmail.com'
 *    CustomerName:
 *     type: string
 *     description: Customer Name
 *     example: 'Customer 1'
 *    HelperName:
 *     type: string
 *     description: Helper Name
 *     example: 'Darshan Diwan'
 *    Status:
 *     type: string
 *     description: Status of Service Request
 *     example: 'Completed'
 *    HasIssue:
 *     type: boolean
 *     description: Has Issue
 *     example: true
 *    FromDate:
 *     type: date
 *     descript: FromDate
 *     example: '2022-03-10'
 *    ToDate:
 *     type: date
 *     descript: ToDate
 *     example: '2022-03-20'
 *  Reschedule:
 *    type: object
 *    properties:
 *     ServiceStartDate:
 *      type: date
 *      description: Service Start Date
 *      example: "2022-03-30"
 *     ServiceStartTime:
 *      type: string
 *      description: Service Start Time
 *      example: "11:00:00"
 *     Address:
 *      type: object
 *      properties:
 *       AddressLine1:
 *        type: string
 *        description: address line 1
 *        example: '14/303'
 *       AddressLine2:
 *        type: string
 *        description: address line 2
 *        example: 'Satyam Nagar'
 *       PostalCode:
 *        type: integer
 *        description: Postal Code
 *        example: 380021
 *       City:
 *        type: string
 *        description: City
 *        example: 'Ahmedabad'
 */
/**
 * @swagger
 * /get-all-service-requests:
 *  post:
 *   summary: Admin Service Requests Screen
 *   description: Admin Service Requests Screen
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ServiceFilter'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
srRouter.post('/get-all-service-requests', celebrate_1.celebrate(ServiceAdd), loginController.validateToken, controller.serviceRequests);
/**
 * @swagger
 * /reschedule-service-request/{ServiceRequestId}:
 *  post:
 *   summary: Reschedule Service Request
 *   description: Reschedule Service Request
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
 *       $ref: '#/definitions/Reschedule'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
srRouter.post('/reschedule-service-request/:ServiceRequestId', celebrate_1.celebrate(RescheduleAdd), loginController.validateToken, controller.rescheduleIfTimeSlotNotConflicts, controller.RescheduleWithAddress);
/**
 * @swagger
 * /cancel-service-request/{ServiceId}:
 *  delete:
 *   summary: Cancle Service Request
 *   description: Cancle Service Request
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
srRouter.delete('/cancel-service-request/:ServiceId', loginController.validateToken, controller.cancleServiceRequest);
module.exports = srRouter;
