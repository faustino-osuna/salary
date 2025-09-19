import type { Route } from "./+types/home";
import EmpleadosPage from "~/modules/empleados";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Empleados" },
    { name: "listado de empleados", content: "tabla de empleados" },
  ];
}

export default function Home() {
  return <EmpleadosPage />;
}
