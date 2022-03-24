import express from "express";
import { celebrate } from "celebrate";

import { SettingsRepository } from "../../service-provider-screens/sp-settings/settings.repository";
import { SettingsSchema } from "../../service-provider-screens/sp-settings/settings.model";
import { SettingsService } from "../../service-provider-screens/sp-settings/settings.service";
import { SettingsController } from "../../service-provider-screens/sp-settings/settings.controller";

import { LogInRepository } from "../../sign-up/login/login.repository";
import { LogInService } from "../../sign-up/login/login.service";
import { LogInController } from "../../sign-up/login/login.controller";

const { detailsAdd, passwordAdd } = SettingsSchema;
const spSettingsRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: SettingsRepository = new SettingsRepository();
const service: SettingsService = new SettingsService(repo);
const controller: SettingsController = new SettingsController(service);


/**
 * @swagger
 *  definitions:
 *   updateSP:
 *    type: object
 *    properties:
 *     FirstName:
 *      type: string
 *      description: First name of customer
 *      example: 'Parita'
 *     LastName:
 *      type: string
 *      description: Last name of customer
 *      example: 'Solanki'
 *     Mobile:
 *      type: integer
 *      description: Mobile number of customer
 *      example: 9988776655
 *     DateOfBirth:
 *      type: date
 *      description: Date of Birth
 *      example: "2001-01-14"
 *     NationalityId:
 *      type: integer
 *      description: Nationality Id
 *      example: 1
 *     Gender:
 *      type: integer
 *      description: Gender
 *      example: 2
 *     UserProfilePicture:
 *      type: integer
 *      description: Avatar
 *      example: 1
 *     AddressLine1:
 *      type: string
 *      description: Street Name
 *      example: Satyam Nagar
 *     AddressLine2:
 *      type: string
 *      description: House Number
 *      example: 14/303
 *     PostalCode:
 *      type: integer
 *      description: PostalCode
 *      example: 380021
 *     City:
 *      type: string
 *      description: City
 *      example: Ahmedabad
 *   changeSPPassword:
 *    type: object
 *    properties:
 *     OldPassword:
 *      type: string
 *      description: Old Password
 *      example: "1234"
 *     NewPassword:
 *      type: string
 *      description: New Password
 *      example: "parita"
 *     ConfirmPassword:
 *      type: string
 *      description: Confirm Password
 *      example: "parita" 
 */

/**
 * @swagger
 * /get-sp-details:
 *  get:
 *   summary: Get SP Details
 *   description: Get SP Details
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
spSettingsRouter.get('/get-sp-details', loginController.validateToken, controller.getSpDetails);

/**
 * @swagger
 * /update-sp-details:
 *  put:
 *   summary: Update SP details
 *   description: Update SP details
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody: 
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/updateSP'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
spSettingsRouter.put('/update-sp-details', celebrate(detailsAdd), loginController.validateToken, controller.updateSPDetails);

/**
 * @swagger
 * /change-sp-password:
 *  put:
 *   summary: Change SP Password
 *   description: Change SP Password
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/changeSPPassword'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
spSettingsRouter.put('/change-sp-password', celebrate(passwordAdd), loginController.validateToken, controller.changePassword);

export = spSettingsRouter;