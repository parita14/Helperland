"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var sp_repository_1 = require("../../2)sign-up/service-provider/sp.repository");
var sp_models_1 = require("../../2)sign-up/service-provider/sp.models");
var sp_service_1 = require("../../2)sign-up/service-provider/sp.service");
var sp_controller_1 = require("../../2)sign-up/service-provider/sp.controller");
var get = sp_models_1.SPSchema.get, spAdd = sp_models_1.SPSchema.spAdd, activateAdd = sp_models_1.SPSchema.activateAdd;
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
SPRouter.post('/signup/SP', celebrate_1.celebrate(spAdd), controller.createSP);
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
SPRouter.post('/activate/service-provider/:token', celebrate_1.celebrate(activateAdd), controller.activateHelper);
module.exports = SPRouter;
