import express from "express";
import { celebrate } from "celebrate";
import { SPRepository } from "../service provider/sp.repository";
import { SPSchema } from "../service provider/sp.models";
import { SPService } from "../service provider/sp.service";
import { SPController } from "../service provider/sp.controller";

const { get, add } = SPSchema;
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
 *     type: string
 *     description: Mobile number of service provider
 *     example: '9988776655'
 *  activateSP:
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
 *      description: service provider created successfully
 *     500:
 *      description: failure in creating service provider
 */
 SPRouter.post('/signup/SP', controller.createSP);

 export = SPRouter;