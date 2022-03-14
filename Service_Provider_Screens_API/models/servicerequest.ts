import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class ServiceRequest extends Model {
  ServiceRequestId!: number;
  UserId?: number;
  ServiceId?: number;
  ServiceStartDate!: Date;
  ServiceStartTime!: number;
  ZipCode!: number;
  ServiceHourlyRate?: number;
  ServiceHours!: number;
  ExtraHours?: number;
  SubTotal!: number;
  TotalCost!: number;
  Comments?: string;
  ServiceProviderId?: number;
  SPAcceptedDate?: Date;
  HasPets!: boolean;
  Status!: number;
  ModifiedBy?: number;
  Distance?: number;
};

export const ServiceModelAttributes: ModelAttributes = {
  ServiceRequestId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  UserId: {
    type: DataTypes.INTEGER,
  },
  ServiceId: {
    type: DataTypes.INTEGER
  },
  ServiceStartDate: {
    allowNull: false,
    type: DataTypes.DATE
  },
  ServiceStartTime: {
    allowNull: false,
    type: DataTypes.TIME
  },
  ZipCode: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  ServiceHourlyRate: {
    type: DataTypes.DECIMAL
  },
  ServiceHours: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  ExtraHours: {
    type: DataTypes.FLOAT
  },
  SubTotal: {
    allowNull: false,
    type: DataTypes.DECIMAL
  },
  TotalCost: {
    allowNull: false,
    type: DataTypes.DECIMAL
  },
  Comments: {
    type:DataTypes.STRING
  },
  ServiceProviderId: {
    type:DataTypes.INTEGER
  },
  SPAcceptedDate: {
    type: DataTypes.DATE
  },
  HasPets: {
    allowNull: false,
    type:DataTypes.BOOLEAN
  },
  Status: {
    type: DataTypes.INTEGER
  },
  ModifiedBy: {
    type: DataTypes.INTEGER
  },
  Distance: {
    type: DataTypes.DECIMAL
  },
  createdAt: {
    allowNull: false,
    type:DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type:DataTypes.DATE
  }

}
