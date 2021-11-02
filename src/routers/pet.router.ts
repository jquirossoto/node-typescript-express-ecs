/**
 * @file Pet router.
 * @author jquirossoto
 */

import { Router } from 'express';

import { post, list, get, patch, remove } from './../controllers/pet.controller';

export const router = Router();
router.route('/pets')
    .post(post)
    .get(list);
router.route('/pets/:id')
    .get(get)
    .patch(patch)
    .delete(remove);

export default router;