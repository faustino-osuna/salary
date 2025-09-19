import axiosInstance from "~/config/axios";
import type { EmpleadoForm } from "~/modules/empleados/ModalEmpleados";

const obtenerEmpleados = async (search?: string) => {
  const response = await axiosInstance.get("/empleado", { params: { search } });
  return response.data;
};

const eliminarEmpleado = async (id: number) => {
  return await axiosInstance.delete(`/empleado/${id}`);
};

const crearEmpleado = async (data: EmpleadoForm) => {
  const { id, ...rest } = data;
  return await axiosInstance.post(`/empleado`, { data: rest });
}

const editarEmpleado = async (data: EmpleadoForm) => {
  const { id, ...rest } = data;
  return await axiosInstance.put(`/empleado/${id}`, { data: rest });
}

export const empleadosService = {
  obtenerEmpleados,
  eliminarEmpleado,
  crearEmpleado,
  editarEmpleado
};
