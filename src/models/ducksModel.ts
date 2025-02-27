import { Schema, model } from 'mongoose';
import { Duck } from '../interfaces/ducks';

const duckSchema = new Schema<Duck>({
    name: { type: String, required: true, min: 6, max: 255 },
    age: { type: Number, required: true },
    style: { type: String, required: true, min: 6, max: 255 },
    color: { type: String, required: true, min: 6, max: 255 },
    _createdby: { type: String, ref: 'User', required: true },
    likes: { type: Number, default: 0 } 
});

export const duckModel = model<Duck>('Duck', duckSchema);
