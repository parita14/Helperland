"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var sp_repository_1 = require("../service provider/sp.repository");
var sp_models_1 = require("../service provider/sp.models");
var sp_service_1 = require("../service provider/sp.service");
var sp_controller_1 = require("../service provider/sp.controller");
var get = sp_models_1.SPSchema.get, add = sp_models_1.SPSchema.add;
var SPRouter = express_1.default.Router();
var repo = new sp_repository_1.SPRepository();
var service = new sp_service_1.SPService(repo);
var controller = new sp_controller_1.SPController(service);
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
module.exports = SPRouter;
