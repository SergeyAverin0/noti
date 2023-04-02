import express, { Express, ErrorRequestHandler } from 'express';
import log4js from 'log4js';

import routes from './routes/index';
import connectToMongoDB from './models/connectToMongoDB';
import notiConfig from './conf/noti.config';
import log4jsConfig from './conf/log4js.config';


const app: Express = express();

// Create logger
log4js.configure(log4jsConfig);
const logger = log4js.getLogger();

// Middlewares
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

// Register router
app.use('/api/v1.0', routes);

// Error handler
/* eslint-disable @typescript-eslint/no-unused-vars */
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err.stack)
  res.status(500).send('Something broke!');
};

app.use(errorHandler);

// Start server
const start = async () => {
  try {
    connectToMongoDB();
    app.listen(notiConfig.BACKEND_PORT, () => {
      console.log(`[server]: Server is running at http://${notiConfig.BACKEND_HOST}:${notiConfig.BACKEND_PORT}`);
    });    
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
