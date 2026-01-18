import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        console.error('Make sure MONGO_URI is defined in your .env file or Vercel environment variables');
        if (!process.env.MONGO_URI) {
            console.error('Current MONGO_URI is undefined!');
        }
        process.exit(1);
    }
};

export default connectDB;
