import express from "express";
import { celebrate } from "celebrate";

import { HistoryRepository } from "../../customer-pages/service-history/history.repository";
import { HistorySchema } from "../../customer-pages/service-history/history.model";
import { HistoryService } from "../../customer-pages/service-history/history.service";
import { HistoryController } from "../../customer-pages/service-history/history.controller";

import { LogInRepository } from "../../sign-up/login/login.repository";
import { LogInService } from "../../sign-up/login/login.service";
import { LogInController } from "../../sign-up/login/login.controller";

const { ratingAdd } = HistorySchema;
const historyRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: HistoryRepository = new HistoryRepository();
const service: HistoryService = new HistoryService(repo);
const controller: HistoryController = new HistoryController(service);

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
historyRouter.post('/give-ratings/:ServiceRequestId', celebrate(ratingAdd), loginController.validateToken, controller.giveRatings);

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

export = historyRouter;