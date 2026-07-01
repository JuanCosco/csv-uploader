import { Request, Response } from "express";
import { processCSV } from "../services/upload.service";

export const uploadCSV = async (req: Request, res: Response) => {
    if (!req.file) {
        res.status(400).json({ ok: false, message: "No se recibio ningun archivo" });
        return;
    }

    console.log(`[UPLOAD] File received - ${req.file.originalname} (${req.file.size} bytes)`);

    try {
        const result = await processCSV(req.file.buffer);
        res.json({ ok: true, data: result });
    } catch {
        res.status(500).json({ ok: false, message: "Error procesando el archivo" });
    }
};
