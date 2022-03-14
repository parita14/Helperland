import express from "express";

import { SpHistoryRepository } from "../../service-provider-screens/sp-service-history/history.repository"; 
import { SpHistoryService } from "../../service-provider-screens/sp-service-history/history.service";
import { SpHistoryController } from "../../service-provider-screens/sp-service-history/history.controller";

import { LogInRepository } from "../../sign-up/login/login.repository";
import { LogInService } from "../../sign-up/login/login.service";
import { LogInController } from "../../sign-up/login/login.controller";

const spHistoryRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: SpHistoryRepository = new SpHistoryRepository();
const service: SpHistoryService = new SpHistoryService(repo);
const controller: SpHistoryController = new SpHistoryController(service);

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
spHistoryRouter.get('/export-sp-history',loginController.validateToken, controller.export);

export = spHistoryRouter;