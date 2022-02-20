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
 *     example: 'parita14@gmail.com'
 *    Password:
 *     type: string
 *     description: Password of user
 *     example: 'parita14'
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
 *      description: user logged in successfully
 *     500:
 *      description: failure in login
 */
 LogInRouter.post('/login', celebrate(loginAdd), controller.logIn);

 LogInRouter.delete('/logout', controller.logout);

 export = LogInRouter;
