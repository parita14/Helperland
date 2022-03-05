import express from "express";
import { celebrate } from "celebrate";

import { UserAddressRepository } from "../../book-service/user-address/address.repository";
import { UserAddressSchema } from "../../book-service/user-address/address.model";
import { UserAddressService } from "../../book-service/user-address/address.service";
import { UserAddressController } from "../../book-service/user-address/address.controller";

import { LogInRepository } from "../../sign-up/login/login.repository";
import { LogInService } from "../../sign-up/login/login.service";
import { LogInController } from "../../sign-up/login/login.controller";

const { addressAdd } = UserAddressSchema;
const userAddressRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: UserAddressRepository = new UserAddressRepository();
const service: UserAddressService = new UserAddressService(repo);
const controller: UserAddressController = new UserAddressController(service);

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

userAddressRouter.post('/user-address', celebrate(addressAdd), loginController.validateToken, controller.UserAddress);

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

export = userAddressRouter;