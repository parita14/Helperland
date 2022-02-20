"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModelAttributes = exports.User = void 0;
var sequelize_1 = require("sequelize");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(sequelize_1.Model));
exports.User = User;
;
exports.UserModelAttributes = {
    UserId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    FirstName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    LastName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    Email: {
        allowNull: false,
        unique: true,
        type: sequelize_1.DataTypes.STRING
    },
    Password: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    Mobile: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    UserTypeId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    Gender: {
        type: sequelize_1.DataTypes.INTEGER
    },
    DateOfBirth: {
        type: sequelize_1.DataTypes.DATEONLY
    },
    IsRegisteredUser: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    ZipCode: {
        type: sequelize_1.DataTypes.INTEGER
    },
    WorksWithPets: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    ModifiedBy: {
        type: sequelize_1.DataTypes.INTEGER
    },
    IsApproved: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    IsActive: {
        type: sequelize_1.DataTypes.BOOLEAN
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
};
