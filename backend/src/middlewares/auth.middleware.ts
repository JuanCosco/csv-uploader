import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
    id: number,
    role: string;
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        res.status(401).json({ ok: false, message: 'No autorizado' });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        if (payload.role !== 'admin') {
            res.status(403).json({ ok: false, message: 'Acceso denegado' });
            return
        }

        next();
    } catch (error) {
        res.status(401).json({ ok: false, message: 'Token invalido' })
    }
}