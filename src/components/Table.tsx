import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function CustomTable({ rows, columns, type = "dashboard"}: { rows: any; columns: any; type: string}) {
  const paginationModel = { page: 0, pageSize: 30 };
  return (
    <Paper sx={{ height: type == "dashboard" ? 350 : 700, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        rowHeight={38}
        sx={{ border: 0 }}
        rowSelection={false}
      />
    </Paper>
  );
}
