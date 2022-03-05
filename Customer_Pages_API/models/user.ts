import { Model, DataTypes, ModelAttributes, Sequelize } from 'sequelize';

export class User extends Model {
  UserId!: number;
  FirstName!: string;
  LastName!: string;
  Email!: string;
  Password!: string;
  Mobile!: string;
  UserTypeId!: number;
  Gender?: number;
  DateOfBirth?: Date;
  IsRegisteredUser?: boolean;
  ZipCode?: number;
  WorksWithPets?:boolean;
  LanguageId?: number;
  ModifiedBy?: number;
  IsApproved?: boolean;
  IsActive?: boolean;
};

export const UserModelAttributes: ModelAttributes = {
  UserId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  FirstName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  LastName: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING
  },
  Password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Mobile: {
    allowNull: false,
    type: DataTypes.STRING
  },
  UserTypeId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  Gender: {
    type: DataTypes.INTEGER
  },
  DateOfBirth: {
    type: DataTypes.DATE
  },
  IsRegisteredUser: {
    type: DataTypes.BOOLEAN
  },
  ZipCode: {
    type: DataTypes.INTEGER
  },
  WorksWithPets: {
    type: DataTypes.BOOLEAN
  },
  LanguageId: {
    type: DataTypes.INTEGER
  },
  ModifiedBy: {
    type: DataTypes.INTEGER
  },
  IsApproved: {
    type: DataTypes.BOOLEAN
  },
  IsActive: {
    type: DataTypes.BOOLEAN
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}