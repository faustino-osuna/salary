import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface TableProps {
  columns: string[];
  queryKey: string[];
  queryFn: (search?: string) => Promise<any[]>;
  deleteFn?: (row: Record<string, any>) => Promise<void>;
}

export default function SimpleTable({
  columns,
  queryKey,
  queryFn,
  deleteFn,
}: TableProps) {
  const [search, setSearch] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [...queryKey, search],
    queryFn: () => queryFn(search),
  });

  const mutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleDelete = (row: Record<string, any>) => {
    if (!deleteFn) return;
    mutation.mutate(row);
  };

  return (
    <div>
      <TextField
        label="Buscar por nombre"
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: 16 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col}>{col}</TableCell>
              ))}
              {deleteFn && <TableCell>Acciones</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1}>Cargando...</TableCell>
              </TableRow>
            ) : (
              data?.map((row, idx) => (
                <TableRow key={idx}>
                  {columns.map((col) => {
                    const value = row[col];
                    return (
                      <TableCell key={col}>
                        {value && typeof value === "object"
                          ? value.nombre
                          : value}
                      </TableCell>
                    );
                  })}
                  {deleteFn && (
                    <TableCell>
                      <IconButton
                        color="primary"
                        onClick={() => console.log("Editar", row)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(row)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
