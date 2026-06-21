import { $ZodE164 } from "zod/v4/core";
import pool from "../db";
import { id } from "zod/locales";

export const createUser = async (name: string, email: string, age?: number) => {
    const result = await pool.query(
        `INSERT INTO users (name, email, age)
        VALUES ($1, $2, $3)
        RETURNING id, name, email, age`,
        [name, email, age ?? null]
    );
    return result.rows[0];
};