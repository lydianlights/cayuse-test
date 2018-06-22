import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { router } from './routes/routes';

dotenv.config();

const app = express();
app.use(morgan('dev'));
app.listen(process.env.PORT, onListening);

function onListening() {
  console.log(`Listening on port ${process.env.PORT}`);
  initRoutes();
}

function initRoutes() {
  app.use(router);

  // Catch 404 and forward to error handler
  app.use((req, res, next) => {
    let err = new Error('The requested route could not be found') as any;
    err.status = 404;
    next(err);
  });

  // Error handler
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      message: `${err.name}: ${err.message}`
    });
  });
}
