import express from "express";
import { celebrate } from "celebrate";
import { ContactsRepository } from "../../contact-us/contacts.repository";
import { ContactsSchema } from "../../contact-us/contacts.model";
import { ContactsService } from "../../contact-us/contacts.service";
import { ContactsController } from "../../contact-us/contacts.controller";

const { get, contactsAdd } = ContactsSchema;
const contactsRouter: express.Router = express.Router();

const repo: ContactsRepository = new ContactsRepository();
const service: ContactsService = new ContactsService(repo);
const controller: ContactsController = new ContactsController(service);

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
 *    SubjectType:
 *     type: string
 *     description: subject type
 *     example: 'General'
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
 *     example: 'file.txt'
 *    
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
 *      description: contacts created successfully
 *     500:
 *      description: failure in creating contacts
 */
 contactsRouter.post('/contacts', controller.validate, controller.createContacts);

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
 *     description: success 
 *    500:
 *     description: error
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
 *     description: success
 *    500:
 *     description: error
 */
 contactsRouter.get('/contacts', controller.getContacts);

export = contactsRouter;