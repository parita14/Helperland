"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var customer_repository_1 = require("../customer/customer.repository");
var customer_model_1 = require("../customer/customer.model");
var customer_service_1 = require("../customer/customer.service");
var customer_controller_1 = require("../customer/customer.controller");
var get = customer_model_1.CustomerSchema.get, add = customer_model_1.CustomerSchema.add;
var custRouter = express_1.default.Router();
var repo = new customer_repository_1.CustomerRepository();
var service = new customer_service_1.CustomerService(repo);
var controller = new customer_controller_1.CustomerController(service);
/**
 * @swagger
 * definitions:
 *  SignUpCust:
 *   type: object
 *   properties:
 *    FirstName:
 *     type: string
 *     description: First name of customer
 *     example: 'Parita'
 *    LastName:
 *     type: string
 *     description: Last name of customer
 *     example: 'Solanki'
 *    Email:
 *     type: string
 *     description: Email of customer
 *     example: 'parita14@gmail.com'
 *    Password:
 *     type: string
 *     description: Password of customer
 *     example: 'parita14'
 *    ConfirmPassword:
 *     type: string
 *     description: Confirmed Password of customer
 *     example: 'parita14'
 *    Mobile:
 *     type: string
 *     description: Mobile number of customer
 *     example: '9988776655'
 *  activateCust:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of customer
 *     example: 'parita14@gmail.com'
 */
/**
 * @swagger
 * /signup/customer:
 *   post:
 *    summary: creact customer
 *    description: create customer
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/SignUpCust'
 *    responses:
 *     200:
 *      description: customer created successfully
 *     500:
 *      description: failure in creating customer
 */
custRouter.post('/signup/customer', controller.createCustomer);
/**
 * @swagger
 * /users:
 *  get:
 *   summary: get all users
 *   description: get all users
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: error
 */
custRouter.get('/users', controller.getUsers);
/**
 * @swagger
 * /users/{UserId}:
 *  get:
 *   summary: get users by Id
 *   description: get users by Id
 *   parameters:
 *    - in: path
 *      name: UserId
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of users
 *      example: 1
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: failure
 */
custRouter.get('/users/:UserId', controller.getUsersById);
module.exports = custRouter;
