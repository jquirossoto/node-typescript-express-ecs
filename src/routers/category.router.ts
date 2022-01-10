/**
 * @file Category router.
 * @author jquirossoto
 */

import { Router } from 'express';
import loader from 'speccy/lib/loader.js';

import { authorize, validateSchema } from './../middlewares/app.middlewares.js';
import { post, list, get, put, remove } from './../controllers/category.controller.js';
import { resolveDirname } from '../utils/utils.js';

const __dirname = resolveDirname(import.meta.url);
const postSchema = await loader.loadSpec(`${__dirname}/../schemas/categories-post-request.schema.json`, { resolve: true, jsonSchema: true });
const putSchema = await loader.loadSpec(`${__dirname}/../schemas/categories-put-request.schema.json`, { resolve: true, jsonSchema: true });

const router = Router();
router.route('/categories')
    .post([ authorize, validateSchema(postSchema) ], post)
    .get(authorize, list);
router.route('/categories/:id')
    .get(authorize, get)
    .put([ authorize, validateSchema(putSchema) ], put)
    .delete(authorize, remove);

export default router;