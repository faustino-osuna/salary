import axiosInstance from "~/config/axios";
import type { EmpleadoForm } from "~/modules/empleados/ModalEmpleados"; 

const obtenerMovimientos = async (search?: string) => {
  const response = await axiosInstance.get("/movimiento", { params: { search } });
  return response.data;
};

export const MovimientosService = {
  obtenerMovimientos
};
