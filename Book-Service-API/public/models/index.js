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
exports.db = exports.sequelize = exports.Sequelize = void 0;
var sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
var contactus_1 = require("./contactus");
var user_1 = require("./user");
var useraddress_1 = require("./useraddress");
var servicerequest_1 = require("./servicerequest");
var servicerequestaddress_1 = require("./servicerequestaddress");
var servicerequestextra_1 = require("./servicerequestextra");
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];
var sequelize = config.url
    ? new sequelize_1.Sequelize(config.url, config)
    : new sequelize_1.Sequelize(config.database, config.username, config.password, config);
exports.sequelize = sequelize;
var ContactsDefineModel = sequelize.define('ContactUs', __assign({}, contactus_1.ContactsModelAttributes), {
    tableName: 'ContactUs'
});
var UserDefineModel = sequelize.define('User', __assign({}, user_1.UserModelAttributes), {
    tableName: 'User'
});
var UserAddressDefineModel = sequelize.define("UserAddress", __assign({}, useraddress_1.UserAddressModelAttributes), {
    tableName: "UserAddress",
});
var ServiceDefineModel = sequelize.define('ServiceRequest', __assign({}, servicerequest_1.ServiceModelAttributes), {
    tableName: 'ServiceRequest'
});
var ServiceAddressDefineModel = sequelize.define('ServiceRequestAddress', __assign({}, servicerequestaddress_1.ServiceAddressModelAttributes), {
    tableName: 'ServiceRequestAddress'
});
var ServiceExtraDefineModel = sequelize.define('ServiceRequestExtra', __assign({}, servicerequestextra_1.ServiceExtraModelAttributes), {
    tableName: 'ServiceRequestExtra'
});
exports.db = {
    sequelize: sequelize,
    Contacts: ContactsDefineModel,
    Users: UserDefineModel,
    UserAddress: UserAddressDefineModel,
    ServiceRequest: ServiceDefineModel,
    ServiceRequestAddress: ServiceAddressDefineModel,
    ServiceRequestExtra: ServiceExtraDefineModel
};
exports.db.Users.hasMany(exports.db.UserAddress, {
    foreignKey: {
        name: "UserId",
        allowNull: true,
    },
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.UserAddress.belongsTo(exports.db.Users, {
    foreignKey: {
        name: "UserId",
        allowNull: false,
    },
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.ServiceRequest.hasOne(exports.db.ServiceRequestAddress, {
    foreignKey: {
        name: "ServiceRequestId",
        allowNull: false,
    },
    as: 'ServiceRequestAddress',
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.ServiceRequestAddress.belongsTo(exports.db.ServiceRequest, {
    foreignKey: {
        name: "ServiceRequestId",
        allowNull: false,
    },
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.ServiceRequest.hasMany(exports.db.ServiceRequestExtra, {
    foreignKey: {
        name: "ServiceRequestId",
        allowNull: true
    },
    as: 'ExtraService',
    constraints: true,
    onDelete: "CASCADE",
});
exports.default = exports.db;
// export {  ContactsDefineModel, UserDefineModel, ServiceDefineModel, ServiceAddressDefineModel, ServiceExtraDefineModel };
