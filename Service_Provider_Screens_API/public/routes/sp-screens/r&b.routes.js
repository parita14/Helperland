"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var r_b_repository_1 = require("../../service-provider-screens/ratings-&-block/r&b.repository");
var r_b_model_1 = require("../../service-provider-screens/ratings-&-block/r&b.model");
var r_b_service_1 = require("../../service-provider-screens/ratings-&-block/r&b.service");
var r_b_controller_1 = require("../../service-provider-screens/ratings-&-block/r&b.controller");
var login_repository_1 = require("../../sign-up/login/login.repository");
var login_service_1 = require("../../sign-up/login/login.service");
var login_controller_1 = require("../../sign-up/login/login.controller");
var blockAdd = r_b_model_1.rAndbSchema.blockAdd;
var rAndbRouter = express_1.default.Router();
var loginRepo = new login_repository_1.LogInRepository();
var loginService = new login_service_1.LogInService(loginRepo);
var loginController = new login_controller_1.LogInController(loginService);
var repo = new r_b_repository_1.rAndbRepository();
var service = new r_b_service_1.rAndbService(repo);
var controller = new r_b_controller_1.rAndbController(service);
/**
 * @swagger
 *  definitions:
 *   Blocked:
 *    type: object
 *    properties:
 *     IsBlocked:
 *      type: boolean
 *      description: Is Blocked
 *      example: true
 */
/**
 * @swagger
 * /get-all-ratings:
 *  get:
 *   summary: Get SP Ratings
 *   description: Get SP Ratings
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
rAndbRouter.get('/get-all-ratings', loginController.validateToken, controller.getAllRatings);
/**
 * @swagger
 * /get-all-cust-sp-had-worked-for:
 *  get:
 *   summary: Get all customer SP had worked for
 *   description: Get all customer SP had worked for
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
rAndbRouter.get('/get-all-cust-sp-had-worked-for', loginController.validateToken, controller.custSpHadWorkedFor);
/**
 * @swagger
 * /create-blocked-customer/{custId}:
 *  post:
 *   summary: Create blocked customer
 *   description: Create blocked customer
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: custId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Blocked'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
rAndbRouter.post('/create-blocked-customer/:custId', (0, celebrate_1.celebrate)(blockAdd), loginController.validateToken, controller.blockCust, controller.removeBlockedCust);
module.exports = rAndbRouter;
