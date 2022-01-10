/**
 * @file Category router.
 * @author jquirossoto
 */

import { Router } from 'express';
import loader from 'speccy/lib/loader.js';

import { authorize, validateSchema } from './../middlewares/app.middlewares.js';
import { post, list, get, patch, remove } from './../controllers/category.controller.js';
import { resolveDirname } from '../utils/utils.js';

const __dirname = resolveDirname(import.meta.url);
const postSchema = await loader.loadSpec(`${__dirname}/../schemas/create-categories-request.schema.json`, { resolve: true, jsonSchema: true });
const patchSchema = await loader.loadSpec(`${__dirname}/../schemas/update-categories-request.schema.json`, { resolve: true, jsonSchema: true });

const router = Router();
router.route('/categories')
    .post([ authorize, validateSchema(postSchema) ], post)
    .get(authorize, list);
router.route('/categories/:id')
    .get(authorize, get)
    .patch([ authorize, validateSchema(patchSchema) ], patch)
    .delete(authorize, remove);

export default router;