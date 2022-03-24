import { BuildOptions, Model, Sequelize } from 'sequelize';
import { ContactUs, ContactsModelAttributes } from './contactus';
import { User, UserModelAttributes } from './user';
import { UserAddress, UserAddressModelAttributes } from './useraddress';
import { ServiceRequest, ServiceModelAttributes } from './servicerequest';
import { ServiceRequestAddress, ServiceAddressModelAttributes } from './servicerequestaddress';
import { ServiceRequestExtra, ServiceExtraModelAttributes } from './servicerequestextra';
import { FavoriteAndBlocked, FAndBModelAttributes } from './favoriteandblocked';
import { Rating, RatingModelAttributes } from './rating';

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

type FAndBModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): FavoriteAndBlocked;
};

type RatingModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): Rating;
};

const ContactsDefineModel = sequelize.define(
  'ContactUs',
  {
    ...ContactsModelAttributes,
  },
  {
    tableName: 'ContactUs',
  }
) as ContactsModelStatic;

const UserDefineModel = sequelize.define(
  'User',
  {
    ...UserModelAttributes,
  },
  {
    tableName: 'User',
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
    ...ServiceModelAttributes,
  },
  {
    tableName: 'ServiceRequest',
  }
) as ServiceModelStatic;

const ServiceAddressDefineModel = sequelize.define(
  'ServiceRequestAddress',
  {
    ...ServiceAddressModelAttributes,
  },
  {
    tableName: 'ServiceRequestAddress',
  }
) as ServiceAddressModelStatic;

const ServiceExtraDefineModel = sequelize.define(
  'ServiceRequestExtra',
  {
    ...ServiceExtraModelAttributes,
  },
  {
    tableName: 'ServiceRequestExtra',
  }
) as ServiceExtraModelStatic;

const FAndBDefineModel = sequelize.define(
  'FavoriteAndBlocked',
  {
    ...FAndBModelAttributes,
  },
  {
    tableName: 'FavoriteAndBlocked',
  }
) as FAndBModelStatic;

const RatingDefineModel = sequelize.define(
  'Rating',
  {
    ...RatingModelAttributes,
  },
  {
    tableName: 'Rating',
  }
) as RatingModelStatic;

export interface DbContext {
  sequelize: Sequelize;
  Contacts: ContactsModelStatic;
  Users: UserModelStatic;
  UserAddress: UserAddressModelStatic;
  ServiceRequest: ServiceModelStatic;
  ServiceRequestAddress: ServiceAddressModelStatic;
  ServiceRequestExtra: ServiceExtraModelStatic;
  FavoriteAndBlocked: FAndBModelStatic;
  Rating: RatingModelStatic;
}

export const db: DbContext = {
  sequelize: sequelize,
  Contacts: ContactsDefineModel,
  Users: UserDefineModel,
  UserAddress: UserAddressDefineModel,
  ServiceRequest: ServiceDefineModel,
  ServiceRequestAddress: ServiceAddressDefineModel,
  ServiceRequestExtra: ServiceExtraDefineModel,
  FavoriteAndBlocked: FAndBDefineModel,
  Rating: RatingDefineModel,
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
  hooks: true,
});

db.ServiceRequestAddress.belongsTo(db.ServiceRequest, {
  foreignKey: {
    name: "ServiceRequestId",
    allowNull: false,
  },
  as: 'ServiceRequestAddress',
  constraints: true,
  onDelete: "CASCADE",
});

db.ServiceRequest.belongsTo(db.Users, {
  foreignKey: {
    name: "UserId",
    allowNull: false,
  },
  as: 'UserRequest',
  constraints: true,
  onDelete: "CASCADE",
});

db.Users.hasMany(db.ServiceRequest, {
  foreignKey: {
    name: "UserId",
    allowNull: false,
  },
  as: 'UserRequest',
  constraints: true,
  onDelete: "CASCADE",
});

db.ServiceRequest.belongsTo(db.Users, {
  foreignKey: {
    name: "ServiceProviderId",
    allowNull: true,
  },
  as: 'HelperRequest',
  constraints: true,
  onDelete: "CASCADE",
});

db.Users.hasMany(db.ServiceRequest, {
  foreignKey: {
    name: "ServiceProviderId",
    allowNull: true,
  },
  as: 'HelperRequest',
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

db.Users.hasMany(db.FavoriteAndBlocked, {
  foreignKey: {
    name: "UserId",
    allowNull: false,
  },
  as: 'FavoriteAndBlocked',
  constraints: true,
  onDelete: "CASCADE",
});

db.Users.hasMany(db.FavoriteAndBlocked, {
  foreignKey: {
    name: "TargetUserId",
    allowNull: false,
  },
  as: 'TargetUserId',
  constraints: true,
  onDelete: "CASCADE",
});

db.ServiceRequest.hasOne(db.Rating, {
  foreignKey: {
    name: "ServiceRequestId",
    allowNull: false,
  },
  as: 'ServiceRating',
  constraints: true,
  onDelete: "CASCADE",
});

db.Rating.belongsTo(db.ServiceRequest, {
  foreignKey: {
    name: "ServiceRequestId",
    allowNull: false,
  },
  as: 'ServiceRating',
  constraints: true,
  onDelete: "CASCADE",
});

db.Users.hasMany(db.Rating, {
  foreignKey: {
    name: "RatingFrom",
    allowNull: false,
  },
  as: 'RatingFrom',
  constraints: true,
  onDelete: "CASCADE",
});

db.Users.hasMany(db.Rating, {
  foreignKey: {
    name: "RatingTo",
    allowNull: false,
  },
  as: 'RatingTo',
  constraints: true,
  onDelete: "CASCADE",
});

export default db;