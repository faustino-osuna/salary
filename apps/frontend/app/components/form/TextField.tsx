import { TextField as MuiTextField, Stack, Typography } from "@mui/material";
import type { ComponentProps, ChangeEvent } from "react";

interface Props {
  title?: string;
  required?: boolean;
  integersOnly?: boolean;
  regex?: RegExp;
}

type TextFieldProps = ComponentProps<typeof MuiTextField> & Props;

export default function TextField({
  title,
  required,
  integersOnly,
  regex,
  onChange,
  placeholder = "Escribe aqui...",
  ...props
}: TextFieldProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (regex && !regex.test(value)) {
      return;
    }

    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Stack gap={0.5}>
      {title && (
        <Typography sx={{ paddingLeft: 1.5 }} variant="caption">
          {title}
          {required ? " *" : ""}
        </Typography>
      )}
      <MuiTextField
        placeholder={placeholder}
        onChange={handleChange}
        {...props}
      />
    </Stack>
  );
}
