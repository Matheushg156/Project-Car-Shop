import { expect } from 'chai';
import mongoose from 'mongoose';
import sinon from 'sinon';
import CarsModel from '../../../models/CarsModel';
import { 
  carPayload,
  carResponse,
  carsListResponse,
  carPayloadUpdated,
  carResponseUpdated } from '../mocks/carsMock';

describe('Car Model tests', () => {
  const carModel = new CarsModel();
  describe('Test for create method in carsModel', () => {
    before(async() => {
      sinon.stub(mongoose.Model, 'create').resolves(carResponse);
    });
    after(() => {
      sinon.restore();
    });

    it('should return car object', async() => {
      const car = await carModel.create(carPayload);
      expect(car).to.be.an('object');
    });

    it('should return car object with correct properties', async() => {
      const car = await carModel.create(carPayload);
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

  describe('Test for read method in carsModel', () => {
    before(async() => {
      sinon.stub(mongoose.Model, 'find').resolves(carsListResponse);
    });
    after(() => {
      sinon.restore();
    });

    it('should return array of cars', async() => {
      const cars = await carModel.read();
      expect(cars).to.be.an('array');
    });

    it('should return array of cars with correct properties', async() => {
      const cars = await carModel.read();
      expect(cars[0]).to.have.all.keys([
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

  describe('Test for readOne method in carsModel', () => {
    before(async() => {
      sinon.stub(mongoose.Model, 'findOne').resolves(carResponse);
    });
    after(() => {
      sinon.restore();
    });

    it('should return car object', async() => {
      const car = await carModel.readOne(carResponse._id);
      expect(car).to.be.an('object');
    });

    it('should return car object with correct properties', async() => {
      const car = await carModel.readOne(carResponse._id);
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

  describe('Test for update method in carsModel', () => {
    before(async() => {
      sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(carResponseUpdated);
    });
    after(() => {
      sinon.restore();
    });

    it('should return car object', async() => {
      const car = await carModel.update(carResponseUpdated._id, carPayloadUpdated);
      expect(car).to.be.an('object');
    });

    it('should return car object with correct properties', async() => {
      const car = await carModel.update(carResponse._id, carPayloadUpdated);
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

  describe('Test for delete method in carsModel', () => {
    before(async() => {
      sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(carResponse);
    });
    after(() => {
      sinon.restore();
    });

    it('should return car object', async() => {
      const car = await carModel.delete(carResponse._id);
      expect(car).to.be.an('object');
    });

    it('should return car object with correct properties', async() => {
      const car = await carModel.delete(carResponse._id);
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