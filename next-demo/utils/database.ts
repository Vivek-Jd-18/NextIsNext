import mongoose from "mongoose";

let isConnected: boolean = false
export const connectToDb = async () => {
   mongoose.set('strictQuery', true);

   if (isConnected) {
      console.log("MongoDB is already connected");
      return;
   }
   try {
      mongoose.connect(process.env.MONGODB_URI as string, {
         dbName: "",
         useNewUrlParser: true,
         useUnifiedTopology: true
      });
      isConnected = true;
      console.log("MongoDB connected");
   } catch (error) {
      console.log(error, "MongoDB connection failed");
   }
} 