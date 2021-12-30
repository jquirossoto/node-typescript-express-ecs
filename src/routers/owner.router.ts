import { Router } from 'express';

import { authorize } from './../middlewares/app.middlewares';
import { post, get, list, patch, remove } from './../controllers/owner.controller';

const router: Router = Router();
router.route('/owners')
    .post(authorize, post)
    .get(authorize, list);
router.route('/owners/:id')
    .get(authorize, get)
    .patch(authorize, patch)
    .delete(authorize, remove);

export default router;