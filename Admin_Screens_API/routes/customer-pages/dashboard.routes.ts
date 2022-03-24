import express from "express";
import { celebrate } from "celebrate";

import { DashboardRepository } from "../../customer-pages/dashboard/dashboard.repository";
import { DashboardSchema } from "../../customer-pages/dashboard/dashboard.model";
import { DashboardService } from "../../customer-pages/dashboard/dashboard.service";
import { DashboardController } from "../../customer-pages/dashboard/dashboard.controller";

import { LogInRepository } from "../../sign-up/login/login.repository";
import { LogInService } from "../../sign-up/login/login.service";
import { LogInController } from "../../sign-up/login/login.controller";

const { rescheduleAdd, cancleAdd } = DashboardSchema;
const dashboardRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: DashboardRepository = new DashboardRepository();
const service: DashboardService = new DashboardService(repo);
const controller: DashboardController = new DashboardController(service);

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
dashboardRouter.post('/reschedule-service/:ServiceId', celebrate(rescheduleAdd), loginController.validateToken, controller.rescheduleService, controller.rescheduleIfTimeSlotNotConflicts);

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
dashboardRouter.post('/cancle-service-request/:ServiceId', celebrate(cancleAdd), loginController.validateToken, controller.cancleServiceRequest);

export = dashboardRouter;