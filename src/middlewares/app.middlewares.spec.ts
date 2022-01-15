import { Request } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';

import { buildErrorResponse } from './../utils/utils';
import { authorize, validateSchema, allowedHttpMethods, allowedContentType, whitelist } from './app.middlewares';
import Category from './../models/category.model';

describe('App Middlewares', () => {
  describe('authorize()', () => {
    it('Should authorize the request', () => {
      const req: Request = getMockReq({
        headers: {
          'x-api-key': '65c95f0d-debc-4f4f-9b1d-473b0b492fde'
        }
      });
      const { res, next } = getMockRes();
      authorize(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('Should return 403 error', () => {
      const req: Request = getMockReq();
      const { res, next } = getMockRes();
      authorize(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(buildErrorResponse(['UNAUTHORIZED']));
      expect(next).toHaveBeenCalledTimes(0);
    });
  });

  describe('validateSchema()', () => {
    it('Should validate the schema', () => {
      const newCategory: Category = {
        id: null,
        name: 'My category'
      };
      const req: Request = getMockReq({
        body: newCategory
      });
      const { res, next } = getMockRes();
      const schema = {
        type: 'object',
        properties: {
          id: {
            type: 'null'
          },
          name: {
            type: 'string'
          }
        },
        required: ['name'],
        additionalProperties: false
      };
      const validateSchemaMiddleware = validateSchema(schema);
      validateSchemaMiddleware(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('Should return 403 error', () => {
      const req: Request = getMockReq({
        body: {
          name1: 'My category'
        }
      });
      const { res, next } = getMockRes();
      const schema = {
        type: 'object',
        properties: {
          name: {
            type: 'string'
          }
        },
        required: ['name'],
        additionalProperties: false
      };
      const validateSchemaMiddleware = validateSchema(schema);
      validateSchemaMiddleware(req, res, next);
      expect(res.status).toHaveBeenCalledWith(422);
      expect(next).toHaveBeenCalledTimes(0);
    });
  });

  describe('whitelist()', () => {
    it('Should set the whitelist options', () => {
      const req: Request = getMockReq({
        _routeWhitelists: {}
      });
      const { res, next } = getMockRes();
      const whitelistMiddleware = whitelist({ req: ['body'] });
      whitelistMiddleware(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });

  describe('allowedHttpMethods()', () => {
    it('Should allow method', () => {
      const req: Request = getMockReq({
        method: 'GET'
      });
      const { res, next } = getMockRes();
      allowedHttpMethods(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('Should return 405 error', () => {
      const req: Request = getMockReq({
        method: 'PATCH'
      });
      const { res, next } = getMockRes();
      allowedHttpMethods(req, res, next);
      expect(res.status).toHaveBeenCalledWith(405);
      expect(next).toHaveBeenCalledTimes(0);
    });
  });

  describe('allowedContentType', () => {
    it('Should allow json', () => {
      const req: Request = getMockReq({
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: {
          content: 'this is some content'
        },
        is: jest.fn(() => true)
      });
      const { res, next } = getMockRes();
      allowedContentType(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('Should allow for GET method', () => {
      const req: Request = getMockReq({
        method: 'GET'
      });
      const { res, next } = getMockRes();
      allowedContentType(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('Should allow for DELETE method', () => {
      const req: Request = getMockReq({
        method: 'DELETE'
      });
      const { res, next } = getMockRes();
      allowedContentType(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
    });

    it('Should return 415 error with xml', () => {
      const req: Request = getMockReq({
        method: 'PUT',
        headers: { 'Content-Type': 'application/xml' },
        is: jest.fn(() => false)
      });
      const { res, next } = getMockRes();
      allowedContentType(req, res, next);
      expect(res.status).toHaveBeenCalledWith(415);
      expect(next).toHaveBeenCalledTimes(0);
    });
  });
});
