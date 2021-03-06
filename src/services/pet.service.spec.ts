import { create, get, list, update, remove } from './pet.service';
import Pet from './../models/pet.model';
import * as petRepo from './../repositories/pet.repository';

jest.mock('./../repositories/pet.repository');

describe('Pet Service', () => {
  describe('create()', () => {
    it('Should create a pet', async () => {
      const newPet: Pet = {
        id: null,
        name: 'My pet',
        status: 'AVAILABLE',
        categoryId: 1,
        ownerId: 1
      };
      const createdPet: Pet = {
        id: 1,
        name: 'My pet',
        status: 'AVAILABLE',
        categoryId: 1,
        ownerId: 1
      };
      /* @ts-ignore */
      petRepo.create.mockResolvedValue(createdPet);
      await expect(create(newPet)).resolves.toEqual(createdPet);
      expect(petRepo.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('list()', () => {
    it('Should list pets', async () => {
      const foundPets: Pet[] = [
        {
          id: 1,
          name: 'My pet',
          status: 'AVAILABLE',
          categoryId: 1,
          ownerId: 1
        },
        {
          id: 2,
          name: 'Second pet',
          status: 'AVAILABLE',
          categoryId: 1,
          ownerId: 1
        }
      ];
      /* @ts-ignore */
      petRepo.findMany.mockResolvedValue(foundPets);
      await expect(list()).resolves.toEqual(foundPets);
      expect(petRepo.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('get()', () => {
    it('Should find a pet by id', async () => {
      const foundPet: Pet = {
        id: 1,
        name: 'My pet',
        status: 'AVAILABLE',
        categoryId: 1,
        ownerId: 1
      };
      /* @ts-ignore */
      petRepo.findUnique.mockResolvedValue(foundPet);
      await expect(get(1)).resolves.toEqual(foundPet);
      expect(petRepo.findUnique).toHaveBeenCalledTimes(1);
    });
  });

  describe('update()', () => {
    it('Should update a pet', async () => {
      const dataToUpdate: Pet = {
        id: null,
        name: 'Updated pet',
        status: 'PENDING',
        categoryId: 2,
        ownerId: 2
      };
      const updatedPet: Pet = {
        id: 1,
        name: 'Updated pet',
        status: 'PENDING',
        categoryId: 2,
        ownerId: 2
      };
      /* @ts-ignore */
      petRepo.update.mockResolvedValue(updatedPet);
      await expect(update(1, dataToUpdate)).resolves.toEqual(updatedPet);
      expect(petRepo.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove()', () => {
    it('Should delete a pet by id', async () => {
      const deletedPet: Pet = {
        id: 1,
        name: 'Delete pet',
        status: 'SOLD',
        categoryId: 3,
        ownerId: 3
      };
      /* @ts-ignore */
      petRepo.remove.mockResolvedValue(deletedPet);
      await expect(remove(1)).resolves.toEqual(deletedPet);
      expect(petRepo.remove).toHaveBeenCalledTimes(1);
    });
  });
});
