import { useMemo } from "react";
import {
  CircularProgress,
  FormHelperText,
  MenuItem,
  Select as MuiSelect,
  Stack,
  styled,
  Typography,
  type SelectProps as MuiSelectProps,
} from "@mui/material";

interface OptionType {
  [key: string]: any;
}

interface Props<T extends OptionType>
  extends Omit<MuiSelectProps, "onChange" | "value"> {
  title?: string;
  helperText?: string;
  valueProp?: keyof T;
  labelProp?: keyof T;
  options?: T[];
  required?: boolean;
  loading?: boolean;
  placeholder?: string;
  emptyText?: string;
  value?: T[keyof T] | "";
  onSelectionChange?: (prev?: T, next?: T) => void;
  onChange?: MuiSelectProps["onChange"];
}

const StyledPlaceholder = styled("span")({
  opacity: 0.4,
});

export default function Select<T extends OptionType>({
  title,
  helperText,
  options = [],
  valueProp = "id" as keyof T,
  labelProp = "nombre" as keyof T,
  required,
  loading,
  placeholder = "Seleccionar...",
  value = "",
  emptyText = "No hay elementos",
  onChange,
  onSelectionChange,
  ...props
}: Props<T>) {
  const elemsById = useMemo(
    () => new Map(options.map((e) => [e[valueProp], e])),
    [options, valueProp]
  );

  const handleChange: MuiSelectProps["onChange"] = (event, _child) => {
    const newValue = event.target.value as T[keyof T]; // casteamos seguro
    const prevOption = value ? elemsById.get(value as T[keyof T]) : undefined;
    const nextOption = elemsById.get(newValue);

    onSelectionChange?.(prevOption, nextOption);
    onChange?.(event, _child);
  };

  return (
    <Stack width="100%" gap={0.5}>
      {title && (
        <Typography pl={1.5} variant="caption">
          {title}
          {required ? " *" : ""}
        </Typography>
      )}
      <MuiSelect
        {...props}
        value={value}
        onChange={handleChange}
        displayEmpty
        renderValue={(selected) => {
          if (loading) {
            return (
              <Stack
                direction="row"
                width="100%"
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress size={20} />
              </Stack>
            );
          }

          if (!selected) {
            return <StyledPlaceholder>{placeholder}</StyledPlaceholder>;
          }

          return elemsById.get(selected as T[keyof T])?.[labelProp];
        }}
      >
        {options.map((option) => (
          <MenuItem key={option[valueProp]} value={option[valueProp]}>
            {option[labelProp]}
          </MenuItem>
        ))}
        {options.length === 0 && (
          <MenuItem disabled>
            <StyledPlaceholder>{emptyText}</StyledPlaceholder>
          </MenuItem>
        )}
      </MuiSelect>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </Stack>
  );
}
