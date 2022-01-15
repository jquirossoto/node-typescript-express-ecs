/**
 * @file Pet router.
 * @author jquirossoto
 */

import { Router } from 'express';
import loader from 'speccy/lib/loader.js';

import { authorize, validateSchema, whitelist } from './../middlewares/app.middlewares.js';
import { post, list, get, put, remove } from './../controllers/pet.controller.js';
import { resolveDirname } from '../utils/utils.js';

const __dirname = resolveDirname(import.meta.url);
const postSchema = await loader.loadSpec(`${__dirname}/../schemas/pets-post-request.schema.json`, {
  resolve: true,
  jsonSchema: true
});
const putSchema = await loader.loadSpec(`${__dirname}/../schemas/pets-put-request.schema.json`, {
  resolve: true,
  jsonSchema: true
});

const router: Router = Router();
router
  .route('/pets')
  .post(
    [
      authorize,
      validateSchema(postSchema),
      whitelist({
        body: ['name', 'status', 'categoryId', 'ownerId'],
        res: ['body']
      })
    ],
    post
  )
  .get(authorize, list);
router
  .route('/pets/:id')
  .get(authorize, get)
  .put(
    [
      authorize,
      validateSchema(putSchema),
      whitelist({
        body: ['id', 'name', 'status', 'categoryId', 'ownerId'],
        res: ['body']
      })
    ],
    put
  )
  .delete(authorize, remove);

export default router;
