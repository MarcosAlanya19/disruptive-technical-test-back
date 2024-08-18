import mongoose from 'mongoose';

export async function connect(): Promise<void> {
  try {
    await mongoose.connect('mongodb://localhost:27017/disruptive-app');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}
