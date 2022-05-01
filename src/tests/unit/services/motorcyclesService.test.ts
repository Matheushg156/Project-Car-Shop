import { expect } from 'chai';
import mongoose from 'mongoose';
import sinon from 'sinon';

import MotorcyclesService from '../../../services/MotorcyclesService';
import { MotorcycleSchema } from '../../../interfaces/MotorcycleInterface';

import { 
  motorcyclePayload,
  motorcycleResponse,
  motorcyclesListResponse,
  motorcyclePayloadUpdated,
  motorcycleResponseUpdated,
  motorcycleInvalidPayload,
  invalidId } from '../mocks/motorcyclesMock';

describe('Motorcycle Service tests', () => {
  const motorcycleService = new MotorcyclesService();
  describe('Test for create method in motorcyclesService', () => {
    describe('success scenario', () => {
      before(async() => {
        sinon.stub(mongoose.Model, 'create').resolves(motorcycleResponse);
      });
      after(() => {
        sinon.restore();
      });

      it('should return motorcycle object', async() => {
        const motorcycle = await motorcycleService.create(motorcyclePayload);
        expect(motorcycle).to.be.an('object');
      });
  
      it('should return motorcycle object with correct properties', async() => {
        const motorcycle = await motorcycleService.create(motorcyclePayload);
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

    describe('fail scenario', () => {
      before(async() => {
        sinon.stub(MotorcycleSchema, 'safeParse').rejects();
      });
      after(() => {
        sinon.restore();
      });

      it('should return ServiceError', async() => {
        const motorcycle = await motorcycleService
          .create(motorcycleInvalidPayload as any);
        expect(motorcycle).to.be.an('object');
        expect(motorcycle).to.have.all.keys(['error']);
      });
    });
  });

  describe('Test for read method in motorcyclesService', () => {
    before(async() => {
      sinon.stub(mongoose.Model, 'find').resolves(motorcyclesListResponse);
    });
    after(() => {
      sinon.restore();
    });

    it('should return array of motorcycles', async() => {
      const motorcycles = await motorcycleService.read();
      expect(motorcycles).to.be.an('array');
    });

    it('should return array of motorcycles with correct properties', async() => {
      const motorcycles = await motorcycleService.read();
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

  describe('Test for readOne method in motorcyclesService', () => {
    describe('success scenario', () => {
      before(async() => {
        sinon.stub(mongoose.Model, 'findOne').resolves(motorcycleResponse);
      });
      after(() => {
        sinon.restore();
      });
  
      it('should return motorcycle object', async() => {
        const motorcycle = await motorcycleService
          .readOne(motorcycleResponse._id);
        expect(motorcycle).to.be.an('object');
      });
  
      it('should return motorcycle object with correct properties', async() => {
        const motorcycle = await motorcycleService
          .readOne(motorcycleResponse._id);
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
    
    describe('fail scenario with invalid id', () => {
      before(async() => {
        sinon.stub(mongoose.Model, 'findOne').rejects();
      });
      after(() => {
        sinon.restore();
      });

      it('should return undefined', async() => {
        const motorcycle = await motorcycleService.readOne(invalidId);
        expect(motorcycle).to.be.equal(undefined);
      });
    });
  });

  describe('Test for update method in motorcyclesService', () => {
    describe('success scenario', () => {
      before(async() => {
        sinon.stub(mongoose.Model, 'findOneAndUpdate')
          .resolves(motorcycleResponseUpdated);
      });
      after(() => {
        sinon.restore();
      });

      it('should return motorcycle object', async() => {
        const motorcycle = await motorcycleService
          .update(motorcycleResponse._id, motorcyclePayloadUpdated);
        expect(motorcycle).to.be.an('object');
      });

      it('should return motorcycle object with correct properties', async() => {
        const motorcycle = await motorcycleService
          .update(motorcycleResponse._id, motorcyclePayloadUpdated);
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

    describe('fail scenario', () => {
      before(async() => {
        sinon.stub(MotorcycleSchema, 'safeParse').rejects();
      });
      after(() => {
        sinon.restore();
      });

      it('should return ServiceError', async() => {
        const motorcycle = await motorcycleService
          .update(motorcycleResponse._id, motorcycleInvalidPayload as any);
        expect(motorcycle).to.be.an('object');
        expect(motorcycle).to.have.all.keys(['error']);
      });
    });

    describe('fail scenario with invalid id', () => {
      it('should return undefined', async() => {
        const motorcycle = await motorcycleService
          .update(invalidId, motorcyclePayloadUpdated);
        expect(motorcycle).to.be.equal(undefined);
      });
    });
  });

  describe('Test for delete method in motorcyclesService', () => {
    before(async() => {
      sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(motorcycleResponse);
    });
    after(() => {
      sinon.restore();
    });

    it('should return motorcycle object', async() => {
      const motorcycle = await motorcycleService
        .delete(motorcycleResponse._id);
      expect(motorcycle).to.be.an('object');
    });

    it('should return motorcycle object with correct properties', async() => {
      const motorcycle = await motorcycleService
        .delete(motorcycleResponse._id);
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

  describe('fail scenario with invalid id', () => {
    it('should return undefined', async() => {
      const motorcycle = await motorcycleService.delete(invalidId);
      expect(motorcycle).to.be.equal(undefined);
    });
  });
});