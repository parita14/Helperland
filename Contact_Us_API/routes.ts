import express from "express";
import { celebrate } from "celebrate";
import { ContactsRepository } from "./contacts/contacts.repository";
import { ContactsSchema } from "./contacts/contacts.model";
import { ContactsService } from "./contacts/contacts.service";
import { ContactsController } from "./contacts/contacts.controller";

const { get, add } = ContactsSchema;
const router: express.Router = express.Router();

const repo: ContactsRepository = new ContactsRepository();
const service: ContactsService = new ContactsService(repo);
const controller: ContactsController = new ContactsController(service);

// router.post('/contacts', celebrate(add), controller.createContacts);
// router.get('/contacts/:id', celebrate(get), controller.getContactsById);
// router.get('/contacts', controller.getContacts);
/**
 * @swagger
 * definitions:
 *  ContactUs:
 *   type: object
 *   properties:
 *    Name:
 *     type: string
 *     description: name of user
 *     example: 'Parita'
 *    Email:
 *     type: string
 *     description: email of user
 *     example: 'abc@gmail.com'
 *    SubjectType:
 *     type: string
 *     description: subject type
 *     example: 'General'
 *    PhoneNumber:
 *     type: string
 *     description: phone number
 *     example: '0123456789'
 *    Message:
 *     type: string
 *     description: message
 *     example: 'having issue in booking service'
 *    UploadFileName:
 *     type: string
 *     description: file name
 *     example: 'file.txt'
 *    IsDeleted:
 *     type: boolean
 *     description: is deleted or not
 *     example: 0
 */

/**
 * @swagger
 * /contacts:
 *   post:
 *    summary: creact contacts
 *    description: create contacts form
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/ContactUs'
 *    responses:
 *     200:
 *      description: contacts created successfully
 *     500:
 *      description: failure in creating contacts
 */
router.post('/contacts', controller.createContacts);

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
 */
router.get('/contacts/:ContactUsId', controller.getContactsById);

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
router.get('/contacts', controller.getContacts);

export = router;