"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var fav_repository_1 = require("../../4)customer-pages/favourite-pros/fav.repository");
var fav_model_1 = require("../../4)customer-pages/favourite-pros/fav.model");
var fav_service_1 = require("../../4)customer-pages/favourite-pros/fav.service");
var fav_controller_1 = require("../../4)customer-pages/favourite-pros/fav.controller");
var login_repository_1 = require("../../2)sign-up/login/login.repository");
var login_service_1 = require("../../2)sign-up/login/login.service");
var login_controller_1 = require("../../2)sign-up/login/login.controller");
var favAdd = fav_model_1.FavSchema.favAdd, blockAdd = fav_model_1.FavSchema.blockAdd;
var favRouter = express_1.default.Router();
var loginRepo = new login_repository_1.LogInRepository();
var loginService = new login_service_1.LogInService(loginRepo);
var loginController = new login_controller_1.LogInController(loginService);
var repo = new fav_repository_1.FavRepository();
var service = new fav_service_1.FavService(repo);
var controller = new fav_controller_1.FavController(service);
/**
 * @swagger
 *  definitions:
 *   Favorite:
 *    type: object
 *    properties:
 *     IsFavorite:
 *      type: boolean
 *      description: Is Favourite
 *      example: true
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
 * /create-favorite-pros/{spId}:
 *  post:
 *   summary: Create favorite pros
 *   description: Create favorite pros
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: spId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Favorite'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
favRouter.post('/create-favorite-pros/:spId', celebrate_1.celebrate(favAdd), loginController.validateToken, controller.FavSP, controller.removeFavSp);
/**
 * @swagger
 * /get-all-pros:
 *  get:
 *   summary: Get all pros
 *   description: Get all pros
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
favRouter.get('/get-all-pros', loginController.validateToken, controller.SPworkedwithCustomer);
/**
 * @swagger
 * /create-blocked-pros/{spId}:
 *  post:
 *   summary: Create blocked pros
 *   description: Create blocked pros
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: spId
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
favRouter.post('/create-blocked-pros/:spId', celebrate_1.celebrate(blockAdd), loginController.validateToken, controller.blockSP, controller.removeBlockedSp);
module.exports = favRouter;
