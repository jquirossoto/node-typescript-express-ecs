import { Router } from 'express';

import { post, list, get, patch, remove } from './../controllers/pet.controller';

export const router = Router();
router.route('/pet')
    .post(post)
    .get(list);
router.route('/pet/:id')
    .get(get)
    .patch(patch)
    // .delete(remove);
