import { Request, Response } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';

import { list } from './health.controller';

describe('Health Controller', () => {

    describe('list',  () => {

        it('Should return empty 200', async () => {
            const req: Request = getMockReq();
            const res: Response = getMockRes().res;

            await list(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalled();
        });

    });

});