"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var contacts_repository_1 = require("../../1)contact-us/contacts.repository");
var contacts_model_1 = require("../../1)contact-us/contacts.model");
var contacts_service_1 = require("../../1)contact-us/contacts.service");
var contacts_controller_1 = require("../../1)contact-us/contacts.controller");
var login_repository_1 = require("../../2)sign-up/login/login.repository");
var login_service_1 = require("../../2)sign-up/login/login.service");
var login_controller_1 = require("../../2)sign-up/login/login.controller");
var get = contacts_model_1.ContactsSchema.get, contactsAdd = contacts_model_1.ContactsSchema.contactsAdd;
var contactsRouter = express_1.default.Router();
var repo = new contacts_repository_1.ContactsRepository();
var service = new contacts_service_1.ContactsService(repo);
var controller = new contacts_controller_1.ContactsController(service);
var loginRepo = new login_repository_1.LogInRepository();
var loginService = new login_service_1.LogInService(loginRepo);
var loginController = new login_controller_1.LogInController(loginService);
/**
 * @swagger
 * definitions:
 *  ContactUs:
 *   type: object
 *   properties:
 *    FirstName:
 *     type: string
 *     description: First name of user
 *     example: 'Parita'
 *    LastName:
 *     type: string
 *     description: Last name of user
 *     example: 'Solanki'
 *    Email:
 *     type: string
 *     description: email of user
 *     example: 'abc@gmail.com'
 *    Subject:
 *     type: string
 *     description: subject
 *     example: 'Issues'
 *    PhoneNumber:
 *     type: string
 *     description: phone number
 *     example: '0123456789'
 *    Message:
 *     type: string
 *     description: message
 *     example: 'having issue in booking service'
 *    file:
 *     type: file
 *     description: upload file
 *     example: 'file.jpg'
 */
/**
 * @swagger
 * /contacts:
 *   post:
 *    summary: creact contacts
 *    description: create contacts form
 *    parameters:
 *     - in: header
 *       name: auth
 *       schema:
 *        type: string
 *    requestBody:
 *     content:
 *      multipart/form-data:
 *       schema:
 *        $ref: '#/definitions/ContactUs'
 *    responses:
 *     200:
 *      description: Success
 *     500:
 *      description: Failure
 */
contactsRouter.post('/contacts', loginController.validateToken, controller.validate, controller.createContacts);
/**
 * @swagger
 * /contacts/{ContactUsId}:
 *  get:
 *   summary: get contacts by Id
 *   description: get contacts by Id
 *   parameters:
 *    - in: path
 *      name: ContactUsId
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of contacts form
 *      example: 1
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
contactsRouter.get('/contacts/:ContactUsId', controller.getContactsById);
/**
 * @swagger
 * /contacts:
 *  get:
 *   summary: get all contacts
 *   description: get all contacts
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
contactsRouter.get('/contacts', controller.getContacts);
module.exports = contactsRouter;
