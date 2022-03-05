import express from "express";
import { celebrate } from "celebrate";
import { ScheduleRepository } from "../../book-service/create service/schedule.repository";
import { ServiceRequestSchema } from "../../book-service/create service/schedule.model";
import { ScheduleService } from "../../book-service/create service/schedule.service";
import { ScheduleController } from "../../book-service/create service/schedule.controller";

import { LogInRepository } from "../../sign-up/login/login.repository";
import { LogInService } from "../../sign-up/login/login.service";
import { LogInController } from "../../sign-up/login/login.controller";

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
 *    ServiceId:
 *     type: integer
 *     description: Service Id
 *     example: 1
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
 *    HasPets:
 *     type: boolean
 *     descript: Has Pets
 *     example: false
 *    ServiceRequestAddress:
 *     type: object
 *      properties:
 *       AddressLine1:
 *        type: string
 *        description: address line 1
 *        example: '14, Satyam Nagar'
 *       AddressLine2:
 *        type: string
 *        description: address line 2
 *        example: 'Near Nagarwel Hanuman'
 *       City:
 *        type: string
 *        description: City
 *        example: 'Ahmedabad'
 *       State:
 *        type: string
 *        description: State
 *        example: 'Gujarat'
 *       PostalCode:
 *        type: integer
 *        description: Postal Code
 *        example: 380021
 *       Mobile:
 *        type: integer
 *        description: Mobile Number
 *        example: 9988776655
 *    ExtraService:
 *     type: array
 *     items:
 *      type: object
 *      properties:
 *       ServiceExtraId: integer
 *       description: Service Extra Id
 *       example: 1
 */

/**
 * @swagger
 * /schedule-plan:
 *   post:
 *    summary: Create service request
 *    description: Create service request
 *    securityDefinitions:
 *     JWT:
 *      schema:
 *      type: apiKey
 *      name: authorization
 *      in: header
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
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
scheduleRouter.get('/get-service-request-address', loginController.validateToken, controller.getServiceAddresses);

scheduleRouter.post('/create-Favorite-And-Block', loginController.validateToken, controller.createFAndB);

scheduleRouter.get('/get-favorite-And-Block', loginController.validateToken, controller.getFAndB);

export = scheduleRouter;