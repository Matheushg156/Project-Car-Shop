import { expect } from 'chai';
import mongoose from 'mongoose';
import sinon from 'sinon';
import MotorcyclesModel from '../../../models/MotorcyclesModel';
import { 
  motorcyclePayload,
  motorcycleResponse,
  motorcyclesListResponse,
  motorcyclePayloadUpdated,
  motorcycleResponseUpdated } from '../mocks/motorcyclesMock';

describe('Motorcycle Model tests', () => {
  const motorcycleModel = new MotorcyclesModel();
  describe('Test for create method in motorcyclesModel', () => {
    before(async() => {
      sinon.stub(mongoose.Model, 'create').resolves(motorcycleResponse);
    });
    after(() => {
      sinon.restore();
    });

    it('should return motorcycle object', async() => {
      const motorcycle = await motorcycleModel.create(motorcyclePayload);
      expect(motorcycle).to.be.an('object');
    });

    it('should return motorcycle object with correct properties', async() => {
      const motorcycle = await motorcycleModel.create(motorcyclePayload);
      expect(motorcycle).to.have.all.keys([
        '_id',
        'model',
        'year',
        'color',
        'status',
        'buyValue',
        'engineCapacity',
        'category']);
    });
  });

  describe('Test for read method in motorcyclesModel', () => {
    before(async() => {
      sinon.stub(mongoose.Model, 'find').resolves(motorcyclesListResponse);
    });
    after(() => {
      sinon.restore();
    });

    it('should return array of motorcycles', async() => {
      const motorcycles = await motorcycleModel.read();
      expect(motorcycles).to.be.an('array');
    });

    it('should return array of motorcycles with correct properties', async() => {
      const motorcycles = await motorcycleModel.read();
      expect(motorcycles[0]).to.have.all.keys([
        '_id',
        'model',
        'year',
        'color',
        'status',
        'buyValue',
        'engineCapacity',
        'category']);
    });
  });

  describe('Test for readOne method in motorcyclesModel', () => {
    before(async() => {
      sinon.stub(mongoose.Model, 'findOne').resolves(motorcycleResponse);
    });
    after(() => {
      sinon.restore();
    });

    it('should return motorcycle object', async() => {
      const motorcycle = await motorcycleModel.readOne(motorcycleResponse._id);
      expect(motorcycle).to.be.an('object');
    });

    it('should return motorcycle object with correct properties', async() => {
      const motorcycle = await motorcycleModel.readOne(motorcycleResponse._id);
      expect(motorcycle).to.have.all.keys([
        '_id',
        'model',
        'year',
        'color',
        'status',
        'buyValue',
        'engineCapacity',
        'category']);
    });
  });

  describe('Test for update method in motorcyclesModel', () => {
    before(async() => {
      sinon.stub(mongoose.Model, 'findOneAndUpdate')
        .resolves(motorcycleResponseUpdated);
    });
    after(() => {
      sinon.restore();
    });

    it('should return motorcycle object', async() => {
      const motorcycle = await motorcycleModel
        .update(motorcycleResponseUpdated._id, motorcyclePayloadUpdated);
      expect(motorcycle).to.be.an('object');
    });

    it('should return motorcycle object with correct properties', async() => {
      const motorcycle = await motorcycleModel
        .update(motorcycleResponseUpdated._id, motorcyclePayloadUpdated);
      expect(motorcycle).to.have.all.keys([
        '_id',
        'model',
        'year',
        'color',
        'status',
        'buyValue',
        'engineCapacity',
        'category']);
    });
  });

  describe('Test for delete method in motorcyclesModel', () => {
    before(async() => {
      sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(motorcycleResponse);
    });
    after(() => {
      sinon.restore();
    });

    it('should return motorcycle object', async() => {
      const motorcycle = await motorcycleModel.delete(motorcycleResponse._id);
      expect(motorcycle).to.be.an('object');
    });

    it('should return motorcycle object with correct properties', async() => {
      const motorcycle = await motorcycleModel.delete(motorcycleResponse._id);
      expect(motorcycle).to.have.all.keys([
        '_id',
        'model',
        'year',
        'color',
        'status',
        'buyValue',
        'engineCapacity',
        'category']);
    });
  });
});