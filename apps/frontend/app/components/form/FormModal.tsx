import {
  Typography,
  Stack,
  Button,
  IconButton,
  Grid,
  type Breakpoint,
} from "@mui/material";
import {
  FormProvider,
  type UseFormReturn,
  type FieldValues,
} from "react-hook-form";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import type { ReactNode, FormEvent, ComponentProps } from "react";
import Modal from "../ui/Modal";

// Tipo para los breakpoints de MUI
type BreakpointValue = Breakpoint | false;

// Función auxiliar tipada
const isBreakpoint = (value: unknown): value is Breakpoint =>
  ["xs", "sm", "md", "lg", "xl"].includes(String(value));

// Props del componente FormModal
interface FormModalProps
  extends Omit<
    ComponentProps<typeof Modal>,
    "children" | "onSubmit" | "maxWidth"
  > {
  title?: string;
  isEditMode?: boolean;
  children: ReactNode;
  onClose: () => void;
  accept?: () => void;
  form: UseFormReturn<FieldValues>;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  maxWidth?: Breakpoint | string | number;
  fullWidth?: boolean;
  isMutating?: boolean;
  saveText?: string;
  hideSaveButtonIcon?: boolean;
  Footer?: ReactNode;
}

export default function FormModal({
  title,
  isEditMode,
  children,
  onClose,
  accept,
  form,
  onSubmit,
  maxWidth,
  fullWidth = true,
  isMutating = false,
  saveText = isEditMode ? "Guardar cambios" : "Guardar",
  hideSaveButtonIcon = false,
  Footer,
  ...props
}: FormModalProps) {
  return (
    <Modal
      {...props}
      maxWidth={isBreakpoint(maxWidth) ? maxWidth : false}
      scroll="body"
      fullWidth={fullWidth}
      PaperProps={{
        sx: { maxWidth: isBreakpoint(maxWidth) ? "auto" : maxWidth },
      }}
    >
      <Stack p={4} gap={3} width="100%">
        <Stack direction="row" justifyContent="space-between">
          {title && (
            <Typography paddingLeft={1.5} variant="h6" fontWeight="bold">
              {title}
            </Typography>
          )}
          <IconButton color="info" onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
        <FormProvider {...form}>
          <form onSubmit={onSubmit} noValidate>
            <Grid container spacing={2}>
              {children}
            </Grid>
            {Footer ? (
              Footer
            ) : (
              <Stack direction="row" justifyContent="flex-end" gap={2} mt={3}>
                <Button color="info" onClick={onClose} disabled={isMutating}>
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  sx={{ width: "50%", maxWidth: 240 }}
                  startIcon={
                    !hideSaveButtonIcon && <SaveIcon fontSize="small" />
                  }
                  onClick={accept}
                  disabled={isMutating}
                  type="submit"
                >
                  {saveText}
                </Button>
              </Stack>
            )}
          </form>
        </FormProvider>
      </Stack>
    </Modal>
  );
}
