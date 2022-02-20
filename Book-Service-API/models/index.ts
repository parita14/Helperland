import { BuildOptions, Model, Sequelize } from 'sequelize';
import { ContactUs, ContactsModelAttributes } from './contactus';
import { User, UserModelAttributes } from './user';
import { UserAddress, UserAddressModelAttributes } from './useraddress';
import { ServiceRequest, ServiceModelAttributes } from './servicerequest';
import { ServiceRequestAddress, ServiceAddressModelAttributes } from './servicerequestaddress';
import { ServiceRequestExtra, ServiceExtraModelAttributes } from './servicerequestextra';

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

const  sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };

type ContactsModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ContactUs;
};

type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): User;
};

type UserAddressModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserAddress;
};

type ServiceModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ServiceRequest;
};

type ServiceAddressModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ServiceRequestAddress;
};

type ServiceExtraModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ServiceRequestExtra;
};

const ContactsDefineModel = sequelize.define(
  'ContactUs',
  {
    ...ContactsModelAttributes
  },
  {
    tableName: 'ContactUs'
  }
) as ContactsModelStatic;

const UserDefineModel = sequelize.define(
  'User',
  {
    ...UserModelAttributes
  },
  {
    tableName: 'User'
  }
) as UserModelStatic;

const UserAddressDefineModel = sequelize.define(
  "UserAddress",
  {
    ...UserAddressModelAttributes,
  },
  {
    tableName: "UserAddress",
  }
) as UserAddressModelStatic;

const ServiceDefineModel = sequelize.define(
  'ServiceRequest',
  {
    ...ServiceModelAttributes
  },
  {
    tableName: 'ServiceRequest'
  }
) as ServiceModelStatic;

const ServiceAddressDefineModel = sequelize.define(
  'ServiceRequestAddress',
  {
    ...ServiceAddressModelAttributes
  },
  {
    tableName: 'ServiceRequestAddress'
  }
) as ServiceAddressModelStatic;

const ServiceExtraDefineModel = sequelize.define(
  'ServiceRequestExtra',
  {
    ...ServiceExtraModelAttributes
  },
  {
    tableName: 'ServiceRequestExtra'
  }
) as ServiceExtraModelStatic;

export interface DbContext {
  sequelize: Sequelize;
  Contacts: ContactsModelStatic;
  Users: UserModelStatic;
  UserAddress: UserAddressModelStatic;
  ServiceRequest: ServiceModelStatic;
  ServiceRequestAddress: ServiceAddressModelStatic;
  ServiceRequestExtra: ServiceExtraModelStatic;
}

export const db: DbContext = {
  sequelize: sequelize,
  Contacts: ContactsDefineModel,
  Users: UserDefineModel,
  UserAddress: UserAddressDefineModel,
  ServiceRequest: ServiceDefineModel,
  ServiceRequestAddress: ServiceAddressDefineModel,
  ServiceRequestExtra: ServiceExtraDefineModel
}

db.Users.hasMany(db.UserAddress, {
  foreignKey: {
    name: "UserId",
    allowNull: true,
  },
  constraints: true,
  onDelete: "CASCADE",
});

db.UserAddress.belongsTo(db.Users, {
  foreignKey: {
    name: "UserId",
    allowNull: false,
  },
  constraints: true,
  onDelete: "CASCADE",
});

db.ServiceRequest.hasOne(db.ServiceRequestAddress, {
  foreignKey: {
    name: "ServiceRequestId",
    allowNull: false,
  },
  as: 'ServiceRequestAddress',
  constraints: true,
  onDelete: "CASCADE",
});

db.ServiceRequestAddress.belongsTo(db.ServiceRequest, {
  foreignKey: {
    name: "ServiceRequestId",
    allowNull: false,
  },
  constraints: true,
  onDelete: "CASCADE",
});

db.ServiceRequest.hasMany(db.ServiceRequestExtra, {
  foreignKey: {
    name: "ServiceRequestId",
    allowNull: true
  },
  as: 'ExtraService',
  constraints: true,
  onDelete: "CASCADE",
});

export default db;
// export {  ContactsDefineModel, UserDefineModel, ServiceDefineModel, ServiceAddressDefineModel, ServiceExtraDefineModel };