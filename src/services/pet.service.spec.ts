import { create, get, list, update, remove } from './pet.service';
import { Pet } from './../models/pet.model';
import * as petRepo from './../repositories/pet.repository';

jest.mock('./../repositories/pet.repository');

describe('Pet Repository', () => {

    describe('create()', async () => {

    });

});