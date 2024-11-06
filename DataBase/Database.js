import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();
const MONGO_URL = process.env.MONGO_URL;

export const DatabaseDB = async () => {
    try {
        mongoose.connect(MONGO_URL).then(() => {
            console.log("Database is connected on MONGO_URL sever base 👋👋👋👋")
        })
    } catch (error) {
        console.log('Error connection to MONGODB SEVER 👋👋👋👋')
        process.exit(1)
    }
}