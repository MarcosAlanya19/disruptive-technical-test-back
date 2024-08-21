import mongoose from 'mongoose';
import { config } from './config';

export async function connect(): Promise<void> {
  try {
    await mongoose.connect(config().mongoDB.URL_MONGO);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}
