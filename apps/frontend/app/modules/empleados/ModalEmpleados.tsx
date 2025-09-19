import { useForm } from "react-hook-form";
import FormModal from "../../components/form/FormModal"
import { Grid } from "@mui/material";
import FormSelect from "~/components/form/FormSelect";
import FormField from "~/components/form/FormField";
import { useEffect } from "react";
import { empleadosService } from "~/api/services/empleados";
import { useMutation, useQuery } from "@tanstack/react-query";
import { tiposService } from "~/api/services/tipos";
import { rolesService } from "~/api/services/roles";

interface ModalEmpleadosProps {
  open: boolean;
  onClose: () => void;
  data?: Record<string, any> | null;
  onSaved?: () => void;
  editMode?: boolean,
}

export interface EmpleadoForm {
  id: number | null;
  nombre: string;
  numero: number | null;
  rolId: number;
  tipoId: number;
}


const defaultValues = {
  id: null,
  nombre: "",
  numero: null,
  rolId: 0,
  tipoId: 0
}

export default function ModalEmpleados({ open, onClose, data, onSaved, editMode }: ModalEmpleadosProps) {

  const form = useForm<EmpleadoForm>({
    defaultValues
  })

  const { mutate: guardarEmpleado } = useMutation({
    mutationFn: empleadosService.crearEmpleado,
    onSuccess: () => {
      onClose();
      onSaved?.();
    },
  });

  const { mutate: editarEmpleado } = useMutation({
    mutationFn: empleadosService.editarEmpleado,
    onSuccess: () => {
      onClose();
      onSaved?.();
    },
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

  const onSubmit = (data: EmpleadoForm) => {
    if(editMode){
      guardarEmpleado({ ...data, numero: Number(data.numero) });
    } else {
      editarEmpleado({ ...data, numero: Number(data.numero) });
    }
    form.reset(defaultValues)
  };

  useEffect(() => {
  if (data) {
    form.reset({
      id: data.id,
      nombre: data.nombre,
      numero: data.numero,
      rolId: data.rolId,
      tipoId: data.tipoId,
    });
  } else {
    form.reset(defaultValues);
  }
}, [data, form]);

  return <FormModal<EmpleadoForm> title="Empleado" open={open} onClose={onClose} form={form} maxWidth="md" onSubmit={form.handleSubmit(onSubmit)}>
    <Grid size={6}>
      <FormField title="Nombre" name="nombre"/>
    </Grid>
    <Grid size={6}>
      <FormField title="Numero" name="numero"/>
    </Grid>
    <Grid size={6}>
      <FormSelect title="Rol" name="rolId" options={roles}></FormSelect>
    </Grid>
    <Grid size={6}>
      <FormSelect title="Tipo" name="tipoId" options={tipos}/>
    </Grid>
  </FormModal>
}