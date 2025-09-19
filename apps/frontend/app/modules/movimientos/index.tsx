import { MovimientosService } from "~/api/services/movimientos";
import SimpleTable from "~/components/ui/Table";

export default function MovimientosPage() {
  return (
    <SimpleTable
      title="Movimientos"
      columns={["id", "empleado", "rol", "tipo", "fecha", "cubrio_turno"]}
      queryKey={["movimientos"]}
      queryFn={MovimientosService.obtenerMovimientos}
    />
  );
}
