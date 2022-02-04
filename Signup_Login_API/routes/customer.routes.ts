import express from "express";
import { celebrate } from "celebrate";
import { CustomerRepository } from "../customer/customer.repository";
import { CustomerSchema } from "../customer/customer.model";
import { CustomerService } from "../customer/customer.service";
import { CustomerController } from "../customer/customer.controller";

const { get, add } = CustomerSchema;
const custRouter: express.Router = express.Router();

const repo: CustomerRepository = new CustomerRepository();
const service: CustomerService = new CustomerService(repo);
const controller: CustomerController = new CustomerController(service);

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

export = custRouter;