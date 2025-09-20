import { useForm } from "react-hook-form";
import FormModal from "../../components/form/FormModal";
import { Grid } from "@mui/material";
import FormSelect from "~/components/form/FormSelect";
import FormField from "~/components/form/FormField";
import { useEffect } from "react";
import { empleadosService } from "~/api/services/empleados";
import { MovimientosService } from "~/api/services/movimientos";
import { useMutation, useQuery } from "@tanstack/react-query";
import { tiposService } from "~/api/services/tipos";
import { rolesService } from "~/api/services/roles";
import FormCheckbox from "~/components/form/FormCheckbox";
import FormDatePicker from "~/components/form/FormDatePicker";
import { format, parseISO } from "date-fns";

interface ModalMovimientosProps {
  open: boolean;
  onClose: () => void;
  data?: Record<string, any> | null;
  onSaved?: () => void;
  editMode?: boolean;
}

export interface MovimientoForm {
  id: number | null,
  empleadoId: number | null;
  rolId: number;
  tipoId: number;
  horasTrabajadas: number;
  entregas: number;
  fecha: Date;
  cubrioTurno: boolean;
}

const defaultValues = {
  empleadoId: null,
  rolId: 0,
  tipoId: 0,
  horasTrabajadas: 8,
  entregas: 0,
  fecha: new Date(),
  cubrioTurno: false
};


export default function ModalMovimientos({
  open,
  onClose,
  data,
  onSaved,
  editMode,
}: ModalMovimientosProps) {
  const form = useForm<MovimientoForm>({
    defaultValues,
  });

  const { mutate: guardarMovimiento } = useMutation({
    mutationFn: MovimientosService.crearMovimiento,
    onSuccess: () => {
      onClose();
      onSaved?.();
    },
  });

  const { mutate: editarMovimiento } = useMutation({
    mutationFn: MovimientosService.editarMovimiento,
    onSuccess: () => {
      onClose();
      onSaved?.();
    },
  });

  const { data: empleados, isFetching: isLoadingEmpleados } = useQuery({
    queryKey: ["empleados"],
    queryFn: () => empleadosService.obtenerEmpleados(),
    enabled: open,
  });

  const { data: tipos, isFetching: isLoadingTipos } = useQuery({
    queryKey: ["tipos"],
    queryFn: tiposService.obtenerTipos,
    enabled: open,
  });

  const { data: roles, isFetching: isLoadingRoles } = useQuery({
    queryKey: ["roles"],
    queryFn: rolesService.obtenerRoles,
    enabled: open,
  });


  const onSubmit = (data: MovimientoForm) => {
      const entregas = Number(data.entregas)
      if(isNaN(entregas)) return;
      if(editMode){
        guardarMovimiento({ ...data, entregas });
      } else {
        editarMovimiento({ ...data, entregas });
      }
      form.reset(defaultValues)
    };

  useEffect(() => {
    if (data) {
      form.reset({
        id: data.id,
        empleadoId: data.empleado.id,
        rolId: data.rol.id,
        tipoId: data.tipo.id,
        horasTrabajadas: data.horasTrabajadas,
        entregas: data.entregas,
        fecha: data.fecha ? parseISO(data.fecha) : new Date(),
        cubrioTurno: data.cubrio_turno || false
      });
    } else {
      form.reset(defaultValues);
    }
  }, [data, form]);

  return (
    <FormModal<MovimientoForm>
      title="Movimiento"
      open={open}
      onClose={onClose}
      form={form}
      width="300px"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Grid size={12}>
        <FormSelect
          title="Empleado"
          name="empleadoId"
          options={empleados || []}
          loading={isLoadingEmpleados}
        ></FormSelect>
      </Grid>
      <Grid size={6}>
        <FormSelect title="Rol" name="rolId" options={roles}></FormSelect>
      </Grid>
      <Grid size={6}>
        <FormSelect title="Tipo" name="tipoId" options={tipos} />
      </Grid>
      <Grid size={6}>
        <FormField title="Entregas" name="entregas" />
      </Grid>
      <Grid size={6}>
        <FormDatePicker title="Fecha" name="fecha" />
      </Grid>
      <Grid size={6}>
        <FormCheckbox label="Cubrio Turno" name="cubrioTurno" />
      </Grid>
    </FormModal>
  );
}
