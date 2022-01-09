/**
 * @file Category router.
 * @author jquirossoto
 */

import { Router } from 'express';

import { authorize, validateSchema } from './../middlewares/app.middlewares.js';
import postSchema from './../schemas/create-categories-request.schema.json';
import patchSchema from './../schemas/update-categories-request.schema.json';
import { post, list, get, patch, remove } from './../controllers/category.controller.js';

const router = Router();
router.route('/categories')
    .post([authorize, validateSchema(postSchema)], post)
    .get(authorize, list);
router.route('/categories/:id')
    .get(authorize, get)
    .patch([authorize, validateSchema(patchSchema)], patch)
    .delete(authorize, remove);

export default router;