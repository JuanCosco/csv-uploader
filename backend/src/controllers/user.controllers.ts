import { Request, Response } from "express";
import { createUserService } from "../services/user.service";

export const createUser = async (req: Request, res: Response) => {
    const result = await createUserService(req.body);

    if (!result.ok) {
        res.status(400).json(result);
        return;
    }

    res.status(201).json(result);
};