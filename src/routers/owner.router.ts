/**
 * @file Owner router.
 * @author jquirossoto
 */

import { Router } from 'express';
import loader from 'speccy/lib/loader.js';

import { authorize, validateSchema, whitelist } from './../middlewares/app.middlewares.js';
import { post, get, list, put, remove } from './../controllers/owner.controller.js';
import { resolveDirname } from '../utils/utils.js';

const __dirname = resolveDirname(import.meta.url);
const postSchema = await loader.loadSpec(`${__dirname}/../schemas/owners-post-request.schema.json`, {
  resolve: true,
  jsonSchema: true
});
const putSchema = await loader.loadSpec(`${__dirname}/../schemas/owners-put-request.schema.json`, {
  resolve: true,
  jsonSchema: true
});

const router: Router = Router();
router
  .route('/owners')
  .post(
    [authorize, validateSchema(postSchema), whitelist({ body: ['firstName', 'lastName', 'address.countryCode'] })],
    post
  )
  .get(authorize, list);
router
  .route('/owners/:id')
  .get(authorize, get)
  .put(
    [authorize, validateSchema(putSchema), whitelist({ body: ['firstName', 'lastName', 'address.countryCode'] })],
    put
  )
  .delete(authorize, remove);

export default router;
