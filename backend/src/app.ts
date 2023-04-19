import 'express-async-errors';
import express, { Express, Response, Request, NextFunction } from 'express' 
import bodyParser from 'body-parser';
import log4js from 'log4js'

import routes from './routes/index'
import log4jsConfig from './conf/log4js.config'
import { NotFoundError } from './errors/NotFoundError';


const app: Express = express()

// Create logger
log4js.configure(log4jsConfig)
const logger = log4js.getLogger()

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(
  log4js.connectLogger(log4js.getLogger('http'), {
    level: 'auto',
  }),
)

// Register router
app.use('/api/v1.0', routes)

// Error handler
/* eslint-disable @typescript-eslint/no-unused-vars */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.stack);
  if (err instanceof NotFoundError) {
    res.sendStatus(404);
  }
  res.status(500).send('Server error');
});

export default app
