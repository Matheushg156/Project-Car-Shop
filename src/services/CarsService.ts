import { Car, CarSchema } from '../interfaces/CarInterface';
import ServiceError from '../interfaces/ServiceError';
import MongoService from './MongoService';
import CarsModel from '../models/CarsModel';

export default class CarsService extends MongoService<Car> {
  private idLength = 24;

  constructor(model = new CarsModel()) {
    super(model);
  }

  public async create(data: Car): Promise<Car | ServiceError> {
    const parsed = CarSchema.safeParse(data);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.create(data);
  }

  public async read(): Promise<Car[]> {
    return this.model.read();
  }

  public async readOne(id: string): 
  Promise<Car | null | undefined | ServiceError> {
    if (id.length !== this.idLength) return undefined;
    return this.model.readOne(id);
  }

  public async update(id: string, data: Car):
  Promise<Car | null | undefined | ServiceError> {
    if (id.length !== this.idLength) return undefined;
    const parsed = CarSchema.safeParse(data);
    if (!parsed.success) {
      return { error: parsed.error };
    }
    return this.model.update(id, data);
  }

  public async delete(id: string):
  Promise<Car | null | undefined | ServiceError> {
    if (id.length !== this.idLength) return undefined;
    return this.model.delete(id);
  }
}