import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Email invalido"),
    password: z.string().min(1, "Contraseña requerida"),
});

export type LoginInput = z.infer<typeof loginSchema>;
