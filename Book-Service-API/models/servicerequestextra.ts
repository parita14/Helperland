import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class ServiceRequestExtra extends Model {
  ServiceRequestExtraId!: number;
  // ServiceRequestId!: number;
  ServiceExtraId!: number
};

export const ServiceExtraModelAttributes: ModelAttributes = {
  ServiceRequestExtraId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  // ServiceRequestId: {
  //   allowNull: false,
  //   type: DataTypes.INTEGER
  // },
  ServiceExtraId: {
    allowNull: false,
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
