import axiosInstance from "~/config/axios";
import type { MovimientoForm } from "~/modules/movimientos/ModalMovimientos";

const obtenerMovimientos = async (search?: string) => {
  const response = await axiosInstance.get("/movimiento", { params: { search } });
  return response.data;
};

const crearMovimiento = async (data: MovimientoForm) => {
  const { id, ...rest } = data;
  return await axiosInstance.post(`/movimiento`, { data: rest });
}

const editarMovimiento = async (data: MovimientoForm) => {
  const { id, ...rest } = data;
  console.log("id movimiento", id);
  return await axiosInstance.put(`/movimiento/${id}`, { data: rest });
}

const eliminarMovimiento = async (id: number) => {
  return await axiosInstance.delete(`/movimiento/${id}`);
};

export const MovimientosService = {
  obtenerMovimientos,
  crearMovimiento,
  editarMovimiento,
  eliminarMovimiento
};
