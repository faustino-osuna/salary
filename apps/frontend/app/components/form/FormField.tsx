import { Controller, useFormContext } from "react-hook-form";
import TextField from "./TextField";
import type { ComponentProps } from "react";

interface FormComponentProps {
  name: string;
  defaultValue?: any;
}

interface AdditionalProps {
  title?: string;
  required?: boolean;
}

type FormFieldProps = ComponentProps<typeof TextField> &
  FormComponentProps &
  AdditionalProps;

export default function FormField({
  name,
  defaultValue,
  ...props
}: FormFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          {...props}
          {...field}
          error={!!fieldState.error}
          helperText={fieldState?.error?.message}
        />
      )}
    />
  );
}
