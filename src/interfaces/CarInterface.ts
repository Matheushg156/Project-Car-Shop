import { Document } from 'mongoose';
import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

export const CarSchema = VehicleSchema.extend({
  doorsQty: z
    .number({
      required_error: 'Doors quantity is required',
      invalid_type_error: 'Doors quantity must be a number',
    })
    .int()
    .gte(2, { message: 'Doors quantity must be greater or equal than 2' })
    .lte(4, { message: 'Doors quantity must be less or equal than 4' }),
  seatsQty: z
    .number({
      required_error: 'Seats quantity is required',
      invalid_type_error: 'Seats quantity must be a number',
    })
    .int()
    .gte(2, { message: 'Seats quantity must be greater or equal than 2' })
    .lte(7, { message: 'Seats quantity must be less or equal than 7' }),
});

export type Car = z.infer<typeof CarSchema>;
export interface CarDocument extends Document, Car {}