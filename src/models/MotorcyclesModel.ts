import { Schema, model as createModel } from 'mongoose';
import MongoModel from './MongoModel';
import { 
  Motorcycle,
  MotorcycleDocument } from '../interfaces/MotorcycleInterface';

export const MotorcycleSchema = new Schema<MotorcycleDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  engineCapacity: Number,
  category: String,
}, { versionKey: false });

export default class MotorcyclesModel extends MongoModel<Motorcycle> {
  constructor(model = createModel('Motorcycle', MotorcycleSchema)) {
    super(model);
  }
}