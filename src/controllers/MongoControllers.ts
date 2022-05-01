import { Request, Response } from 'express';
import { RequestBody } from '../interfaces/RequestBody';
import MongoService from '../services/MongoService';
import ControllersErrors from '../enums/ControllersErrors';

export type ResponseError = {
  error: unknown,
};

abstract class MongoControllers<T> {
  abstract route: string;

  protected errors = ControllersErrors;

  constructor(public service: MongoService<T>) {}

  abstract create(
    req: RequestBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract read(
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res>;

  abstract readOne(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract update(
    req: RequestBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  abstract delete(
    req: Request<{ id: string; }>,
    res: Response<void | ResponseError>,
  ): Promise<typeof res>;
}

export default MongoControllers;