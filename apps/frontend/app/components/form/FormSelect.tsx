import { Controller, useFormContext } from "react-hook-form";
import Select from "./Select";
import { type ComponentProps } from "react";

interface FormComponentProps {
  name: string;
  defaultValue?: any;
}

type FormSelectProps = ComponentProps<typeof Select> & FormComponentProps;

export default function FormSelect({
  name,
  defaultValue,
  ...props
}: FormSelectProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field, fieldState }) => (
        <Select
          {...field}
          error={!!fieldState.error}
          helperText={fieldState?.error?.message}
          {...props}
        />
      )}
    />
  );
}
