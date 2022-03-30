"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var settings_repository_1 = require("../../5)service-provider-screens/sp-settings/settings.repository");
var settings_model_1 = require("../../5)service-provider-screens/sp-settings/settings.model");
var settings_service_1 = require("../../5)service-provider-screens/sp-settings/settings.service");
var settings_controller_1 = require("../../5)service-provider-screens/sp-settings/settings.controller");
var login_repository_1 = require("../../2)sign-up/login/login.repository");
var login_service_1 = require("../../2)sign-up/login/login.service");
var login_controller_1 = require("../../2)sign-up/login/login.controller");
var detailsAdd = settings_model_1.SettingsSchema.detailsAdd, passwordAdd = settings_model_1.SettingsSchema.passwordAdd;
var spSettingsRouter = express_1.default.Router();
var loginRepo = new login_repository_1.LogInRepository();
var loginService = new login_service_1.LogInService(loginRepo);
var loginController = new login_controller_1.LogInController(loginService);
var repo = new settings_repository_1.SettingsRepository();
var service = new settings_service_1.SettingsService(repo);
var controller = new settings_controller_1.SettingsController(service);
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
spSettingsRouter.put('/update-sp-details', celebrate_1.celebrate(detailsAdd), loginController.validateToken, controller.updateSPDetails);
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
spSettingsRouter.put('/change-sp-password', celebrate_1.celebrate(passwordAdd), loginController.validateToken, controller.changePassword);
module.exports = spSettingsRouter;
