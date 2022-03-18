/**
 * @file App.
 * @author jquirossoto
 */

import express, { Application, Request, Response } from 'express';
import winstonMiddleware from 'express-winston';
import helmet from 'helmet';
import nocache from 'nocache';

import logger from './utils/logger.js';
import categoryRouter from './routers/category.router.js';
import petRouter from './routers/pet.router.js';
import ownerRouter from './routers/owner.router.js';
import healthRouter from './routers/health.router.js';
import { allowedContentType, allowedHttpMethods } from './middlewares/app.middlewares.js';

const app: Application = express();

// http method according to https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html#validate-content-types
app.use(allowedHttpMethods);
// content type according to https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html#validate-content-types
app.use(allowedContentType);
// security headers according to https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html#security-headers
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'frame-ancestors': 'none'
      }
    },
    hsts: {
      maxAge: 63072000,
      includeSubDomains: true,
      preload: true
    },
    noSniff: true,
    frameguard: {
      action: 'deny'
    }
  })
);
app.use(nocache());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  winstonMiddleware.logger({
    winstonInstance: logger,
    level: (req: Request, res: Response) => {
      let level = 'info';
      if (res.statusCode >= 500) {
        level = 'error';
      } else if (res.statusCode >= 300) {
        level = 'warn';
      }
      return level;
    }
  })
);
app.use('/', categoryRouter);
app.use('/', petRouter);
app.use('/', ownerRouter);
app.use('/', healthRouter);

export default app;
