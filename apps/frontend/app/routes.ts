import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("empleados", "routes/empleados.tsx"),
  route("movimientos", "routes/movimientos.tsx"),
] satisfies RouteConfig;
