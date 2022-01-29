"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var contacts_repository_1 = require("./contacts/contacts.repository");
var contacts_model_1 = require("./contacts/contacts.model");
var contacts_service_1 = require("./contacts/contacts.service");
var contacts_controller_1 = require("./contacts/contacts.controller");
var get = contacts_model_1.ContactsSchema.get, add = contacts_model_1.ContactsSchema.add;
var router = express_1.default.Router();
var repo = new contacts_repository_1.ContactsRepository();
var service = new contacts_service_1.ContactsService(repo);
var controller = new contacts_controller_1.ContactsController(service);
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
module.exports = router;
