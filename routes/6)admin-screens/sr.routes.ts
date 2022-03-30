import express from "express";
import { celebrate } from "celebrate";

import { srRepository } from "../../6)Admin-screens/service-requests/sr.repository"; 
import { srSchema } from "../../6)Admin-screens/service-requests/sr.model";
import { srService } from "../../6)Admin-screens/service-requests/sr.service";
import { srController } from "../../6)Admin-screens/service-requests/sr.controller";

import { LogInRepository } from "../../2)sign-up/login/login.repository";
import { LogInService } from "../../2)sign-up/login/login.service";
import { LogInController } from "../../2)sign-up/login/login.controller";

const srRouter: express.Router = express.Router();

const { ServiceAdd, RescheduleAdd, RefundAdd } = srSchema;

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: srRepository = new srRepository();
const service: srService = new srService(repo);
const controller: srController = new srController(service);

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
 *   type: object
 *   properties: 
 *    ServiceStartDate:
 *     type: date
 *     description: Service Start Date
 *     example: "2022-03-30"
 *    ServiceStartTime:
 *     type: string
 *     description: Service Start Time
 *     example: "11:00:00" 
 *    Address:
 *     type: object
 *     properties:
 *      AddressLine1:
 *       type: string
 *       description: address line 1
 *       example: '14/303'
 *      AddressLine2:
 *       type: string
 *       description: address line 2
 *       example: 'Satyam Nagar'
 *      PostalCode:
 *       type: integer
 *       description: Postal Code
 *       example: 380021
 *      City:
 *       type: string
 *       description: City
 *       example: 'Ahmedabad'
 *  Refund:
 *   type: object
 *   properties:
 *    Amount:
 *     type: number
 *     description: Amount
 *     example: 30
 *    Reason:
 *     type: string
 *     description: Reason
 *     example: 'Customer not satisfied'
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
srRouter.post('/get-all-service-requests', celebrate(ServiceAdd), loginController.validateToken, controller.serviceRequests);

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
srRouter.post('/reschedule-service-request/:ServiceRequestId', celebrate(RescheduleAdd), loginController.validateToken, controller.rescheduleIfTimeSlotNotConflicts, controller.RescheduleWithAddress);

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

 /**
 * @swagger
 * /refund-amount/{ServiceId}:
 *  put:
 *   summary: Refund Amount of Service
 *   description: Refund Amount of Service
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
 *       $ref: '#/definitions/Refund'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
 srRouter.put('/refund-amount/:ServiceId', celebrate(RefundAdd), loginController.validateToken, controller.RefundAmount);

export = srRouter;