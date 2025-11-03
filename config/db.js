import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const connectionDb = async()=>{
  try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log('Database connected successfully');
  } catch (error) {
    console.log("Database connection error:", error);
  }

}

export default connectionDb;