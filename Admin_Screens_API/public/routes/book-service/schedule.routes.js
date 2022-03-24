"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var schedule_repository_1 = require("../../book-service/create service/schedule.repository");
var schedule_model_1 = require("../../book-service/create service/schedule.model");
var schedule_service_1 = require("../../book-service/create service/schedule.service");
var schedule_controller_1 = require("../../book-service/create service/schedule.controller");
var login_repository_1 = require("../../sign-up/login/login.repository");
var login_service_1 = require("../../sign-up/login/login.service");
var login_controller_1 = require("../../sign-up/login/login.controller");
var serviceAdd = schedule_model_1.ServiceRequestSchema.serviceAdd;
var scheduleRouter = express_1.default.Router();
var loginRepo = new login_repository_1.LogInRepository();
var loginService = new login_service_1.LogInService(loginRepo);
var loginController = new login_controller_1.LogInController(loginService);
var repo = new schedule_repository_1.ScheduleRepository();
var service = new schedule_service_1.ScheduleService(repo);
var controller = new schedule_controller_1.ScheduleController(service);
/**
 * @swagger
 * definitions:
 *  ServiceRequest:
 *   type: object
 *   properties:
 *    ServiceStartDate:
 *     type: date
 *     description: Service Start Date
 *     example: '2022-02-22'
 *    ServiceStartTime:
 *     type: string
 *     description: Service Start Time
 *     example: '11:00'
 *    ServiceHours:
 *     type: integer
 *     description: Service Hours
 *     example: 3
 *    Comments:
 *     type: string
 *     description: Comments
 *     example: 'I have pet'
 *    ServiceProviderId:
 *     type: integer
 *     description: Service Provider Id
 *     example: 1
 *    HasPets:
 *     type: boolean
 *     descript: Has Pets
 *     example: false
 *    HasIssue:
 *     type: boolean
 *     descript: Has Issue
 *     example: false
 *    ServiceRequestAddress:
 *     type: object
 *     properties:
 *      AddressLine1:
 *       type: string
 *       description: address line 1
 *       example: '14, Satyam Nagar'
 *      AddressLine2:
 *       type: string
 *       description: address line 2
 *       example: 'Near Nagarwel Hanuman'
 *      City:
 *       type: string
 *       description: City
 *       example: 'Ahmedabad'
 *      State:
 *       type: string
 *       description: State
 *       example: 'Gujarat'
 *      Mobile:
 *       type: integer
 *       description: Mobile Number
 *       example: 9988776655
 *    ExtraService:
 *     type: array
 *     items:
 *      type: object
 *      properties:
 *       ServiceExtraId:
 *        type: integer
 *        description: Service Extra Id
 *        example: 1
 *  CreateFav:
 *   type: object
 *   properties:
 *    TargetUserId:
 *     type: integer
 *     description: Target User Id
 *     example: 2
 *    IsFavorite:
 *     type: boolean
 *     description: Is Favorite
 *     example: true
 *    IsBlocked:
 *     type: boolean
 *     description: Is Blocked
 *     example: false
 */
/**
 * @swagger
 * /schedule-plan:
 *   post:
 *    summary: Create service request
 *    description: Create service request
 *    parameters:
 *     - in: header
 *       name: auth
 *       schema:
 *        type: string
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#definitions/ServiceRequest'
 *    responses:
 *     200:
 *      description: Success
 *     500:
 *      description: Failure
 */
scheduleRouter.post('/schedule-plan', celebrate_1.celebrate(serviceAdd), loginController.validateToken, controller.decodeToken, controller.createService);
/**
 * @swagger
 * /get-service-request-address:
 *  get:
 *   summary: get service request addresses
 *   description: get service request addresses
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
scheduleRouter.get('/get-service-request-address', loginController.validateToken, controller.getServiceAddresses);
/**
 * @swagger
 * /create-Favorite-And-Block:
 *   post:
 *    summary: Create Favourite and Blocked
 *    description: Create Favourite and Blocked
 *    parameters:
 *     - in: header
 *       name: auth
 *       schema:
 *        type: string
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#definitions/CreateFav'
 *    responses:
 *     200:
 *      description: Success
 *     500:
 *      description: Failure
 */
scheduleRouter.post('/create-Favorite-And-Block', loginController.validateToken, controller.createFAndB);
/**
 * @swagger
 * /get-favorite-And-Block:
 *  get:
 *   summary: Get Favourite and Blocked SP
 *   description: Get Favourite and Blocked SP
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
scheduleRouter.get('/get-favorite-And-Block', loginController.validateToken, controller.getFAndB);
module.exports = scheduleRouter;
