import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class ContactUs extends Model {
  ContactUsId!: number;
  Name!: string;
  Email!: string;
  SubjectType!: string;
  Subject?: string;
  PhoneNumber!: string;
  Message!: string;
  UploadFileName?: string;
  path?: string;
  CreatedBy?: number;
  Status?: number;
  Priority?: number;
  AssignedToUser?: number;
  IsDeleted!: Boolean;
  createdAt!: Date;
  updatedAt!: Date
};

export const ContactUsModelAttributes: ModelAttributes = {
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
    type: DataTypes.STRING
  },
  SubjectType: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Subject: {
    allowNull: true,
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
    allowNull: true,
    type: DataTypes.STRING
  },
  path: {
    allowNull: true,
    type: DataTypes.STRING
  },
  CreatedBy: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  Status: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  Priority: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  AssignedToUser: {
    allowNull: true,
    type: DataTypes.INTEGER
  },
  IsDeleted: {
    allowNull: false,
    type: DataTypes.BOOLEAN
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
