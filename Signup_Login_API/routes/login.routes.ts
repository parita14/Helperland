import express from "express";
import { celebrate } from "celebrate";
import { LogInRepository } from "../login/login.repository";
import { LogInSchema } from "../login/login.model";
import { LogInService } from "../login/login.service";
import { LogInController } from "../login/login.controller";

const { add } = LogInSchema;
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
 *  activate:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of user
 *     example: 'parita14@gmail.com'
 *  forgotPassword:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of user
 *     example: 'parita14@gmail.com'
 *  resetPassword:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of user
 *     example: 'parita14@gmail.com'
 *    NewPassword:
 *     type: string
 *     description: Password of customer
 *     example: 'parita14'
 *    ConfirmPassword:
 *     type: string
 *     description: Confirmed Password of customer
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
 LogInRouter.post('/login', controller.logIn);


 /**
 * @swagger
 * /activate/{token}:
 *  post:
 *   summary: activate users
 *   description: activate users
 *   requestBody:
 *    content: 
 *     application/json:
 *      schema:
 *       $ref: '#definitions/activate'
 *   parameters:
 *    - in: path
 *      name: token
 *      schema:
 *       type: string
 *      required: true
 *      description: token of user
 *      example: 123456
 *   responses:
 *    200:
 *     description: success 
 *    500:
 *     description: failure
 */
 LogInRouter.post('/activate/:token', controller.activateCustomer);

/**
 * @swagger
 * /forgot-password:
 *   post:
 *    summary: forgot password
 *    description: forgot password
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/forgotPassword'
 *    responses:
 *     200:
 *      description: user logged in successfully
 *     500:
 *      description: failure in login
 */
 LogInRouter.post('/forgot-password', controller.forgotPassword);

 /**
 * @swagger
 * /reset-password/{token}:
 *  post:
 *   summary: reset password of users
 *   description: reset password of activate users
 *   requestBody:
 *    content: 
 *     application/json:
 *      schema:
 *       $ref: '#definitions/resetPassword'
 *   parameters:
 *    - in: path
 *      name: token
 *      schema:
 *       type: string
 *      required: true
 *      description: token of user
 *      example: 123456
 *   responses:
 *    200:
 *     description: success 
 *    500:
 *     description: failure
 */
 LogInRouter.post('/reset-password/:token', controller.resetPassword);

 export = LogInRouter;
