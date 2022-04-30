import { expect } from 'chai';
import sinon from 'sinon';
import { Car } from '../../../interfaces/CarInterface';

import CarsModel from '../../../models/CarsModel';
import MongoService from '../../../services/MongoService';

import { 
  carPayload,
  carResponse,
  carsListResponse,
  carPayloadUpdated,
  carResponseUpdated } from '../mocks/carsMock';

class CarsService extends MongoService<Car> {}

describe('Mongo Service tests', () => {
  const carModel = new CarsModel();
  const carService = new CarsService(carModel);
  describe('Test for create method in mongoService', () => {
    before(async() => {
      sinon.stub(carModel, 'create').resolves(carResponse);
    });
    after(() => {
      sinon.restore();
    });

    it('should return car object', async() => {
      const car = await carService.create(carPayload);
      expect(car).to.be.an('object');
    });
  
    it('should return car object with correct properties', async() => {
      const car = await carService.create(carPayload);
      expect(car).to.have.all.keys([
        '_id',
        'model',
        'year',
        'color',
        'status',
        'buyValue',
        'doorsQty',
        'seatsQty']);
    });
  });

  describe('Test for read method in mongoService', () => {
    before(async() => {
      sinon.stub(carModel, 'read').resolves(carsListResponse);
    });
    after(() => {
      sinon.restore();
    });

    it('should return car object', async() => {
      const car = await carService.read();
      expect(car).to.be.an('array');
    });
  
    it('should return car object with correct properties', async() => {
      const car = await carService.read();
      expect(car[0]).to.have.all.keys([
        '_id',
        'model',
        'year',
        'color',
        'status',
        'buyValue',
        'doorsQty',
        'seatsQty']);
    });
  });

  describe('Test for readOne method in mongoService', () => {
    before(async() => {
      sinon.stub(carModel, 'readOne').resolves(carResponse);
    });
    after(() => {
      sinon.restore();
    });

    it('should return car object', async() => {
      const car = await carService.readOne(carResponse._id);
      expect(car).to.be.an('object');
    });
  
    it('should return car object with correct properties', async() => {
      const car = await carService.readOne(carResponse._id);
      expect(car).to.have.all.keys([
        '_id',
        'model',
        'year',
        'color',
        'status',
        'buyValue',
        'doorsQty',
        'seatsQty']);
    });
  });

  describe('Test for update method in mongoService', () => {
    before(async() => {
      sinon.stub(carModel, 'update').resolves(carResponseUpdated);
    });
    after(() => {
      sinon.restore();
    });

    it('should return car object', async() => {
      const car = await carService.update(carResponseUpdated._id, carPayloadUpdated);
      expect(car).to.be.an('object');
    });
  
    it('should return car object with correct properties', async() => {
      const car = await carService.update(carResponseUpdated._id, carPayloadUpdated);
      expect(car).to.have.all.keys([
        '_id',
        'model',
        'year',
        'color',
        'status',
        'buyValue',
        'doorsQty',
        'seatsQty']);
    });
  });

  describe('Test for delete method in mongoService', () => {
    before(async() => {
      sinon.stub(carModel, 'delete').resolves(carResponse);
    });
    after(() => {
      sinon.restore();
    });

    it('should return car object', async() => {
      const car = await carService.delete(carResponse._id);
      expect(car).to.be.an('object');
    });
  
    it('should return car object with correct properties', async() => {
      const car = await carService.delete(carResponse._id);
      expect(car).to.have.all.keys([
        '_id',
        'model',
        'year',
        'color',
        'status',
        'buyValue',
        'doorsQty',
        'seatsQty']);
    });
  });
});