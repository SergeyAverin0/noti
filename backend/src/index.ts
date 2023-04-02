import express, { Express } from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import log4js from 'log4js';

import routes from './routes/index';


const app: Express = express();
const port = process.env.BACKEND_PORT;
const host = process.env.BACKEND_HOST;

const mongodb_host = process.env.MONGODB_HOST;
const mongodb_port = process.env.MONGODB_PORT;
const mongodb_user = process.env.MONGODB_USER;
const mongodb_password = process.env.MONGODB_PASSWORD;
const mongodb_db_name = process.env.MONGODB_DB_NAME;


// Create logger
log4js.configure('./config/log4js.config.json');
const logger = log4js.getLogger();

app.use('/api/v1.0', routes);

const start = async () => {
  try {
    await mongoose.connect(
      `mongodb://${mongodb_user}:${mongodb_password}@${mongodb_host}:${mongodb_port}/${mongodb_db_name}?authSource=admin`,
      {  useNewUrlParser: true,  useUnifiedTopology: true } as ConnectOptions
    );
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://${host}:${port}`);
    });    
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
