import { Controller, useFormContext } from 'react-hook-form';
import DatePicker from './DatePicker';
import type { ComponentProps } from 'react';

interface FormComponentProps {
  name: string;
  defaultValue?: any;
}

type FormDatePickerProps = ComponentProps<typeof DatePicker> & FormComponentProps;

export default function FormDatePicker({ name, defaultValue, ...props }: FormDatePickerProps) {
  const { control } = useFormContext();
  
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState: { error } }) => (
        <DatePicker {...field} helperText={error?.message} {...props} />
      )}
    />
  );
}