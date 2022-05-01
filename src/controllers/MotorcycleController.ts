import { Request, Response } from 'express';
import MongoControllers, { ResponseError } from './MongoControllers';
import MotorcyclesService from '../services/MotorcyclesService';
import { RequestBody } from '../interfaces/RequestBody';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

class MotorcyclesController extends MongoControllers<Motorcycle> {
  private _route: string;

  constructor(service = new MotorcyclesService()) {
    super(service);
    this._route = '/motorcycles';
  }

  get route(): string {
    return this._route;
  }

  create = async (
    req: RequestBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { body } = req;
    try {
      const motorcycle = await this.service.create(body);
      if (!motorcycle) {
        return res.status(500).json({ error: this.errors.badRequest });
      }
      if ('error' in motorcycle) {
        return res.status(400)
          .json({ error: motorcycle.error.issues[0].message });
      }
      return res.status(201).json(motorcycle);
    } catch (error) {
      return res.status(500).json({ error: this.errors.badRequest });
    }
  };

  read = async (
    _req: Request,
    res: Response<Motorcycle[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const motorcycles = await this.service.read();
      return res.status(200).json(motorcycles);
    } catch (error) {
      return res.status(500).json({ error: this.errors.badRequest });
    }
  };

  readOne = async (
    req: Request<{ id: string; }>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    try {
      const motorcycle = await this.service.readOne(id);
      if (motorcycle === undefined) {
        return res.status(400).json({ error: this.errors.idLength });
      }
      if (!motorcycle) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(200).json(motorcycle);
    } catch (error) {
      return res.status(500).json({ error: this.errors.badRequest });
    }
  };

  update = async (
    req: RequestBody<Motorcycle>,
    res: Response<Motorcycle | ResponseError>,
  ): Promise<typeof res> => {
    const { id } = req.params;
    const { body } = req;
    try {
      const motorcycle = await this.service.update(id, body);
      if (motorcycle === undefined) {
        return res.status(400).json({ error: this.errors.idLength });
      }
      if (!motorcycle) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(200).json(motorcycle);
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
      const motorcycle = await this.service.delete(id);
      if (motorcycle === undefined) {
        return res.status(400).json({ error: this.errors.idLength });
      }
      if (!motorcycle) {
        return res.status(404).json({ error: this.errors.notFound });
      }
      return res.status(204).json();
    } catch (error) {
      return res.status(500).json({ error: this.errors.badRequest });
    }
  };
}

export default MotorcyclesController;