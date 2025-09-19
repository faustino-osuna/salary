import { z } from "zod";

export const UpdateMovimientoSchema = z.object({
  id: z.number().min(1, { message: "El id del empleado es obligatorio" }),
  horasTrabajadas: z.number().optional(),
  entregas: z.number().optional(),
  fecha: z.string().optional(),
  empleadoId: z.number().optional(),
  rolId: z.number().optional(),
  tipoId: z.number().optional(),
});

export type UpdateMovimientoDTO = z.infer<typeof UpdateMovimientoSchema>;
