import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';

import MotorcycleController from '../../../controllers/MotorcycleController';

import { 
  motorcyclePayload,
  motorcycleResponse,
  motorcyclesListResponse,
  motorcyclePayloadUpdated,
  motorcycleResponseUpdated,
  motorcycleInvalidPayload,
  motorcycleErrorResponse } from '../mocks/motorcyclesMock';

describe('Motorcycle Controller tests', () => {
  const motorcycleController = new MotorcycleController();
  const request = {} as Request<{ id: string; }>;
  const response = {} as Response;

  describe('Test for route method in motorcyclesController', () => {
    it('Should return a route "/motorcycles"', async () => {
      const result = motorcycleController.route;
      expect(result).to.be.equal('/motorcycles');
    });
  });

  describe('Test for create method in motorcyclesController', () => {
    describe('success scenario', () => {
      before(async() => {
        request.body = motorcyclePayload;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'create')
          .resolves(motorcycleResponse);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 201 status code', async() => {
        await motorcycleController.create(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(201)).to.be.equal(true);
      });

      it('should return a motorcycle object', async() => {
        await motorcycleController.create(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith(motorcycleResponse)).to.be.equal(true);
      });
    });

    describe('fail scenario with no body', () => {
      before(async() => {
        request.body = motorcyclePayload;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'create')
          .resolves(null as any);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 500 status code', async() => {
        await motorcycleController.create(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(500)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await motorcycleController.create(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Bad request' })).to.be.equal(true);
      });
    });

    describe('fail scenario with invalid body', () => {
      before(async() => {
        request.body = motorcycleInvalidPayload;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'create')
          .resolves(motorcycleErrorResponse as any);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 400 status code', async() => {
        await motorcycleController.create(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(400)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await motorcycleController.create(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Expected number, received string' }))
          .to.be.equal(true);
      });
    });

    describe('fail scenario in create method', () => {
      before(async() => {
        request.body = motorcyclePayload;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'create')
          .rejects();
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 500 status code', async() => {
        await motorcycleController.create(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(500)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await motorcycleController.create(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Bad request' })).to.be.equal(true);
      });
    });
  });

  describe('Test for read method in motorcyclesController', () => {
    describe('success scenario', () => {
      before(async() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'read')
          .resolves(motorcyclesListResponse);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 200 status code', async() => {
        await motorcycleController.read(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(200)).to.be.equal(true);
      });

      it('should return a motorcycles list', async() => {
        await motorcycleController.read(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith(motorcyclesListResponse)).to.be.equal(true);
      });
    });

    describe('fail scenario in read method', () => {
      before(async() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'read')
          .rejects();
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 500 status code', async() => {
        await motorcycleController.read(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(500)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await motorcycleController.read(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Bad request' })).to.be.equal(true);
      });
    });
  });

  describe('Test for readOne method in motorcyclesController', () => {
    describe('success scenario', () => {
      before(async() => {
        request.params = { id: motorcycleResponse._id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'readOne')
          .resolves(motorcycleResponse);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 200 status code', async() => {
        await motorcycleController.readOne(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(200)).to.be.equal(true);
      });

      it('should return a motorcycle object', async() => {
        await motorcycleController.readOne(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith(motorcycleResponse)).to.be.equal(true);
      });
    });

    describe('fail scenario with invalid id', () => {
      before(async() => {
        request.params = { id: '1' };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'readOne')
          .resolves(undefined);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 400 status code', async() => {
        await motorcycleController.readOne(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(400)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await motorcycleController.readOne(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Id must have 24 hexadecimal characters' }))
          .to.be.equal(true);
      });
    });

    describe('fail scenario here is no motorcycle with id serch', () => {
      before(async() => {
        request.params = { id: '5e9f8f9f9f9f9f9f9f9f9g35' };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'readOne')
          .resolves(null);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 404 status code', async() => {
        await motorcycleController.readOne(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(404)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await motorcycleController.readOne(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Object not found' })).to.be.equal(true);
      });
    });

    describe('fail scenario in readOne method', () => {
      before(async() => {
        request.params = { id: motorcycleResponse._id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'readOne').rejects();
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 500 status code', async() => {
        await motorcycleController.readOne(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(500)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await motorcycleController.readOne(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Bad request' })).to.be.equal(true);
      });
    });
  });

  describe('Test for update method in motorcyclesController', () => {
    describe('success scenario', () => {
      before(async() => {
        request.params = { id: motorcycleResponseUpdated._id };
        request.body = motorcyclePayloadUpdated;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'update')
          .resolves(motorcycleResponseUpdated);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 200 status code', async() => {
        await motorcycleController.update(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(200)).to.be.equal(true);
      });

      it('should return a motorcycle object', async() => {
        await motorcycleController.update(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith(motorcycleResponseUpdated)).to.be.equal(true);
      });
    });

    describe('fail scenario with invalid id', () => {
      before(async() => {
        request.params = { id: '1' };
        request.body = motorcyclePayloadUpdated;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'update')
          .resolves(undefined);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 400 status code', async() => {
        await motorcycleController.update(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(400)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await motorcycleController.update(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Id must have 24 hexadecimal characters' }))
          .to.be.equal(true);
      });
    });

    describe('fail scenario here is no motorcycle with id serch', () => {
      before(async() => {
        request.params = { id: '5e9f8f9f9f9f9f9f9f9f9g35' };
        request.body = motorcyclePayloadUpdated;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'update')
          .resolves(null);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 404 status code', async() => {
        await motorcycleController.update(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(404)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await motorcycleController.update(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Object not found' })).to.be.equal(true);
      });
    });

    describe('fail scenario in update method', () => {
      before(async() => {
        request.params = { id: motorcycleResponseUpdated._id };
        request.body = motorcyclePayloadUpdated;
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'update').rejects();
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 500 status code', async() => {
        await motorcycleController.update(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(500)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await motorcycleController.update(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Bad request' })).to.be.equal(true);
      });
    });
  });

  describe('Test for delete method in motorcyclesController', () => {
    describe('success scenario', () => {
      before(async() => {
        request.params = { id: motorcycleResponse._id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'delete')
          .resolves(motorcycleResponse);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 204 status code', async() => {
        await motorcycleController.delete(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(204)).to.be.equal(true);
      });
    });

    describe('fail scenario with invalid id', () => {
      before(async() => {
        request.params = { id: '1' };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'delete')
          .resolves(undefined);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 400 status code', async() => {
        await motorcycleController.delete(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(400)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await motorcycleController.delete(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Id must have 24 hexadecimal characters' }))
          .to.be.equal(true);
      });
    });

    describe('fail scenario here is no motorcycle with id serch', () => {
      before(async() => {
        request.params = { id: '5e9f8f9f9f9f9f9f9f9f9g35' };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'delete')
          .resolves(null);
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 404 status code', async() => {
        await motorcycleController.delete(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(404)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await motorcycleController.delete(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Object not found' })).to.be.equal(true);
      });
    });

    describe('fail scenario in delete method', () => {
      before(async() => {
        request.params = { id: motorcycleResponse._id };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns(response);
        sinon.stub(motorcycleController.service, 'delete').rejects();
      });
      after(() => {
        sinon.restore();
      });

      it('should return a 500 status code', async() => {
        await motorcycleController.delete(request, response);
        expect((response.status as sinon.SinonStub)
          .calledWith(500)).to.be.equal(true);
      });

      it('should return a error', async() => {
        await motorcycleController.delete(request, response);
        expect((response.json as sinon.SinonStub)
          .calledWith({ error: 'Bad request' })).to.be.equal(true);
      });
    });
  });
});