import mongoose, { ConnectOptions } from 'mongoose'
import log4js from 'log4js'

import dbConfig from '../conf/db.config'

const logger = log4js.getLogger()

const connectToMongoDB = async (isDev = false) => {
  const dbName = isDev ? dbConfig.MONGODB_DB_DEV_NAME : dbConfig.MONGODB_DB_NAME
  mongoose
    .connect(
      `mongodb://${dbConfig.MONGODB_USER}:${dbConfig.MONGODB_PASSWORD}@${dbConfig.MONGODB_HOST}:${dbConfig.MONGODB_PORT}/${dbName}?authSource=admin`,
      { useNewUrlParser: true, useUnifiedTopology: true } as ConnectOptions,
    )
    .catch((error) => logger.error(error))
    .then(() => logger.info('Mongodb connect'))
}

export default connectToMongoDB
