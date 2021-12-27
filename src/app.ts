/**
 * @file App.
 * @author jquirossoto
 */

import express, { Application } from 'express';
import winstonMiddleware from 'express-winston';

import logger from './utils/logger';
import categoryRouter from './routers/category.router';
import petRouter from './routers/pet.router';
import healthRouter from './routers/health.router';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(winstonMiddleware.logger({
    winstonInstance: logger
}));
app.use('/', categoryRouter);
app.use('/', petRouter);
app.use('/', healthRouter);

export default app;