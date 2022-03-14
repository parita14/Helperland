"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var settings_repository_1 = require("../../customer-pages/my-settings/settings.repository");
var settings_model_1 = require("../../customer-pages/my-settings/settings.model");
var settings_service_1 = require("../../customer-pages/my-settings/settings.service");
var settings_controller_1 = require("../../customer-pages/my-settings/settings.controller");
var login_repository_1 = require("../../sign-up/login/login.repository");
var login_service_1 = require("../../sign-up/login/login.service");
var login_controller_1 = require("../../sign-up/login/login.controller");
var detailsAdd = settings_model_1.SettingsSchema.detailsAdd, createAddress = settings_model_1.SettingsSchema.createAddress, addressAdd = settings_model_1.SettingsSchema.addressAdd, passwordAdd = settings_model_1.SettingsSchema.passwordAdd;
var settingsRouter = express_1.default.Router();
var loginRepo = new login_repository_1.LogInRepository();
var loginService = new login_service_1.LogInService(loginRepo);
var loginController = new login_controller_1.LogInController(loginService);
var repo = new settings_repository_1.SettingsRepository();
var service = new settings_service_1.SettingsService(repo);
var controller = new settings_controller_1.SettingsController(service);
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
settingsRouter.put('/update-user-details', (0, celebrate_1.celebrate)(detailsAdd), loginController.validateToken, controller.updateUserDetails);
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
settingsRouter.post('/create-user-address', (0, celebrate_1.celebrate)(createAddress), loginController.validateToken, controller.createUserAddress);
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
settingsRouter.put('/update-user-address/:AddressId', (0, celebrate_1.celebrate)(addressAdd), loginController.validateToken, controller.updateUserAddress);
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
settingsRouter.put('/change-user-password', (0, celebrate_1.celebrate)(passwordAdd), loginController.validateToken, controller.changePassword);
module.exports = settingsRouter;
