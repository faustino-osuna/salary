import express from "express";
import cors from "cors";
import { empleadoRouter } from "./modules/empleado/infraestructure/routes/empleado.routes";
import { movimientoRouter } from "./modules/movimiento/infraestructure/routes/movimiento.routes";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/api/v1/empleado", empleadoRouter);
app.use("/api/v1/movimiento", movimientoRouter);

export default app;
