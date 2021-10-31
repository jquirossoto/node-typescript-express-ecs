/**
 * @file Category router.
 * @author jquirossoto
 */

import { Router } from 'express';

import { validateSchema } from './../middlewares/app.middlewares';
import postSchema from './../schemas/create-categories-request.schema.json';
import patchSchema from './../schemas/update-categories-request.schema.json';
import { post, list, get, patch, remove } from './../controllers/category.controller';

const router = Router();
router.route('/categories')
    .post(validateSchema(postSchema), post)
    .get(list);
router.route('/categories/:id')
    .get(get)
    .patch(validateSchema(patchSchema), patch)
    .delete(remove);

export default router;