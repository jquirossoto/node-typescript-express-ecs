/**
 * @file App.
 * @author jquirossoto
 */

import express, { Application } from 'express';
import winstonMiddleware from 'express-winston';

import logger from './utils/logger.js';
import categoryRouter from './routers/category.router.js';
import petRouter from './routers/pet.router.js';
import ownerRouter from './routers/owner.router.js';
import healthRouter from './routers/health.router.js';

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(winstonMiddleware.logger({
    winstonInstance: logger
}));
app.use('/', categoryRouter);
app.use('/', petRouter);
app.use('/', ownerRouter);
app.use('/', healthRouter);

export default app;