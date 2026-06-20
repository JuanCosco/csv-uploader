import express from "express"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
    res.json({ ok: true, message: "Server running" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;