import CustomRouter from './Routes/Router';
import App from './app';

import CarsController from './controllers/CarController';
import MotorcyclesController from './controllers/MotorcycleController';

import { Car } from './interfaces/CarInterface';
import { Motorcycle } from './interfaces/MotorcycleInterface';

const server = new App();

const carsController = new CarsController();
const motorcyclesController = new MotorcyclesController();

const CarRouter = new CustomRouter<Car>();
const MotorcycleRouter = new CustomRouter<Motorcycle>();

CarRouter.addRoute(carsController);
MotorcycleRouter.addRoute(motorcyclesController);

server.addRouter(CarRouter.router);
server.addRouter(MotorcycleRouter.router);

export default server;
