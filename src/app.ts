/**
 * @file App.
 * @author jquirossoto
 */

import express from 'express';

import categoryRouter from './routers/category.router';
import petRouter from './routers/pet.router';
import healthRouter from './routers/health.router';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', categoryRouter);
app.use('/', petRouter);
app.use('/', healthRouter);

export default app;