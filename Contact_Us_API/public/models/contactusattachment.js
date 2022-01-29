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
exports.ContactUsAttachmentModelAttributes = exports.ContactUsAttachment = void 0;
var sequelize_1 = require("sequelize");
var ContactUsAttachment = /** @class */ (function (_super) {
    __extends(ContactUsAttachment, _super);
    function ContactUsAttachment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContactUsAttachment;
}(sequelize_1.Model));
exports.ContactUsAttachment = ContactUsAttachment;
;
exports.ContactUsAttachmentModelAttributes = {
    ContactUsAttachmentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    Name: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    FileName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    }
};
