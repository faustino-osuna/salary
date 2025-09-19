import MovimientosPage from "~/modules/movimientos";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movimientos" },
    { name: "listado de movimientos", content: "tabla de movimientos" },
  ];
}

export default function Home() {
  return <MovimientosPage />;
}
