import express from "express";
import { celebrate } from "celebrate";
import { CustomerRepository } from "../../sign-up/customer/customer.repository";
import { CustomerSchema } from "../../sign-up/customer/customer.model";
import { CustomerService } from "../../sign-up/customer/customer.service";
import { CustomerController } from "../../sign-up/customer/customer.controller";
const { get, custAdd, activateAdd } = CustomerSchema;
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
 *     type: integer
 *     description: Mobile number of customer
 *     example: 9988776655
 *    ZipCode:
 *     type: integer
 *     description: ZipCode of customer
 *     example: 123456
 *  activate:
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
 *      description: Success
 *     500:
 *      description: Failure
 */
 custRouter.post('/signup/customer', celebrate(custAdd), controller.createCustomer);

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
 custRouter.post('/activate/customer/:token', celebrate(activateAdd), controller.activateCustomer);

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
 *     description: failure
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
 custRouter.get('/users/:UserId', celebrate(get), controller.getUsersById);

export = custRouter;