import { Model } from '../interfaces/ModelInterface';
import ServiceError from '../interfaces/ServiceError';

export default abstract class MongoService<T> {
  constructor(protected model: Model<T>) {}

  public async create(data: T): Promise<T | ServiceError> {
    return this.model.create(data);
  }

  public async read(): Promise<T[]> {
    return this.model.read();
  }

  public async readOne(id: string):
  Promise<T | null | undefined | ServiceError> {
    return this.model.readOne(id);
  }

  public async update(id: string, data: T):
  Promise<T | null | undefined | ServiceError> {
    return this.model.update(id, data);
  }

  public async delete(id: string):
  Promise<T | null | undefined | ServiceError> {
    return this.model.delete(id);
  }
}