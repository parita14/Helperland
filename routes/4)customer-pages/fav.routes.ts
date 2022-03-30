import express from "express";
import { celebrate } from "celebrate";

import { FavRepository } from "../../4)customer-pages/favourite-pros/fav.repository";
import { FavSchema } from "../../4)customer-pages/favourite-pros/fav.model";
import { FavService } from "../../4)customer-pages/favourite-pros/fav.service";
import { FavController } from "../../4)customer-pages/favourite-pros/fav.controller";

import { LogInRepository } from "../../2)sign-up/login/login.repository";
import { LogInService } from "../../2)sign-up/login/login.service";
import { LogInController } from "../../2)sign-up/login/login.controller";

const { favAdd, blockAdd } = FavSchema;
const favRouter: express.Router = express.Router();

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: FavRepository = new FavRepository();
const service: FavService = new FavService(repo);
const controller: FavController = new FavController(service);

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
favRouter.post('/create-favorite-pros/:spId', celebrate(favAdd), loginController.validateToken, controller.FavSP, controller.removeFavSp);

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
favRouter.post('/create-blocked-pros/:spId', celebrate(blockAdd), loginController.validateToken, controller.blockSP, controller.removeBlockedSp);

export = favRouter;