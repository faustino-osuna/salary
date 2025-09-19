import { z } from "zod";

export const GetMovimientosSchema = z.object({
  id: z.number(),
  horasTrabajadas: z.number().nullable(),
  entregas: z.number().nullable(),
  fecha: z.string(),
  empleado: z.object({
    id: z.number(),
    nombre: z.string(),
    numero: z.number(),
    activo: z.boolean(),
  }),
  rol: z.object({
    id: z.number(),
    nombre: z.string(),
  }),
  tipo: z.object({
    id: z.number(),
    nombre: z.string(),
  }),
});

export type GetMovimientosDTO = z.infer<typeof GetMovimientosSchema>;
