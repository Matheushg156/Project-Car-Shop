import { expect } from 'chai';
import mongoose from 'mongoose';
import sinon from 'sinon';
import CarsModel from '../../../models/CarsModel';
import { carPayload, carResponse, carsListResponse } from './carsMock';

describe('Car Model tests', () => {
  const carModel = new CarsModel();
});