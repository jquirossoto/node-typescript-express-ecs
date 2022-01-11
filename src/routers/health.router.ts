/**
 * @file Health router.
 * @author jquirossoto
 */

import { Router } from 'express';

import { list } from './../controllers/health.controller.js';

const router: Router = Router();
router.route('/health')
    .get(list);

export default router;