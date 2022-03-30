import express from "express";
import { celebrate } from "celebrate";
import { SPRepository } from "../../2)sign-up/service-provider/sp.repository";
import { SPSchema } from "../../2)sign-up/service-provider/sp.models";
import { SPService } from "../../2)sign-up/service-provider/sp.service";
import { SPController } from "../../2)sign-up/service-provider/sp.controller";

const { get, spAdd, activateAdd } = SPSchema;
const SPRouter: express.Router = express.Router();

const repo: SPRepository = new SPRepository();
const service: SPService = new SPService(repo);
const controller: SPController = new SPController(service);

/**
 * @swagger
 * definitions:
 *  SignUpSP:
 *   type: object
 *   properties:
 *    FirstName:
 *     type: string
 *     description: First name of service provider
 *     example: 'Service'
 *    LastName:
 *     type: string
 *     description: Last name of service provider
 *     example: 'Provider'
 *    Email:
 *     type: string
 *     description: Email of service provider
 *     example: 'helper@yopmail.com'
 *    Password:
 *     type: string
 *     description: Password of service provider
 *     example: '1234'
 *    ConfirmPassword:
 *     type: string
 *     description: Confirmed Password of service provider
 *     example: '1234'
 *    Mobile:
 *     type: integer
 *     description: Mobile number of service provider
 *     example: 9988776655
 *  activateSP:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of service provider
 *     example: 'helper@yopmail.com'
 */

/**
 * @swagger
 * /signup/SP:
 *   post:
 *    summary: creact service provider
 *    description: create service provider
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/SignUpSP'
 *    responses:
 *     200:
 *      description: Success
 *     500:
 *      description: Failure
 */
 SPRouter.post('/signup/SP', celebrate(spAdd), controller.createSP);

/**
 * @swagger
 * /activate/service-provider/{token}:
 *  post:
 *   summary: activate service provider
 *   description: activate service provider
 *   requestBody:
 *    content: 
 *     application/json:
 *      schema:
 *       $ref: '#definitions/activateSP'
 *   parameters:
 *    - in: path
 *      name: token
 *      schema:
 *       type: string
 *      required: true
 *      description: token of service provider
 *   responses:
 *    200:
 *     description: Success 
 *    500:
 *     description: Failure
 */
 SPRouter.post('/activate/service-provider/:token', celebrate(activateAdd), controller.activateHelper);

 export = SPRouter;