import axiosInstance from "~/config/axios";

const obtenerEmpleados = async (search?: string) => {
  const response = await axiosInstance.get("/empleado", { params: { search } });
  return response.data;
};

const eliminarEmpleado = async (id: number) => {
  return await axiosInstance.delete(`/empleado/${id}`);
};

export const empleadosService = {
  obtenerEmpleados,
  eliminarEmpleado,
};
