/**
 * @file Pet router.
 * @author jquirossoto
 */

import { Router } from 'express';

import { authorize } from './../middlewares/app.middlewares.js';
import { post, list, get, patch, remove } from './../controllers/pet.controller.js';

export const router = Router();
router.route('/pets')
    .post(authorize, post)
    .get(authorize, list);
router.route('/pets/:id')
    .get(authorize, get)
    .patch(authorize, patch)
    .delete(authorize, remove);

export default router;