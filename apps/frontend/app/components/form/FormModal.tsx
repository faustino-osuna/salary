import { type UseFormReturn, type FieldValues, FormProvider } from "react-hook-form";
import { Stack, Typography, IconButton, Button, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import Modal from "../ui/Modal";
import type { FormEvent, ReactNode } from "react";

interface FormModalProps<T extends FieldValues = FieldValues> {
  title?: string;
  open: boolean;
  children: ReactNode;
  onClose: () => void;
  form: UseFormReturn<T>;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  width?: string;
  fullWidth?: boolean;
  isMutating?: boolean;
  saveText?: string;
  hideSaveButtonIcon?: boolean;
  Footer?: ReactNode;
}

export default function FormModal<T extends FieldValues>({
  title,
  open,
  children,
  onClose,
  form,
  onSubmit,
  width,
  fullWidth = false,
  isMutating = false,
  saveText = "Guardar",
  hideSaveButtonIcon = false,
  Footer,
  ...props
}: FormModalProps<T>) {
  return (
    <Modal
      open={open}
      {...props}
      scroll="body"
      fullWidth={fullWidth}
      PaperProps={{ sx: { width: width ?? "auto" } }}
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
                  startIcon={!hideSaveButtonIcon && <SaveIcon fontSize="small" />}
                  type="submit"
                  disabled={isMutating}
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
