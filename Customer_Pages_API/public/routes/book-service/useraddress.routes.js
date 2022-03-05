"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var address_repository_1 = require("../../book-service/user-address/address.repository");
var address_model_1 = require("../../book-service/user-address/address.model");
var address_service_1 = require("../../book-service/user-address/address.service");
var address_controller_1 = require("../../book-service/user-address/address.controller");
var login_repository_1 = require("../../sign-up/login/login.repository");
var login_service_1 = require("../../sign-up/login/login.service");
var login_controller_1 = require("../../sign-up/login/login.controller");
var addressAdd = address_model_1.UserAddressSchema.addressAdd;
var userAddressRouter = express_1.default.Router();
var loginRepo = new login_repository_1.LogInRepository();
var loginService = new login_service_1.LogInService(loginRepo);
var loginController = new login_controller_1.LogInController(loginService);
var repo = new address_repository_1.UserAddressRepository();
var service = new address_service_1.UserAddressService(repo);
var controller = new address_controller_1.UserAddressController(service);
/**
 * @swagger
 * definitions:
 *  UserAddress:
 *   type: object
 *   properties:
 *    AddressLine1:
 *     type: string
 *     description: address line 1
 *     example: '14, Satyam Nagar'
 *    AddressLine2:
 *     type: string
 *     description: address line 2
 *     example: 'Near Nagarwel Hanuman'
 *    City:
 *     type: string
 *     description: city
 *     example: 'Ahmedabad'
 *    State:
 *     type: string
 *     description: state
 *     example: 'Gujarat'
 *    Mobile:
 *     type: integer
 *     description: mobile number
 *     example: 9988776655
 */
/**
 * @swagger
 * /user-address:
 *   post:
 *    summary: Create Address
 *    description: Enter Address
 *    securityDefinitions:
 *     JWT:
 *      schema:
 *      type: apiKey
 *      name: authorization
 *      in: header
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#definitions/UserAddress'
 *    responses:
 *     200:
 *      description: Success
 *     500:
 *      description: Failure
 */
userAddressRouter.post('/user-address', (0, celebrate_1.celebrate)(addressAdd), loginController.validateToken, controller.UserAddress);
/**
 * @swagger
 * /get-user-addresses:
 *  get:
 *   summary: get user addresses
 *   description: get user addresses
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
userAddressRouter.get('/get-user-addresses', loginController.validateToken, controller.getAddresses);
module.exports = userAddressRouter;
