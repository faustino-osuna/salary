import { FormHelperText, IconButton, Stack, Typography } from '@mui/material';
import { DatePicker as MuiPicker } from '@mui/x-date-pickers';
import type { ComponentProps } from 'react';

interface Props {
  title?: string;
  helperText?: string;
  required?: boolean;
}

type DatePickerProps = ComponentProps<typeof MuiPicker> & Props;

export default function DatePicker({ title, helperText, required, ...props }: DatePickerProps) {
  return (
    <Stack gap={0.5}>
      {title && (
        <Typography sx={{ paddingLeft: 1.5 }} variant="caption">
          {title}
          {required ? " *" : ""}
        </Typography>
      )}
      <MuiPicker
        {...props}
        format="dd/MM/yyyy"
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </Stack>
  );
}