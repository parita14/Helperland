import express from "express";
import { celebrate } from "celebrate";
import { CustomerRepository } from "../../2)sign-up/customer/customer.repository";
import { CustomerSchema } from "../../2)sign-up/customer/customer.model";
import { CustomerService } from "../../2)sign-up/customer/customer.service";
import { CustomerController } from "../../2)sign-up/customer/customer.controller";
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

export = custRouter;