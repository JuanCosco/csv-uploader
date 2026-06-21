import { userRowSchema } from "../schemas/user.schemas";
import { createUser } from "../repositories/user.repository";

export const createUserService = async (data: unknown) => {
    const parsed = userRowSchema.safeParse(data);

    if (!parsed.success) {
        const details: Record<string, string> = {};

        for (const issue of parsed.error.issues) {
            const field = issue.path[0] as string;
            details[field] = issue.message;
        }
        return { ok: false, errors: details };
    }

    try {
        const user = await createUser(
            parsed.data.name,
            parsed.data.email,
            parsed.data.age
        );
        return { ok: true, data: user };
    } catch {
        return { ok: false, errors: { email: 'El email ya existe en la base de datos' } };
    }
};
