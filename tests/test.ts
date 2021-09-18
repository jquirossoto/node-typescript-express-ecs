


import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended'
import { DeepMockProxy, MockProxy } from 'jest-mock-extended/lib/cjs/Mock'

export type MockContext = {
    prisma: MockProxy<PrismaClient>;
  };

  export const createMockContext = (): MockContext => {
    return {
      prisma: mockDeep<PrismaClient>(),
    };
  };