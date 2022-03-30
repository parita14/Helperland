import express from "express";
import { celebrate } from "celebrate";

import { UserRepository } from "../../6)Admin-screens/User-management/user.repository"; 
import { UserSchema } from "../../6)Admin-screens/User-management/user.model";
import { UserService } from "../../6)Admin-screens/User-management/user.service";
import { UserController } from "../../6)Admin-screens/User-management/user.controller";

import { LogInRepository } from "../../2)sign-up/login/login.repository";
import { LogInService } from "../../2)sign-up/login/login.service";
import { LogInController } from "../../2)sign-up/login/login.controller";

const userRouter: express.Router = express.Router();

const { userAdd, activateAdd } = UserSchema;

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);

const repo: UserRepository = new UserRepository();
const service: UserService = new UserService(repo);
const controller: UserController = new UserController(service);

/**
 * @swagger
 * definitions:
 *  UserFilter:
 *   type: object
 *   properties:
 *    UserName:
 *     type: string
 *     description: Name of User
 *     example: 'Darshan Diwan'
 *    UserType:
 *     type: string
 *     description: Type of User
 *     example: 'Service Provider'
 *    Phone:
 *     type: string
 *     description: Phone of User
 *     example: '1122778899'
 *    PostalCode:
 *     type: integer
 *     description: PostalCode
 *     example: '380021'
 *    Email:
 *     type: string
 *     description: Email of User
 *     example: 'pricetracker916@gmail.com'
 *    FromDate:
 *     type: date
 *     descript: FromDate
 *     example: '2022-03-10'
 *    ToDate:
 *     type: date
 *     descript: ToDate
 *     example: '2022-03-25'
 *  Activate:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of User
 *     example: 'customer@yopmail.com'
 */

/**
 * @swagger
 * /admin/get-all-users:
 *  post:
 *   summary: Get All Users
 *   description: Get All Users
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UserFilter'  
 *   responses:
 *    200:
 *     description: Success
 *    500: 
 *     description: Failure  
 */
userRouter.post('/admin/get-all-users', celebrate(userAdd), loginController.validateToken, controller.getAllUsers);

/**
 * @swagger
 * /admin/activate-deactivate-users:
 *  put:
 *   summary: Actiate-Deactivate Users
 *   description: Actiate-Deactivate Users
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Activate'  
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
userRouter.put('/admin/activate-deactivate-users', celebrate(activateAdd), loginController.validateToken, controller.updateUserStatus);

/**
 * @swagger
 * /admin/export-users:
 *  get:
 *   summary: Export All Users
 *   description: Export All Users
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
userRouter.get('/admin/export-users', loginController.validateToken, controller.export);

export = userRouter;