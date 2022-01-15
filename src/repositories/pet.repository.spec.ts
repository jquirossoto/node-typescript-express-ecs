import { Pet as PrismaPet } from '@prisma/client';
import { prismaMock } from './../../prisma/singleton';

import { create, findUnique, findMany, update, remove } from './pet.repository';
import Pet from './../models/pet.model';

describe('Pet Repository', () => {
  describe('create()', () => {
    it('Should create a pet', async () => {
      const newPet: Pet = {
        id: null,
        name: 'My pet',
        status: 'AVAILABLE',
        categoryId: 1,
        ownerId: 1
      };
      const createdPet: PrismaPet = {
        id: 1,
        name: 'My pet',
        status: 'AVAILABLE',
        categoryId: 1,
        ownerId: 1
      };
      const returnedPet: Pet = {
        id: 1,
        name: 'My pet',
        status: 'AVAILABLE',
        categoryId: 1,
        ownerId: 1
      };
      /* @ts-ignore */
      prismaMock.pet.create.mockResolvedValue(createdPet);
      await expect(create(newPet)).resolves.toEqual(returnedPet);
      expect(prismaMock.pet.create).toHaveBeenCalledTimes(1);
    });

    it('Should throw error when creating one pet', async () => {
      const newPet: Pet = {
        id: null,
        name: 'My pet',
        status: 'AVAILABLE',
        categoryId: 1,
        ownerId: 1
      };
      prismaMock.pet.create.mockRejectedValue(new Error('Unable to process request'));
      await expect(create(newPet)).rejects.toThrow(Error);
      expect(prismaMock.pet.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findUnique()', () => {
    it('Should find one pet', async () => {
      const foundPet: PrismaPet = {
        id: 1,
        name: 'My pet',
        status: 'AVAILABLE',
        categoryId: 1,
        ownerId: 1
      };
      const returnedPet: Pet = {
        id: 1,
        name: 'My pet',
        status: 'AVAILABLE',
        categoryId: 1,
        ownerId: 1
      };
      prismaMock.pet.findUnique.mockResolvedValue(foundPet);
      await expect(findUnique(1)).resolves.toEqual(returnedPet);
      expect(prismaMock.pet.findUnique).toHaveBeenCalledTimes(1);
    });

    it('Should throw error when finding one pet', async () => {
      prismaMock.pet.findUnique.mockRejectedValue(new Error('Unable to process request'));
      await expect(findUnique(1)).rejects.toThrow(Error);
      expect(prismaMock.pet.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('findMany()', () => {
    it('Should find multiple categories', async () => {
      const foundPets: PrismaPet[] = [
        {
          id: 1,
          name: 'My pet',
          status: 'AVAILABLE',
          categoryId: 1,
          ownerId: 1
        },
        {
          id: 2,
          name: 'My second pet',
          status: 'AVAILABLE',
          categoryId: 1,
          ownerId: 1
        }
      ];
      const returnedPets: Pet[] = [
        {
          id: 1,
          name: 'My pet',
          status: 'AVAILABLE',
          categoryId: 1,
          ownerId: 1
        },
        {
          id: 2,
          name: 'My second pet',
          status: 'AVAILABLE',
          categoryId: 1,
          ownerId: 1
        }
      ];
      prismaMock.pet.findMany.mockResolvedValue(foundPets);
      await expect(findMany()).resolves.toEqual(returnedPets);
      expect(prismaMock.pet.findMany).toHaveBeenCalledTimes(1);
    });

    it('Should throw error when finding multiple categories', async () => {
      prismaMock.pet.findMany.mockRejectedValue(new Error('Unable to process request'));
      await expect(findMany()).rejects.toThrow(Error);
      expect(prismaMock.pet.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('update()', () => {
    it('Should update a pet', async () => {
      const updatedPet: PrismaPet = {
        id: 1,
        name: 'Updated pet',
        status: 'AVAILABLE',
        categoryId: 1,
        ownerId: 1
      };
      const returnedPet: Pet = {
        id: 1,
        name: 'Updated pet',
        status: 'AVAILABLE',
        categoryId: 1,
        ownerId: 1
      };
      const dataToUpdate: Pet = {
        id: null,
        name: 'Updated pet',
        status: 'AVAILABLE',
        categoryId: 1,
        ownerId: 1
      };
      prismaMock.pet.update.mockResolvedValue(updatedPet);
      await expect(update(1, dataToUpdate)).resolves.toEqual(returnedPet);
      expect(prismaMock.pet.update).toHaveBeenCalledTimes(1);
    });

    it('Should throw error when updating a pet', async () => {
      const dataToUpdate: Pet = {
        id: null,
        name: 'Updated pet',
        status: 'AVAILABLE',
        categoryId: 1,
        ownerId: null
      };
      prismaMock.pet.update.mockRejectedValue(new Error('Unable to process request'));
      await expect(update(1, dataToUpdate)).rejects.toThrow(Error);
      expect(prismaMock.pet.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove()', () => {
    it('Should delete a pet', async () => {
      const deletedPet: PrismaPet = {
        id: 1,
        name: 'My pet',
        status: 'AVAILABLE',
        categoryId: 1,
        ownerId: 1
      };
      const returnedPet: Pet = {
        id: 1,
        name: 'My pet',
        status: 'AVAILABLE',
        categoryId: 1,
        ownerId: 1
      };
      prismaMock.pet.delete.mockResolvedValue(deletedPet);
      await expect(remove(1)).resolves.toEqual(returnedPet);
      expect(prismaMock.pet.delete).toHaveBeenCalledTimes(1);
    });

    it('Should throw error when deleting pet', async () => {
      prismaMock.pet.delete.mockRejectedValue(new Error('Unable to process request'));
      await expect(remove(1)).rejects.toThrow(Error);
      expect(prismaMock.pet.delete).toHaveBeenCalledTimes(1);
    });
  });
});
