import express from "express";
import { celebrate } from "celebrate";

import { rAndbRepository } from "../../service-provider-screens/ratings-&-block/r&b.repository";
import { rAndbSchema } from "../../service-provider-screens/ratings-&-block/r&b.model";
import { rAndbService } from "../../service-provider-screens/ratings-&-block/r&b.service";
import { rAndbController } from "../../service-provider-screens/ratings-&-block/r&b.controller";

import { LogInRepository } from "../../sign-up/login/login.repository";
import { LogInService } from "../../sign-up/login/login.service";
import { LogInController } from "../../sign-up/login/login.controller";

const { blockAdd } = rAndbSchema;
const rAndbRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: rAndbRepository = new rAndbRepository();
const service: rAndbService = new rAndbService(repo);
const controller: rAndbController = new rAndbController(service);

/**
 * @swagger
 *  definitions:
 *   Blocked:
 *    type: object
 *    properties:
 *     IsBlocked:
 *      type: boolean
 *      description: Is Blocked
 *      example: true  
 */

/**
 * @swagger
 * /get-all-ratings:
 *  get:
 *   summary: Get SP Ratings
 *   description: Get SP Ratings
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
rAndbRouter.get('/get-all-ratings', loginController.validateToken, controller.getAllRatings);

/**
 * @swagger
 * /get-all-cust-sp-had-worked-for:
 *  get:
 *   summary: Get all customer SP had worked for
 *   description: Get all customer SP had worked for
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
rAndbRouter.get('/get-all-cust-sp-had-worked-for', loginController.validateToken, controller.custSpHadWorkedFor);

/**
 * @swagger
 * /create-blocked-customer/{custId}:
 *  post:
 *   summary: Create blocked customer
 *   description: Create blocked customer
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: custId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Blocked'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
rAndbRouter.post('/create-blocked-customer/:custId', celebrate(blockAdd), loginController.validateToken, controller.blockCust, controller.removeBlockedCust);

export = rAndbRouter;