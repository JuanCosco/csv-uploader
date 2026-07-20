import { z } from "zod";
import dotenv from "dotenv"

dotenv.config();

const envSchema = z.object({
    DATABASE_URL: z.string().url('DATABASE_URL debe ser una URL válida'),
    JWT_SECRET: z.string().min(1, 'JWT_SECRET es requerido'),
    PORT: z.string().default('3000'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error('❌ [ENV] Variables de entorno inválidas:');
    parsed.error.issues.forEach(issue => {
        const path = issue.path[0] === undefined ? "root" : String(issue.path[0]);
        console.error(`   - ${path}: ${issue.message}`);
    });
    process.exit(1);
}

export const env = parsed.data; 