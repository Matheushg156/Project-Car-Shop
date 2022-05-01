import { 
  Motorcycle,
  MotorcycleSchema } from '../interfaces/MotorcycleInterface';
import ServiceError from '../interfaces/ServiceError';
import MongoService from './MongoService';
import MotorcyclesModel from '../models/MotorcyclesModel';

export default class MotorcycleService extends MongoService<Motorcycle> {
  private idLength = 24;

  constructor(model = new MotorcyclesModel()) {
    super(model);
  }

  public async create(data: Motorcycle): Promise<Motorcycle | ServiceError> {
    const parsed = MotorcycleSchema.safeParse(data);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(data);
  }

  public async read(): Promise<Motorcycle[]> {
    return this.model.read();
  }

  public async readOne(id: string): 
  Promise<Motorcycle | null | undefined | ServiceError> {
    if (id.length !== this.idLength) return undefined;
    return this.model.readOne(id);
  }

  public async update(id: string, data: Motorcycle):
  Promise<Motorcycle | null | undefined | ServiceError> {
    if (id.length !== this.idLength) return undefined;
    const parsed = MotorcycleSchema.safeParse(data);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.update(id, data);
  }

  public async delete(id: string):
  Promise<Motorcycle | null | undefined | ServiceError> {
    if (id.length !== this.idLength) return undefined;
    return this.model.delete(id);
  }
}