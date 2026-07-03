import { userRowSchema } from "../schemas/user.schemas";
import { createUser } from "../repositories/user.repository";

export const createUserService = async (data: unknown) => {
    console.log('[USER] Correction attempt -', data);

    const parsed = userRowSchema.safeParse(data);

    if (!parsed.success) {
        const details: Record<string, string> = {};

        for (const issue of parsed.error.issues) {
            const field = issue.path[0] as string;
            details[field] = issue.message;
        }
        console.log('[USER] Validation failed -', details);
        return { ok: false, errors: details };
    }

    console.log('[USER] Validation passed - inserting...');

    try {
        const user = await createUser(
            parsed.data.name,
            parsed.data.email,
            parsed.data.age
        );
        console.log(`[USER] Inserted successfully - id: ${user.id}, email: ${user.email}`);
        return { ok: true, data: user };
    } catch {
        console.log('[USER] DB ERROR - duplicate email');
        return { ok: false, errors: { email: 'El email ya existe en la base de datos' } };
    }
};
