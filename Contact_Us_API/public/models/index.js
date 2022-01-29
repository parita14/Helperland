"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsDefineModel = exports.db = exports.sequelize = exports.Sequelize = void 0;
var sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
var contactus_1 = require("./contactus");
var contactusattachment_1 = require("./contactusattachment");
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];
var sequelize = config.url
    ? new sequelize_1.Sequelize(config.url, config)
    : new sequelize_1.Sequelize(config.database, config.username, config.password, config);
exports.sequelize = sequelize;
var ContactUsDefineModel = sequelize.define('ContactUs', __assign({}, contactus_1.ContactUsModelAttributes), {
    tableName: 'ContactUs'
});
exports.ContactUsDefineModel = ContactUsDefineModel;
var ContactUsAttachmentDefineModel = sequelize.define('ContactUsAttachments', __assign({}, contactusattachment_1.ContactUsAttachmentModelAttributes), {
    tableName: 'ContactUsAttachments'
});
exports.db = {
    sequelize: sequelize,
    Contacts: ContactUsDefineModel,
    ContactUsAttachment: ContactUsAttachmentDefineModel
};
