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
var favoriteandblocked_1 = require("./favoriteandblocked");
var rating_1 = require("./rating");
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];
var sequelize = config.url
    ? new sequelize_1.Sequelize(config.url, config)
    : new sequelize_1.Sequelize(config.database, config.username, config.password, config);
exports.sequelize = sequelize;
var ContactsDefineModel = sequelize.define('ContactUs', __assign({}, contactus_1.ContactsModelAttributes), {
    tableName: 'ContactUs',
});
var UserDefineModel = sequelize.define('User', __assign({}, user_1.UserModelAttributes), {
    tableName: 'User',
});
var UserAddressDefineModel = sequelize.define("UserAddress", __assign({}, useraddress_1.UserAddressModelAttributes), {
    tableName: "UserAddress",
});
var ServiceDefineModel = sequelize.define('ServiceRequest', __assign({}, servicerequest_1.ServiceModelAttributes), {
    tableName: 'ServiceRequest',
});
var ServiceAddressDefineModel = sequelize.define('ServiceRequestAddress', __assign({}, servicerequestaddress_1.ServiceAddressModelAttributes), {
    tableName: 'ServiceRequestAddress',
});
var ServiceExtraDefineModel = sequelize.define('ServiceRequestExtra', __assign({}, servicerequestextra_1.ServiceExtraModelAttributes), {
    tableName: 'ServiceRequestExtra',
});
var FAndBDefineModel = sequelize.define('FavoriteAndBlocked', __assign({}, favoriteandblocked_1.FAndBModelAttributes), {
    tableName: 'FavoriteAndBlocked',
});
var RatingDefineModel = sequelize.define('Rating', __assign({}, rating_1.RatingModelAttributes), {
    tableName: 'Rating',
});
exports.db = {
    sequelize: sequelize,
    Contacts: ContactsDefineModel,
    Users: UserDefineModel,
    UserAddress: UserAddressDefineModel,
    ServiceRequest: ServiceDefineModel,
    ServiceRequestAddress: ServiceAddressDefineModel,
    ServiceRequestExtra: ServiceExtraDefineModel,
    FavoriteAndBlocked: FAndBDefineModel,
    Rating: RatingDefineModel,
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
    hooks: true,
});
exports.db.ServiceRequestAddress.belongsTo(exports.db.ServiceRequest, {
    foreignKey: {
        name: "ServiceRequestId",
        allowNull: false,
    },
    as: 'ServiceRequestAddress',
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.ServiceRequest.belongsTo(exports.db.Users, {
    foreignKey: {
        name: "UserId",
        allowNull: false,
    },
    as: 'UserRequest',
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.Users.hasMany(exports.db.ServiceRequest, {
    foreignKey: {
        name: "UserId",
        allowNull: false,
    },
    as: 'UserRequest',
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.ServiceRequest.belongsTo(exports.db.Users, {
    foreignKey: {
        name: "ServiceProviderId",
        allowNull: true,
    },
    as: 'HelperRequest',
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.Users.hasMany(exports.db.ServiceRequest, {
    foreignKey: {
        name: "ServiceProviderId",
        allowNull: true,
    },
    as: 'HelperRequest',
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
exports.db.Users.hasMany(exports.db.FavoriteAndBlocked, {
    foreignKey: {
        name: "UserId",
        allowNull: false,
    },
    as: 'FavoriteAndBlocked',
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.Users.hasMany(exports.db.FavoriteAndBlocked, {
    foreignKey: {
        name: "TargetUserId",
        allowNull: false,
    },
    as: 'TargetUserId',
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.ServiceRequest.hasOne(exports.db.Rating, {
    foreignKey: {
        name: "ServiceRequestId",
        allowNull: false,
    },
    as: 'ServiceRating',
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.Rating.belongsTo(exports.db.ServiceRequest, {
    foreignKey: {
        name: "ServiceRequestId",
        allowNull: false,
    },
    as: 'ServiceRating',
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.Users.hasMany(exports.db.Rating, {
    foreignKey: {
        name: "RatingFrom",
        allowNull: false,
    },
    as: 'RatingFrom',
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.Users.hasMany(exports.db.Rating, {
    foreignKey: {
        name: "RatingTo",
        allowNull: false,
    },
    as: 'RatingTo',
    constraints: true,
    onDelete: "CASCADE",
});
exports.default = exports.db;
