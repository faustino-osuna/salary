import { empleadosService } from "~/api/services/empleados";
import SimpleTable from "~/components/ui/Table";

export default function EmpleadosPage() {
  return (
    <SimpleTable
      columns={["id", "nombre", "numero", "rol", "tipo"]}
      queryKey={["empleados"]}
      queryFn={empleadosService.obtenerEmpleados}
      deleteFn={async (row) => {
        await empleadosService.eliminarEmpleado(row.id);
      }}
    />
  );
}
