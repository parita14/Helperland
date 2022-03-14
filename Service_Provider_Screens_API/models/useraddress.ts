import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class UserAddress extends Model {
  AddressId!: number;
  UserId?: number;
  AddressLine1!: number; 
  AddressLine2?: string;
  City!: string;
  State?: string;
  PostalCode?: number;
  IsDefault?: boolean;
  IsDeleted?: boolean;
  Mobile?: string;
  Email?: string;
}

export const UserAddressModelAttributes:ModelAttributes = {
  AddressId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    UserId: {
      type: DataTypes.INTEGER
    },
    AddressLine1: {
      allowNull: false,
      type: DataTypes.STRING
    },
    AddressLine2: {
      type: DataTypes.STRING
    },
    City: {
      allowNull: false,
      type: DataTypes.STRING
    },
    State: {
      type: DataTypes.STRING
    },
    PostalCode: {
      type: DataTypes.INTEGER
    },
    IsDefault: {
      type: DataTypes.BOOLEAN
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN
    },
    Mobile: {
      type: DataTypes.STRING
    },
    Email: {
      type: DataTypes.STRING
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