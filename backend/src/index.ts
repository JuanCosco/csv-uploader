import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import cors from 'cors'
import authRoutes from "./routes/auth.routes"
import uploadRoutes from "./routes/upload.routes"
import userRoutes from "./routes/user.routes"

dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api', userRoutes);


app.get("/health", (_req, res) => {
    res.json({ ok: true, message: "Server running" });
});


export default app;