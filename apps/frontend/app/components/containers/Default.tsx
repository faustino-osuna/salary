import { Stack } from "@mui/material";
import type React from "react";

interface DefaultProps {
  children?: React.ReactNode;
  sx?: Record<string, string | number>;
}

export default function Default({ children, sx }: DefaultProps) {
  return (
    <Stack p={1.5} height="100%" gap={2} sx={sx}>
      {children}
    </Stack>
  );
}
