import pool from "../db";

export const findUserByEmail = async (email: string) => {
    const result = await pool.query(
        "SELECT * FROM USERS WHERE email = $1",
        [email]
    );
    return result.rows[0] ?? null;
};