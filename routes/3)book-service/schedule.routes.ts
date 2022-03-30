import express from "express";
import { celebrate } from "celebrate";
import { ScheduleRepository } from "../../3)book-service/create service/schedule.repository";
import { ServiceRequestSchema } from "../../3)book-service/create service/schedule.model";
import { ScheduleService } from "../../3)book-service/create service/schedule.service";
import { ScheduleController } from "../../3)book-service/create service/schedule.controller";

import { LogInRepository } from "../../2)sign-up/login/login.repository";
import { LogInService } from "../../2)sign-up/login/login.service";
import { LogInController } from "../../2)sign-up/login/login.controller";

const { serviceAdd } = ServiceRequestSchema;

const scheduleRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: ScheduleRepository = new ScheduleRepository();
const service: ScheduleService = new ScheduleService(repo);
const controller: ScheduleController = new ScheduleController(service);

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

scheduleRouter.post('/schedule-plan', celebrate(serviceAdd), loginController.validateToken, controller.decodeToken, controller.createService);

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

export = scheduleRouter;