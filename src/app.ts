import express from 'express';

import { router as categoryRouter } from './routers/category.router';
import { router as petRouter } from './routers/pet.router';
import { router as healthRouter } from './routers/health.router';
import { authorize } from './middlewares/app.middlewares';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use('/', authorize);
app.use('/', categoryRouter);
app.use('/', petRouter);
app.use('/', healthRouter);

export default app;