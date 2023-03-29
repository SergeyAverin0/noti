import express, { Express, Request, Response } from 'express';

import routes from './routes/index';


const app: Express = express();
const port = process.env.BACKEND_PORT;
const host = process.env.BACKEND_HOST;


app.use('/api/v1.0', routes);


app.listen(port, () => {
  console.log(`[server]: Server is running at http://${host}:${port}`);
});
