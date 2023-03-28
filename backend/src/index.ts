import express, { Express, Request, Response } from 'express';


const app: Express = express();
const port = process.env.BACKEND_PORT;
const host = process.env.BACKEND_HOST;


app.get('/', (req: Request, res: Response) => {
  res.send('Noti server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://${host}:${port}`);
});
