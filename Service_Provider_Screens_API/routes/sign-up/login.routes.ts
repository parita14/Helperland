import express from "express";
import { celebrate } from "celebrate";
import { LogInRepository } from "../../sign-up/login/login.repository";
import { LogInSchema } from "../../sign-up/login/login.model";
import { LogInService } from "../../sign-up/login/login.service";
import { LogInController } from "../../sign-up/login/login.controller";

const { loginAdd } = LogInSchema;
const LogInRouter: express.Router = express.Router();

const repo: LogInRepository = new LogInRepository();
const service: LogInService = new LogInService(repo);
const controller: LogInController = new LogInController(service);

/**
 * @swagger
 * definitions:
 *  LogIn: 
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of user
 *     example: 'customer@yopmail.com'
 *    Password:
 *     type: string
 *     description: Password of user
 *     example: 'parita'
 */

/**
 * @swagger
 * /login:
 *   post:
 *    summary: login
 *    description: login
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/LogIn'
 *    responses:
 *     200:
 *      description: Success
 *      cookie:
 *       token:
 *        schema:
 *         type: string
 *     500:
 *      description: Failure
 */
 LogInRouter.post('/login', celebrate(loginAdd), controller.logIn);

 /**
  * @swagger
  * /logout:
  *  delete:
  *   summary: Log Out
  *   description: Log Out
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
 LogInRouter.delete('/logout', controller.validateToken, controller.logout);

 export = LogInRouter;
