import { PrismaClient } from '@prisma/client'
import { mockDeep, mockReset } from 'jest-mock-extended'
import { DeepMockProxy } from 'jest-mock-extended/lib/cjs/Mock'

import prisma from './../src/utils/client.prisma';

jest.mock('./../src/utils/client.prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>()
}));

beforeEach(() => {
  mockReset(prismaMock)
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;