import { Request, Response } from 'express';
import MongoControllers, { ResponseError } from './MongoControllers';
import CarsService from '../services/CarsService';
import { RequestBody } from '../interfaces/RequestBody';
import { Car } from '../interfaces/CarInterface';

export default class CarsController extends MongoControllers<Car> {
  private _route: string;

  constructor(service = new CarsService()) {
    super(service);
    this._route = '/cars';
  }

  get route(): string {
    return this._route;
  }

  create = async (
    req: RequestBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const car = await this.service.create(body);
      if (!car) {
        return res.status(500).json({ error: this.errors.badRequest });
      }
      if ('error' in car) {
        return res.status(400).json({ error: car.error.issues[0].message });
      }
      return res.status(201).json(car);
    } catch (error) {
      return res.status(500).json({ error: this.errors.badRequest });
    }
  };

  read = async (
    _req: Request,
    res: Response<Car[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const cars = await this.service.read();
      return res.status(200).json(cars);
    } catch (error) {
      return res.status(500).json({ error: this.errors.badRequest });
    }
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const car = await this.service.readOne(id);
      if (car === undefined) {
        return res.status(400).json({ error: this.errors.idLength });
      }
      if (!car) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(200).json(car);
    } catch (error) {
      return res.status(500).json({ error: this.errors.badRequest });
    }
  };

  update = async (
    req: RequestBody<Car>,
    res: Response<Car | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;
    try {
      const car = await this.service.update(id, body);
      if (car === undefined) {
        return res.status(400).json({ error: this.errors.idLength });
      }
      if (!car) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(200).json(car);
    } catch (error) {
      return res.status(500).json({ error: this.errors.badRequest });
    }
  };

  delete = async (
    req: Request<{ id: string; }>,
    res: Response<void | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const car = await this.service.delete(id);
      if (car === undefined) {
        return res.status(400).json({ error: this.errors.idLength });
      }
      if (!car) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: this.errors.badRequest });
    }
  };
}