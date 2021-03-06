"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var customer_repository_1 = require("../../2)sign-up/customer/customer.repository");
var customer_model_1 = require("../../2)sign-up/customer/customer.model");
var customer_service_1 = require("../../2)sign-up/customer/customer.service");
var customer_controller_1 = require("../../2)sign-up/customer/customer.controller");
var get = customer_model_1.CustomerSchema.get, custAdd = customer_model_1.CustomerSchema.custAdd, activateAdd = customer_model_1.CustomerSchema.activateAdd;
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
 *     example: 'customer@yopmail.com'
 *    Password:
 *     type: string
 *     description: Password of customer
 *     example: 'parita'
 *    ConfirmPassword:
 *     type: string
 *     description: Confirmed Password of customer
 *     example: 'parita'
 *    Mobile:
 *     type: integer
 *     description: Mobile number of customer
 *     example: 9988776655
 *  activate:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of customer
 *     example: 'customer@yopmail.com'
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
 *      description: Success
 *     500:
 *      description: Failure
 */
custRouter.post('/signup/customer', celebrate_1.celebrate(custAdd), controller.createCustomer);
/**
 * @swagger
 * /activate/customer/{token}:
 *  post:
 *   summary: activate customer
 *   description: activate customer
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
 *      description: token of customer
 *   responses:
 *    200:
 *     description: success
 *    500:
 *     description: Failure
 */
custRouter.post('/activate/customer/:token', celebrate_1.celebrate(activateAdd), controller.activateCustomer);
module.exports = custRouter;
