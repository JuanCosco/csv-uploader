import { Router } from "express";
import { requireAdmin } from "../middlewares/auth.middleware";
import { createUser } from "../controllers/user.controllers";

const router = Router();

router.post('/users', requireAdmin, createUser);

export default router;