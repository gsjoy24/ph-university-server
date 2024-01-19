import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

// application routes
app.use('/api/v1', router);

// test api
app.get('/', (req: Request, res: Response) => {
  res.send('server is up and running!');
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
