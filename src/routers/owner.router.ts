import { Router } from 'express';
import loader from 'speccy/lib/loader.js';

import { authorize, validateSchema, whitelist } from './../middlewares/app.middlewares.js';
import { post, get, list, patch, remove } from './../controllers/owner.controller.js';
import { resolveDirname } from '../utils/utils.js';

const __dirname = resolveDirname(import.meta.url);
const postSchema = await loader.loadSpec(`${__dirname}/../schemas/owners-post-request.schema.json`, { resolve: true, jsonSchema: true });
const patchSchema = await loader.loadSpec(`${__dirname}/../schemas/owners-patch-request.schema.json`, { resolve: true, jsonSchema: true });

const router: Router = Router();
router.route('/owners')
    .post([ authorize, validateSchema(postSchema), whitelist({ body: [ 'firstName', 'lastName', 'address.countryCode' ] }) ], post)
    .get(authorize, list);
router.route('/owners/:id')
    .get(authorize, get)
    .patch([ authorize, validateSchema(patchSchema), whitelist({ body: [ 'firstName', 'lastName', 'address.countryCode' ] }) ], patch)
    .delete(authorize, remove);

export default router;