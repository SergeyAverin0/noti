import express, { Express, ErrorRequestHandler } from 'express';
import log4js from 'log4js';

import routes from './routes/index';
import connectToMongoDB from './models/connectToMongoDB';


const app: Express = express();
const port = process.env.BACKEND_PORT;
const host = process.env.BACKEND_HOST;


// Create logger
log4js.configure('./conf/log4js.config.json');
const logger = log4js.getLogger();

// Middlewares
app.use(log4js.connectLogger(log4js.getLogger("http"), { level: 'auto' }));

// Register router
app.use('/api/v1.0', routes);

// Error handler
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  logger.error(err.stack)
  res.status(500).send('Something broke!');
};

app.use(errorHandler);

// Start server
const start = async () => {
  try {
    connectToMongoDB();
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://${host}:${port}`);
    });    
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
