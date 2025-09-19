import axiosInstance from "~/config/axios";

const obtenerTipos = async () => {
  const response = await axiosInstance.get("/tipo");
  return response.data;
};

export const tiposService = {
  obtenerTipos
};
