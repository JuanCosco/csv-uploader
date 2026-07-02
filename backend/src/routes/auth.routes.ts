import { Router } from "express";
import { login } from "../controllers/auth.controllers";
import { requireAdmin } from "../middlewares/auth.middleware";

const router = Router();

router.post("/login", login);
router.get("/protected", requireAdmin, (_req, res) => {
    res.json({ ok: true, message: "Eres admin" });
});

router.get("/me", requireAdmin, (_req, res) => {
    res.json({ ok: true });
});

export default router;