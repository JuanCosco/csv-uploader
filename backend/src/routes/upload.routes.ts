import { Router } from "express";
import multer from "multer";
import { requireAdmin } from "../middlewares/auth.middleware";
import { uploadCSV } from "../controllers/upload.controllers";

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", requireAdmin, upload.single('file'), uploadCSV);

export default router;