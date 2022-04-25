import CustomRouter from './Routes/Router';
import App from './app';

import CarsController from './controllers/CarController';

import { Car } from './interfaces/CarInterface';

const server = new App();

const carsController = new CarsController();

const CarRouter = new CustomRouter<Car>();

CarRouter.addRoute(carsController);

server.addRouter(CarRouter.router);

export default server;
