import { BuildOptions, Model, Sequelize } from "sequelize";
import { ContactUs, ContactUsModelAttributes } from "./contactus";
import { ContactUsAttachment, ContactUsAttachmentModelAttributes } from "./contactusattachment";


const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };

type ContactUsModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ContactUs;
};

type ContactUsAttachmentModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ContactUsAttachment;
};

const ContactUsDefineModel = sequelize.define (
  'ContactUs',
  {
    ...ContactUsModelAttributes
  },
  {
    tableName: 'ContactUs'
  }
) as ContactUsModelStatic;

const ContactUsAttachmentDefineModel = sequelize.define (
  'ContactUsAttachments',
  {
    ...ContactUsAttachmentModelAttributes
  },
  {
    tableName: 'ContactUsAttachments'
  }
) as ContactUsAttachmentModelStatic;

export interface DbContext {
  sequelize: Sequelize;
  Contacts: ContactUsModelStatic;
  ContactUsAttachment: ContactUsAttachmentModelStatic;
}

export const db: DbContext = {
  sequelize: sequelize,
  Contacts: ContactUsDefineModel,
  ContactUsAttachment: ContactUsAttachmentDefineModel
}

export { ContactUsDefineModel };
