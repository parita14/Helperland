import express from "express";
import { celebrate } from "celebrate";
import { SPRepository } from "../../sign-up/service-provider/sp.repository";
import { SPSchema } from "../../sign-up/service-provider/sp.models";
import { SPService } from "../../sign-up/service-provider/sp.service";
import { SPController } from "../../sign-up/service-provider/sp.controller";

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
 *     example: 'Parita'
 *    LastName:
 *     type: string
 *     description: Last name of service provider
 *     example: 'Solanki'
 *    Email:
 *     type: string
 *     description: Email of service provider
 *     example: 'parita14@gmail.com'
 *    Password:
 *     type: string
 *     description: Password of service provider
 *     example: 'parita14'
 *    ConfirmPassword:
 *     type: string
 *     description: Confirmed Password of service provider
 *     example: 'parita14'
 *    Mobile:
 *     type: integer
 *     description: Mobile number of service provider
 *     example: 9988776655
 *    ZipCode:
 *     type: integer
 *     description: ZipCode of service provider
 *     example: 12345
 *  activate:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of service provider
 *     example: 'parita14@gmail.com'
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
 *       $ref: '#definitions/activate'
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