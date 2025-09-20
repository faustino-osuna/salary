import { MovimientosService } from "~/api/services/movimientos";
import SimpleTable from "~/components/ui/Table";
import ModalMovimientos from "./ModalMovimientos";

export default function MovimientosPage() {
  return (
    <SimpleTable
      title="Movimientos"
      columns={["empleado", "rol", "tipo", "fecha", "entregas", "cubrio_turno"]}
      queryKey={["movimientos"]}
      queryFn={MovimientosService.obtenerMovimientos}
      deleteFn={async (row) => {
        await MovimientosService.eliminarMovimiento(row.id);
      }}
      ModalComponent={ModalMovimientos}
    />
  );
}
