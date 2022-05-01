import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';

import CarsController from '../../../controllers/CarController';

import { 
  carPayload,
  carResponse,
  carsListResponse,
  carPayloadUpdated,
  carResponseUpdated,
  carInvalidPayload,
  carErrorResponse } from '../mocks/carsMock';

describe('Car Controller tests', () => {
  const carController = new CarsController();
  const request = {} as Request<{ id: string; }>;
  const response = {} as Response;

  describe('Test for route method in carsController', () => {
    it('Should return a route "/cars"', async () => {
      const result = carController.route;
      expect(result).to.be.equal('/cars');
    });
  });

  describe('Test for create method in carsController', () => {
    describe('success scenario', () => {
      before(async() => {
        request.body = carPayload;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'create').resolves(carResponse);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 201 status code', async() => {
        await carController.create(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(201)).to.be.equal(true);
      });

      it('should return a car object', async() => {
        await carController.create(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith(carResponse)).to.be.equal(true);
      });
    });

    describe('fail scenario with no body', () => {
      before(async() => {
        request.body = carPayload;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'create').resolves(null as any);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 500 status code', async() => {
        await carController.create(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(500)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await carController.create(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Bad request' })).to.be.equal(true);
      });
    });

    describe('fail scenario with invalid body', () => {
      before(async() => {
        request.body = carInvalidPayload;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'create')
          .resolves(carErrorResponse as any);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 400 status code', async() => {
        await carController.create(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(400)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await carController.create(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Doors quantity must be a number' }))
          .to.be.equal(true);
      });
    });

    describe('fail scenario in create method', () => {
      before(async() => {
        request.body = carPayload;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'create').rejects();
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 500 status code', async() => {
        await carController.create(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(500)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await carController.create(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Bad request' })).to.be.equal(true);
      });
    });
  });

  describe('Test for read method in carsController', () => {
    describe('success scenario', () => {
      before(async() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'read').resolves(carsListResponse);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 200 status code', async() => {
        await carController.read(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(200)).to.be.equal(true);
      });

      it('should return a car list', async() => {
        await carController.read(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith(carsListResponse)).to.be.equal(true);
      });
    });

    describe('fail scenario in read method', () => {
      before(async() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'read').rejects();
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 500 status code', async() => {
        await carController.read(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(500)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await carController.read(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Bad request' })).to.be.equal(true);
      });
    });
  });

  describe('Test for readOne method in carsController', () => {
    describe('success scenario', () => {
      before(async() => {
        request.params = { id: carResponse._id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'readOne').resolves(carResponse);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 200 status code', async() => {
        await carController.readOne(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(200)).to.be.equal(true);
      });

      it('should return a car object', async() => {
        await carController.readOne(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith(carResponse)).to.be.equal(true);
      });
    });

    describe('fail scenario with invalid id', () => {
      before(async() => {
        request.params = { id: '1' };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'readOne').resolves(undefined);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 400 status code', async() => {
        await carController.readOne(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(400)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await carController.readOne(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Id must have 24 hexadecimal characters' }))
          .to.be.equal(true);
      });
    });

    describe('fail scenario here is no car with id serch', () => {
      before(async() => {
        request.params = { id: '5e9f8f9f9f9f9f9f9f9f9g35' };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'readOne').resolves(null);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 404 status code', async() => {
        await carController.readOne(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(404)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await carController.readOne(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Object not found' })).to.be.equal(true);
      });
    });

    describe('fail scenario in readOne method', () => {
      before(async() => {
        request.params = { id: carResponse._id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'readOne').rejects();
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 500 status code', async() => {
        await carController.readOne(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(500)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await carController.readOne(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Bad request' })).to.be.equal(true);
      });
    });
  });

  describe('Test for update method in carsController', () => {
    describe('success scenario', () => {
      before(async() => {
        request.params = { id: carResponseUpdated._id };
        request.body = carPayloadUpdated;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'update').resolves(carResponseUpdated);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 200 status code', async() => {
        await carController.update(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(200)).to.be.equal(true);
      });

      it('should return a car object', async() => {
        await carController.update(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith(carResponseUpdated)).to.be.equal(true);
      });
    });

    describe('fail scenario with invalid id', () => {
      before(async() => {
        request.params = { id: '1' };
        request.body = carPayloadUpdated;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'update').resolves(undefined);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 400 status code', async() => {
        await carController.update(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(400)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await carController.update(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Id must have 24 hexadecimal characters' }))
          .to.be.equal(true);
      });
    });

    describe('fail scenario here is no car with id serch', () => {
      before(async() => {
        request.params = { id: '5e9f8f9f9f9f9f9f9f9f9g35' };
        request.body = carPayloadUpdated;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'update').resolves(null);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 404 status code', async() => {
        await carController.update(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(404)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await carController.update(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Object not found' })).to.be.equal(true);
      });
    });

    describe('fail scenario in update method', () => {
      before(async() => {
        request.params = { id: carResponseUpdated._id };
        request.body = carPayloadUpdated;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'update').rejects();
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 500 status code', async() => {
        await carController.update(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(500)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await carController.update(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Bad request' })).to.be.equal(true);
      });
    });
  });

  describe('Test for delete method in carsController', () => {
    describe('success scenario', () => {
      before(async() => {
        request.params = { id: carResponse._id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'delete').resolves(carResponse);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 204 status code', async() => {
        await carController.delete(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(204)).to.be.equal(true);
      });
    });

    describe('fail scenario with invalid id', () => {
      before(async() => {
        request.params = { id: '1' };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'delete').resolves(undefined);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 400 status code', async() => {
        await carController.delete(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(400)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await carController.delete(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Id must have 24 hexadecimal characters' }))
          .to.be.equal(true);
      });
    });

    describe('fail scenario here is no car with id serch', () => {
      before(async() => {
        request.params = { id: '5e9f8f9f9f9f9f9f9f9f9g35' };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'delete').resolves(null);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 404 status code', async() => {
        await carController.delete(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(404)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await carController.delete(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Object not found' })).to.be.equal(true);
      });
    });

    describe('fail scenario in delete method', () => {
      before(async() => {
        request.params = { id: carResponse._id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(carController.service, 'delete').rejects();
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 500 status code', async() => {
        await carController.delete(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(500)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await carController.delete(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Bad request' })).to.be.equal(true);
      });
    });
  });
});