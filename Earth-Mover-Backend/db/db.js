import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: process.env.DB_NAME,
        }).then(() => {
            console.log("Connected to MongoDB");
        })
    } catch (error) {
        console.log("Error: ", error);
    }
}

export default connectDB;