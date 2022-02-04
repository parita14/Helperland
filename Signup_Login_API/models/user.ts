import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class User extends Model {
  UserId!: number;
  FirstName!: string;
  LastName!: string;
  Email!: string;
  Password!: string;
  Mobile?: string;
  UserTypeId!: number;
  Gender?: number;
  DateOfBirth?: Date;
  IsRegisteredUser?: boolean;
  WorksWithPets?:boolean;
  IsApproved!: boolean;
  IsActive?: boolean;
  resetPasswordToken?: String;
  resetPasswordExpires?: Date;
  emailToken?: String;
  emailTokenExpires?: Date;
  createdAt!: Date;
  updatedAt!: Date;
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
    type: DataTypes.STRING
  },
  Password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Mobile: {
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
    type: DataTypes.DATEONLY
  },
  IsRegisteredUser: {
    type: DataTypes.BOOLEAN
  },
  WorksWithPets: {
    type: DataTypes.BOOLEAN
  },
  IsApproved: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
  IsActive: {
    type: DataTypes.BOOLEAN
  },
  resetPasswordToken: { 
    type: DataTypes.STRING
  },
  resetPasswordExpires: { 
    type: DataTypes.DATE
  },
  emailToken: { 
    type: DataTypes.STRING
  },
  emailTokenExpires: { 
    type: DataTypes.DATE 
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