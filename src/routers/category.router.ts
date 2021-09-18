import { Router } from 'express';

import { post, list, get, patch, remove } from './../controllers/category.controller';

export const router = Router();
router.route('/category')
    .post(post)
    .get(list);
router.route('/category/:id')
    .get(get)
    .patch(patch)
    .delete(remove);
