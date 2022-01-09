import { Router } from 'express';

import { authorize, whitelist } from './../middlewares/app.middlewares.js';
import { post, get, list, patch, remove } from './../controllers/owner.controller.js';

const router: Router = Router();
router.route('/owners')
    .post([ authorize, whitelist({ body: [ 'firstName', 'lastName', 'address.countryCode' ] }) ], post)
    .get(authorize, list);
router.route('/owners/:id')
    .get(authorize, get)
    .patch(authorize, patch)
    .delete(authorize, remove);

export default router;