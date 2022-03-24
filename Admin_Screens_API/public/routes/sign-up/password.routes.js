"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var password_repository_1 = require("../../sign-up/forgot-password/password.repository");
var password_model_1 = require("../../sign-up/forgot-password/password.model");
var password_service_1 = require("../../sign-up/forgot-password/password.service");
var password_controller_1 = require("../../sign-up/forgot-password/password.controller");
var forgotAdd = password_model_1.PasswordSchema.forgotAdd, resetAdd = password_model_1.PasswordSchema.resetAdd;
var passwordRouter = express_1.default.Router();
var repo = new password_repository_1.PasswordRepository();
var service = new password_service_1.PasswordService(repo);
var controller = new password_controller_1.PasswordController(service);
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
passwordRouter.post('/forgot-password', celebrate_1.celebrate(forgotAdd), controller.forgotPassword);
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
passwordRouter.post('/reset-password/:resetToken', celebrate_1.celebrate(resetAdd), controller.resetPassword);
module.exports = passwordRouter;
