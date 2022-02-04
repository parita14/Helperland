import { BuildOptions, Model, Sequelize } from 'sequelize';
import { User, UserModelAttributes } from "./user";

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

const  sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };

type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): User;
};

const UserDefineModel = sequelize.define(
  'Users',
  {
    ...UserModelAttributes
  },
  {
    tableName: 'Users'
  }
) as UserModelStatic;

export interface DbContext {
  sequelize: Sequelize;
  Users: UserModelStatic;
}

export const db: DbContext = {
  sequelize: sequelize,
  Users: UserDefineModel
}
export {UserDefineModel};