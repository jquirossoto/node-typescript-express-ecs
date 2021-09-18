import express from 'express';

import { router as categoryRouter } from './routers/category.router';
import { router as petRouter } from './routers/pet.router';
import { authorize } from './middlewares/app.middlewares';

const port = process.env.PORT || 3000;

export const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', authorize);
app.use('/api', categoryRouter);
app.use('/api', petRouter);

export const server = app.listen(port, () => {
	console.log(`Running on port ${port}`);
});
