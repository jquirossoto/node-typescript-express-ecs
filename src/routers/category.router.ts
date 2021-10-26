import { Router } from 'express';

import { validate } from './../middlewares/app.middlewares';
import postSchema from './../schemas/create-categories-request.schema.json';
import patchSchema from './../schemas/update-categories-request.schema.json';
import { post, list, get, patch, remove } from './../controllers/category.controller';

export const router = Router();
router.route('/categories')
    .post(validate(postSchema), post)
    .get(list);
router.route('/categories/:id')
    .get(get)
    .patch(validate(patchSchema), patch)
    .delete(remove);
