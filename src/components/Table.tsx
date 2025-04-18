import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useRef, useEffect } from "react";

export default function CustomTable({ rows, columns, type = "dashboard" }: { rows: any; columns: any; type: string }) {
  const gridRef = useRef<any>(null);
  const paginationModel = { page: 0, pageSize: 25 };

  // Resize after visible
  useEffect(() => {
    const timeout = setTimeout(() => {
      gridRef.current?.apiRef?.current?.resize();
    }, 200);
    return () => clearTimeout(timeout);
  }, [rows]); // or pass an external key if you prefer

  return (
    <Paper sx={{ height: type == "dashboard" ? 350 : type == "settings" ? 644 : 700, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 20, 50, 100]}
        rowHeight={38}
        sx={{ border: 0 }}
        rowSelection={false}
        ref={gridRef}
      />
    </Paper>
  )
}
