import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../repositories/auth.repository";
import { LoginInput } from "../schemas/auth.schemas";

export const loginService = async ({ email, password }: LoginInput) => {
    const user = await findUserByEmail(email);

    console.log('User encontrado:', user);
    console.log('Password del user:', user?.password);

    if (!user) {
        throw new Error("Credenciales invalidas");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password válido:', validPassword);
    if (!validPassword) {
        throw new Error("Credenciales invalidas");
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET as string,
        { expiresIn: "8h" }
    );

    return token;
};
