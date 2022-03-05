import express from "express";
import { celebrate } from "celebrate";

import { ContactsRepository } from "../../contact-us/contacts.repository";
import { ContactsSchema } from "../../contact-us/contacts.model";
import { ContactsService } from "../../contact-us/contacts.service";
import { ContactsController } from "../../contact-us/contacts.controller";

import { LogInRepository } from "../../sign-up/login/login.repository";
import { LogInService } from "../../sign-up/login/login.service";
import { LogInController } from "../../sign-up/login/login.controller";

const { get, contactsAdd } = ContactsSchema;
const contactsRouter: express.Router = express.Router();

const repo: ContactsRepository = new ContactsRepository();
const service: ContactsService = new ContactsService(repo);
const controller: ContactsController = new ContactsController(service);

const loginRepo: LogInRepository = new LogInRepository();
const loginService: LogInService = new LogInService(loginRepo);
const loginController: LogInController = new LogInController(loginService);


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

export = contactsRouter;