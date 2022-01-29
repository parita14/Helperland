import { DataTypes, Model, ModelAttributes } from 'sequelize';

export class ContactUsAttachment extends Model {
  ContactUsAttachmentId!: number;
  Name!: string;
  FileName!: string
};

export const ContactUsAttachmentModelAttributes: ModelAttributes = {
  ContactUsAttachmentId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  Name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  FileName: {
    allowNull: false,
    type: DataTypes.STRING
  }
}
