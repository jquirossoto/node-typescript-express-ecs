import { Router } from 'express';

import { validate } from './../middlewares/app.middlewares';
import createCategorySchema from './../schemas/create-category-request.schema.json';
import { post, list, get, patch, remove } from './../controllers/category.controller';

export const router = Router();
router.route('/category')
    .post(validate(createCategorySchema), post)
    .get(list);
router.route('/category/:id')
    .get(get)
    .patch(patch)
    .delete(remove);
