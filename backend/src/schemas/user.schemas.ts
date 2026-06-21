import { z } from "zod";

export const userRowSchema = z.object({
    name: z.string().min(1, "El campo nombre no puede estar vacio"),
    email: z.string().email("El formato del campo email es invalido"),
    age: z
        .string()
        .optional()
        .transform((val) => (val === '' || val === undefined ? undefined : Number(val)))
        .pipe(
            z.number()
                .int('El campo age debe ser un numero entero')
                .positive('El campo age debe ser un numero positivo')
                .optional()
        ),
});

export type UserRowInput = z.infer<typeof userRowSchema>