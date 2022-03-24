import { Model, DataTypes, ModelAttributes } from "sequelize";

export class ContactUs extends Model {
  ContactUsId!: number;
  Name!: string; 
  Email!: string;
  Subject?: string;
  PhoneNumber!: string;
  Message!: string;
  UploadFileName?: string;
  Path?: string;
  CreatedBy?: number;
}

export const ContactsModelAttributes: ModelAttributes = {
  ContactUsId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  Name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  Subject: {
    type: DataTypes.STRING
  },
  PhoneNumber: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Message: {
    allowNull: false,
    type: DataTypes.STRING
  },
  UploadFileName: {
    type: DataTypes.STRING
  },
  Path: {
    type: DataTypes.STRING
  },
  CreatedBy: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}