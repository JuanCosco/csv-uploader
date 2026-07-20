import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

interface JwtPayload {
    id: number,
    role: string;
}

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {

    console.log(`[MIDDLEWARE] Request to ${req.path}`);

    const token = req.cookies?.token;

    if (!token) {
        console.log('[MIDDLEWARE] No token found - rejecting');
        res.status(401).json({ ok: false, message: 'No autorizado' });
        return;
    }

    console.log('[MIDDLEWARE] Token found - verifying...');

    try {
        const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;

        console.log(`[MIDDLEWARE] Role: ${payload.role} - access granted`);

        if (payload.role !== 'admin') {
            console.log('[MIDDLEWARE] Role is not admin - rejecting');
            res.status(403).json({ ok: false, message: 'Acceso denegado' });
            return
        }

        next();
    } catch (error) {
        console.log('[MIDDLEWARE] Invalid token - rejecting')
        res.status(401).json({ ok: false, message: 'Token invalido' })
    }
}