import express, { Application } from "express";
import dotenv from "dotenv";
import authRoute from "./routes/authRoute";

const PORT = process.env.PORT || 9999;

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use('/api/auth', authRoute);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});