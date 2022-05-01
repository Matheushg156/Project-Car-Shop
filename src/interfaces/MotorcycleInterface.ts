import { Document } from 'mongoose';
import { z } from 'zod';
import { VehicleSchema } from './VehicleInterface';

export const MotorcycleSchema = VehicleSchema.extend({
  engineCapacity: z.number().int().min(1).max(2500),
  category: z.enum(['Street', 'Custom', 'Trail']),
});

export type Motorcycle = z.infer<typeof MotorcycleSchema>;
export interface MotorcycleDocument extends Document, Motorcycle {}