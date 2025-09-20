import { z } from "zod";

export const UpdateMovimientoSchema = z.object({
  id: z.number(),
  empleadoId: z
    .number()
    .min(1, { message: "El id del empleado es obligatorio" }),
  rolId: z.number().min(1, { message: "El id del rol es obligatorio" }),
  tipoId: z.number().min(1, { message: "El id del tipo es obligatorio" }),
  horasTrabajadas: z.number().default(8),
  entregas: z.number().default(0),
  fecha: z
    .string()
    .min(1, { message: "La fecha es obligatoria" })
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "La fecha debe ser un string ISO válido",
    }),
  cubrioTurno: z.boolean()
});

export type UpdateMovimientoDTO = z.infer<typeof UpdateMovimientoSchema>;
