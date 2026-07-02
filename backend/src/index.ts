import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes"
import uploadRoutes from "./routes/upload.routes"
import userRoutes from "./routes/user.routes"
import cors from 'cors'

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', uploadRoutes);
app.use('/api', userRoutes);
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.get("/health", (_req, res) => {
    res.json({ ok: true, message: "Server running" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;