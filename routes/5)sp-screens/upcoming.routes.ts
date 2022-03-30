import express from "express";
import { celebrate } from "celebrate";

import { UpcomingRepository } from "../../5)service-provider-screens/upcoming-services/upcoming.repository";
import { UpcomingSchema } from "../../5)service-provider-screens/upcoming-services/upcoming.model";
import { UpcomingService } from "../../5)service-provider-screens/upcoming-services/upcoming.service";
import { UpcomingController } from "../../5)service-provider-screens/upcoming-services/upcoming.controller";

import { LogInRepository } from "../../2)sign-up/login/login.repository";
import { LogInService } from "../../2)sign-up/login/login.service";
import { LogInController } from "../../2)sign-up/login/login.controller";

const { cancleAdd } = UpcomingSchema;
const upcomingServiceRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: UpcomingRepository = new UpcomingRepository();
const service: UpcomingService = new UpcomingService(repo);
const controller: UpcomingController = new UpcomingController(service);

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
upcomingServiceRouter.post('/cancle-service-request-by-SP/:ServiceId', celebrate(cancleAdd), loginController.validateToken, controller.cancleServiceRequest);

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

export = upcomingServiceRouter;