import { Controller, useFormContext } from "react-hook-form";
import Checkbox from "./Checkbox";
import type { ComponentProps } from "react";

interface FormComponentProps {
  name: string;
  defaultValue?: any;
}

interface AdditionalProps {
  title?: string;
  label?: string;
  required?: boolean;
}

type FormCheckboxProps = ComponentProps<typeof Checkbox> &
  FormComponentProps &
  AdditionalProps;

export default function FormCheckbox({
  name,
  defaultValue = false,
  ...props
}: FormCheckboxProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      control={control}
      render={({ field, fieldState }) => (
        <Checkbox
          {...props}
          {...field}
          checked={field.value || false}
          onChange={(event) => {
            field.onChange(event.target.checked);
          }}
        />
      )}
    />
  );
}