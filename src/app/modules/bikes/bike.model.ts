import { model, Schema } from 'mongoose'; 
import { TBike } from './bike.interface';


export const bikeSchema = new Schema<TBike>(
  {
    name: { type: String, required: true }, 
    model: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true }, 
    category: {
      type: String, 
      enum: ['Standard', 'SportBike', 'Scooter', 'Electric'],
      required: true, 
    },
    description: { type: String, required: true }, 
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }, 
);

export const BikeModel = model<TBike>('Bike', bikeSchema);
