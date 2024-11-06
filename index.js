import express from "express"
import dotenv from "dotenv"
import { DatabaseDB } from "./DataBase/Database.js"
import authRouter from "./routers/router.js"
import cors from 'cors'
import morgan from "morgan"

dotenv.config();

const app = express();
const PORT = process.env.PORT || PORT

app.use(express.json());

app.use(cors())
app.use(morgan("tiny"))

app.use("/api/auth", authRouter)


const server = app.listen(PORT, () => {
    console.log("Sever is Up and running in PORT 4000 🏀🏀🏀❤️❤️", PORT)
    DatabaseDB()
})

process.on("uncaughtException", (error) => {
    console.error("Uncaught exception, shutting down...", error);
    process.exit(1);
});

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled promise rejection, shutting down...", reason);
    server.close(() => process.exit(1));
});