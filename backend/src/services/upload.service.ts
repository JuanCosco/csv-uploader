import { parse } from "csv-parse/sync";
import { userRowSchema } from "../schemas/user.schemas";
import { createUser } from "../repositories/user.repository";

interface SuccessRecord {
    id: number;
    name: string;
    email: string;
    age?: number;
}

interface ErrorRecord {
    row: Number;
    details: Record<string, string>;
}

export const processCSV = async (buffer: Buffer) => {
    const records = parse(buffer, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
    });

    console.log(`[UPLOAD] Parsing CSV...`);
    console.log(`[UPLOAD] Total rows: ${records.length}`);

    const success: SuccessRecord[] = [];
    const errors: ErrorRecord[] = [];

    for (let i = 0; i < records.length; i++) {
        const row = records[i];
        const rowNumber = i + 2;

        const parsed = userRowSchema.safeParse(row);

        if (!parsed.success) {
            const details: Record<string, string> = {};
            for (const issue of parsed.error.issues) {
                const field = issue.path[0] as string;
                details[field] = issue.message;
            }
            console.log(`[UPLOAD] Row ${rowNumber} - INVALID →`, details);
            errors.push({ row: rowNumber, details });
            continue;
        }

        try {
            const user = await createUser(
                parsed.data.name,
                parsed.data.email,
                parsed.data.age
            );
            console.log(`[UPLOAD] Row ${rowNumber} - VALID → inserted with id: ${user.id}`);
            success.push(user);
        } catch {
            console.log(`[UPLOAD] Row ${rowNumber} - DB ERROR → duplicate email`);
            errors.push({
                row: rowNumber,
                details: { email: 'El email ya existe en la base de datos' },
            });
        }
    }

    console.log(`[UPLOAD] Done - ${success.length} success, ${errors.length} errors`);

    return { success, errors };
};
