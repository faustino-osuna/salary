import express from "express";
import cors from "cors";
import { empleadoRouter } from "./modules/empleado/infraestructure/routes/empleado.routes";
import { movimientoRouter } from "./modules/movimiento/infraestructure/routes/movimiento.routes";
import { tipoRouter } from "./modules/tipo/infraestructure/routes/tipo.routes";
import { rolRouter } from "./modules/rol/infraestructure/routes/rol.routes";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use("/api/v1/empleado", empleadoRouter);
app.use("/api/v1/movimiento", movimientoRouter);
app.use("/api/v1/tipo", tipoRouter);
app.use("/api/v1/rol", rolRouter);
export default app;
