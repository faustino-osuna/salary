import { Checkbox as MuiCheckbox, FormControlLabel, Stack, Typography } from "@mui/material";
import type { ComponentProps, ChangeEvent } from "react";

interface Props {
  title?: string;
  label?: string;
  required?: boolean;
}

type CheckboxProps = ComponentProps<typeof MuiCheckbox> & Props;

export default function Checkbox({
  title,
  label,
  required,
  onChange,
  ...props
}: CheckboxProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (onChange) {
      onChange(event, checked);
    }
  };

  const checkboxElement = (
    <MuiCheckbox
      onChange={handleChange}
      {...props}
    />
  );

  return (
    <Stack gap={0.5}>
      {title && (
        <Typography sx={{ paddingLeft: 1.5 }} variant="caption">
          {title}
          {required ? " *" : ""}
        </Typography>
      )}
      {label ? (
        <FormControlLabel
          control={checkboxElement}
          label={label}
        />
      ) : (
        checkboxElement
      )}
    </Stack>
  );
}