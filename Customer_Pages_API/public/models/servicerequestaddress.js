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
exports.ServiceAddressModelAttributes = exports.ServiceRequestAddress = void 0;
var sequelize_1 = require("sequelize");
var ServiceRequestAddress = /** @class */ (function (_super) {
    __extends(ServiceRequestAddress, _super);
    function ServiceRequestAddress() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ServiceRequestAddress;
}(sequelize_1.Model));
exports.ServiceRequestAddress = ServiceRequestAddress;
;
exports.ServiceAddressModelAttributes = {
    Id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    AddressLine1: {
        type: sequelize_1.DataTypes.STRING
    },
    AddressLine2: {
        type: sequelize_1.DataTypes.STRING
    },
    City: {
        type: sequelize_1.DataTypes.STRING
    },
    State: {
        type: sequelize_1.DataTypes.STRING
    },
    PostalCode: {
        type: sequelize_1.DataTypes.INTEGER
    },
    Mobile: {
        type: sequelize_1.DataTypes.STRING
    },
    Email: {
        type: sequelize_1.DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    }
};
