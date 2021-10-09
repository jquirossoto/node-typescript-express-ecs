import { Router } from 'express';

import { list } from './../controllers/health.controller';

export const router = Router();
router.route('/health')
    .get(list);