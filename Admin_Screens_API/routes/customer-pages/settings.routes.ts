import express from "express";
import { celebrate } from "celebrate";

import { SettingsRepository } from "../../customer-pages/my-settings/settings.repository";
import { SettingsSchema } from "../../customer-pages/my-settings/settings.model";
import { SettingsService } from "../../customer-pages/my-settings/settings.service"; 
import { SettingsController } from "../../customer-pages/my-settings/settings.controller"; 

import { LogInRepository } from "../../sign-up/login/login.repository";
import { LogInService } from "../../sign-up/login/login.service";
import { LogInController } from "../../sign-up/login/login.controller";

const { detailsAdd, createAddress, addressAdd, passwordAdd } = SettingsSchema;
const settingsRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: SettingsRepository = new SettingsRepository();
const service: SettingsService = new SettingsService(repo);
const controller: SettingsController = new SettingsController(service);

/**
 * @swagger
 *  definitions:
 *   updateCust:
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
 *     LanguageId:
 *      type: integer
 *      description: Language Id
 *      example: 1
 *   createAddress:
 *    type: object
 *    properties:
 *     AddressLine1:
 *      type: string
 *      description: Address Line 1
 *      example: "14/303, Satyam Nagar"
 *     AddressLine2:
 *      type: string
 *      description: Address Line 2
 *      example: "Near Nagarwel"
 *     City:
 *      type: string
 *      description: City
 *      example: "Ahmedabad"
 *     State:
 *      type: string
 *      description: State
 *      example: "Gujarat"
 *     PostalCode:
 *      type: integer
 *      description: Postal Code
 *      example: 380021
 *     Mobile:
 *      type: integer
 *      description: Mobile Number
 *      example: 9988776655
 *   updateAddress:
 *    type: object
 *    properties:
 *     AddressLine1:
 *      type: string
 *      description: Address Line 1
 *      example: "14/303, Satyam Nagar"
 *     AddressLine2:
 *      type: string
 *      description: Address Line 2
 *      example: "Near Nagarwel"
 *     City:
 *      type: string
 *      description: City
 *      example: "Ahmedabad"
 *     State:
 *      type: string
 *      description: State
 *      example: "Gujarat"
 *     Mobile:
 *      type: integer
 *      description: Mobile Number
 *      example: 9988776655
 *   changePassword:
 *    type: object
 *    properties:
 *     OldPassword:
 *      type: string
 *      description: Old Password
 *      example: "parita"
 *     NewPassword:
 *      type: string
 *      description: New Password
 *      example: "1234"
 *     ConfirmPassword:
 *      type: string
 *      description: Confirm Password
 *      example: "1234" 
 */

/**
 * @swagger
 * /get-user-details:
 *  get:
 *   summary: Get User Details
 *   description: Get User Details
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
settingsRouter.get('/get-user-details', loginController.validateToken, controller.getUserDetails);

/**
 * @swagger
 * /update-user-details:
 *  put:
 *   summary: Update Customer details
 *   description: Update Customer details
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody: 
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/updateCust'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
settingsRouter.put('/update-user-details', celebrate(detailsAdd), loginController.validateToken, controller.updateUserDetails);

/**
 * @swagger
 * /create-user-address:
 *  post:
 *   summary: Create user address
 *   description: Create user address
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/createAddress'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
settingsRouter.post('/create-user-address', celebrate(createAddress), loginController.validateToken, controller.createUserAddress);

/**
 * @swagger
 * /get-user-address:
 *  get:
 *   summary: Get User Address
 *   description: Get User Address
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
settingsRouter.get('/get-user-address', loginController.validateToken, controller.getUserAddress);

/**
 * @swagger
 * /get-address-by-AddressId/{AddressId}:
 *  get:
 *   summary: Get address by AddressId
 *   description: Get address by AddressId
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: AddressId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
settingsRouter.get('/get-address-by-AddressId/:AddressId', loginController.validateToken, controller.getAddressById);

/**
 * @swagger
 * /update-user-address/{AddressId}:
 *  put:
 *   summary: Update User address
 *   description: Update User address
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: AddressId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/updateAddress'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
settingsRouter.put('/update-user-address/:AddressId', celebrate(addressAdd), loginController.validateToken, controller.updateUserAddress);

/**
 * @swagger
 * /delete-user-address/{AddressId}:
 *  put:
 *   summary: Update User address
 *   description: Update User address
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: AddressId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
settingsRouter.put('/delete-user-address/:AddressId', loginController.validateToken, controller.deleteAddress);

/**
 * @swagger
 * /change-user-password:
 *  put:
 *   summary: Change User Password
 *   description: Change User Password
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/changePassword'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
settingsRouter.put('/change-user-password', celebrate(passwordAdd), loginController.validateToken, controller.changePassword);

export = settingsRouter;