import express from "express";
import { celebrate } from "celebrate";
import { PasswordRepository } from "../../2)sign-up/forgot-password/password.repository";
import { PasswordSchema } from "../../2)sign-up/forgot-password/password.model";
import { PasswordService } from "../../2)sign-up/forgot-password/password.service";
import { PasswordController } from "../../2)sign-up/forgot-password/password.controller";

const { forgotAdd, resetAdd } = PasswordSchema;
const passwordRouter: express.Router = express.Router();

const repo: PasswordRepository = new PasswordRepository();
const service: PasswordService = new PasswordService(repo);
const controller: PasswordController = new PasswordController(service);

/**
 * @swagger
 * definitions:
 *  forgotPassword:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of user
 *     example: 'customer@yopmail.com'
 *  resetPassword:
 *   type: object
 *   properties:
 *    NewPassword:
 *     type: string
 *     description: Password of customer
 *     example: '1234'
 *    ConfirmPassword:
 *     type: string
 *     description: Confirmed Password of customer
 *     example: '1234'
 */

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
 *      description: Success
 *     500:
 *      description: Failure
 */
 passwordRouter.post('/forgot-password', celebrate(forgotAdd), controller.forgotPassword);

 /**
 * @swagger
 * /reset-password/{resetToken}:
 *  post:
 *   summary: reset password of users
 *   description: reset password of users
 *   requestBody:
 *    content: 
 *     application/json:
 *      schema:
 *       $ref: '#definitions/resetPassword'
 *   parameters:
 *    - in: path
 *      name: resetToken
 *      schema: 
 *       type: string
 *      required: true
 *      description: reset password token
 *   responses:
 *    200:
 *     description: Success 
 *    500:
 *     description: Failure
 */
 passwordRouter.post('/reset-password/:resetToken', celebrate(resetAdd), controller.resetPassword);

 export = passwordRouter;
