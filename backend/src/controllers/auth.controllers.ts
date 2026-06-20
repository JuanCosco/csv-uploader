import { Request, Response } from "express";
import { loginSchema } from "../schemas/auth.schemas";
import { loginService } from "../services/auth.services";

export const login = async (req: Request, res: Response) => {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
        res.status(400).json({ ok: false, errors: parsed.error.issues });
        return;
    }

    try {
        const token = await loginService(parsed.data);
        console.log('Token generado:', token);

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 8 * 60 * 60 * 1000,
        });

        res.json({ ok: true, message: 'Login exitoso' });
    } catch (error) {
        console.log('Error capturado:', error);
        res.status(401).json({ ok: false, message: (error as Error).message });
    }
}