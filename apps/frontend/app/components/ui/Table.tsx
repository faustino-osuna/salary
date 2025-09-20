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
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Header from "./Header";

interface TableProps {
  title: string;
  columns: string[];
  queryKey: string[];
  queryFn: (search?: string) => Promise<any[]>;
  deleteFn?: (row: Record<string, any>) => Promise<void>;
  ModalComponent?: React.ComponentType<{
    open: boolean;
    onClose: () => void;
    data?: Record<string, any> | null;
    onSaved?: () => void;
    editMode?: boolean
  }>;
}

export default function SimpleTable({
  title,
  columns,
  queryKey,
  queryFn,
  deleteFn,
  ModalComponent,
}: TableProps) {
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Record<string, any> | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: [...queryKey, search],
    queryFn: () => queryFn(search),
    
  });

  const mutation = useMutation({
    mutationFn: deleteFn,
    onSuccess: () => {
      setSelectedRow(null)
      queryClient.invalidateQueries({ queryKey });
    },
  });

  const handleDelete = (row: Record<string, any>) => {
    if (!deleteFn) return;
    mutation.mutate(row);
    setSelectedRow(null);
  };

  const handleEdit = (row: Record<string, any>) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  const handleCreate = () => {
    setSelectedRow(null);
    setOpenModal(true);
  };

  return (
    <>
      <Header
        title={title}
        search={search}
        setSearch={setSearch}
        onCreate={handleCreate}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col}>{col}</TableCell>
              ))}
              <TableCell>Acciones</TableCell>
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
                        {value !== null && value !== undefined && typeof value === "object"
                          ? value.nombre
                          : String(value)}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(row)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(row)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {ModalComponent && (
        <ModalComponent
          open={openModal}
          onClose={() => setOpenModal(false)}
          data={selectedRow}
          onSaved={() => queryClient.invalidateQueries({ queryKey })}
          editMode={!selectedRow}
        />
      )}
    </>
  );
}
