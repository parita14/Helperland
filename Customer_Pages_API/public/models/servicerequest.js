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
exports.ServiceModelAttributes = exports.ServiceRequest = void 0;
var sequelize_1 = require("sequelize");
var ServiceRequest = /** @class */ (function (_super) {
    __extends(ServiceRequest, _super);
    function ServiceRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ServiceRequest;
}(sequelize_1.Model));
exports.ServiceRequest = ServiceRequest;
;
exports.ServiceModelAttributes = {
    ServiceRequestId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    UserId: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    ServiceId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    ServiceStartDate: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    ServiceStartTime: {
        allowNull: false,
        type: sequelize_1.DataTypes.TIME
    },
    ZipCode: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    },
    ServiceHourlyRate: {
        type: sequelize_1.DataTypes.DECIMAL
    },
    ServiceHours: {
        allowNull: false,
        type: sequelize_1.DataTypes.FLOAT
    },
    ExtraHours: {
        type: sequelize_1.DataTypes.FLOAT
    },
    SubTotal: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL
    },
    TotalCost: {
        allowNull: false,
        type: sequelize_1.DataTypes.DECIMAL
    },
    Comments: {
        type: sequelize_1.DataTypes.STRING
    },
    ServiceProviderId: {
        type: sequelize_1.DataTypes.INTEGER
    },
    HasPets: {
        allowNull: false,
        type: sequelize_1.DataTypes.BOOLEAN
    },
    Status: {
        type: sequelize_1.DataTypes.INTEGER
    },
    ModifiedBy: {
        type: sequelize_1.DataTypes.INTEGER
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
