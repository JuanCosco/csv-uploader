import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../repositories/auth.repository";
import { LoginInput } from "../schemas/auth.schemas";

export const loginService = async ({ email, password }: LoginInput) => {
    console.log(`[AUTH] Login attempt - email: ${email}`);
    const user = await findUserByEmail(email);

    if (!user) {
        console.log("[AUTH] User not found");
        throw new Error("Credenciales invalidas");
    }

    console.log(`[AUTH] User found - role: ${user.role}`);

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        console.log("[AUTH] Invalid password");
        throw new Error("Credenciales invalidas");
    }

    console.log("[AUTH] Password valid - generating token...");

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "8h" },
    );

    console.log("[AUTH] Token generated successfully");

    return token;
};
