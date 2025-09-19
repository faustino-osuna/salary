import { Stack, TextField, Button, Typography } from "@mui/material";

interface HeaderProps {
  title: string,
  search: string;
  setSearch: (value: string) => void;
  onCreate?: () => void;
}

export default function Header({ title, search, setSearch, onCreate }: HeaderProps) {
  return (
    <Stack direction="column" gap={2}>
      <Typography variant="h5">{title}</Typography>
      <Stack direction="row" width="100%" justifyContent="space-between">
      <TextField
        label="Buscar por nombre"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={onCreate} sx={{ width: "15%" }}>
        Crear
      </Button>
    </Stack>
    </Stack>
  );
}
