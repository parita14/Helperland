import express from "express";

import { ServiceRepository } from "../../5)service-provider-screens/new-service-requests/service.repository";
import { ServiceService } from "../../5)service-provider-screens/new-service-requests/service.service";
import { ServiceController } from "../../5)service-provider-screens/new-service-requests/service.controller";

import { LogInRepository } from "../../2)sign-up/login/login.repository";
import { LogInService } from "../../2)sign-up/login/login.service";
import { LogInController } from "../../2)sign-up/login/login.controller";

const newServiceRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: ServiceRepository = new ServiceRepository();
const service: ServiceService = new ServiceService(repo);
const controller: ServiceController = new ServiceController(service);

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

export = newServiceRouter;