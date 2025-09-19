import axiosInstance from "~/config/axios";

const obtenerRoles = async () => {
  const response = await axiosInstance.get("/rol");
  return response.data;
};

export const rolesService = {
  obtenerRoles
};
