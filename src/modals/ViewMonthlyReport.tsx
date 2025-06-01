import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CustomTable from "../components/Table";
import ViewDetails from "./ViewDetails";

export default function ViewMontlyReport({ month, rows, cols, type }: { month: string; rows: any; cols: any; type: string }) {
  const [show, setShow] = useState(false);

  // const auth = useAuthUser();
  // const role = auth()?.role ?? "Requisitioner";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const handleExport = () => {
  //   if (!cols?.length || !rows?.length) return;

  //   // 1. Extract headers from cols
  //   const headers = cols.map((col: any) => col.headerName);

  //   // 2. Map rows to values in the same order as cols
  //   const dataRows = rows.map((row: any) => cols.map((col: any) => row[col.field]));

  //   // 3. Combine headers and rows into CSV format
  //   const csvContent = [headers, ...dataRows]
  //     .map((row) => row.map((cell: any) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
  //     .join("\n");

  //   // 4. Create and trigger download
  //   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  //   const link = document.createElement("a");
  //   const url = URL.createObjectURL(blob);
  //   link.href = url;
  //   link.setAttribute("download", `${type}_monthly_report_${month}.csv`);
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   URL.revokeObjectURL(url);
  // };

  const handleExport = () => {
    if (!cols?.length || !rows?.length) return;

    const headers = cols.map((col: any) => col.headerName);
    const dataRows = rows.map((row: any) => cols.map((col: any) => row[col.field]));

    const csvContent = [headers, ...dataRows]
      .map((row) => row.map((cell: any) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const filename = `${type}_monthly_report_${month}.csv`;

    if (typeof (window as any).AndroidBridge !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(",")[1];
        (window as any).AndroidBridge.saveBlobData(base64data, "text/csv", filename);
      };
      reader.readAsDataURL(blob);
    } else {
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const formattedCols = [
    {
      field: "view",
      headerName: type == "trips" ? "Title" : type == "vehicle" ? "Vehicle" : type == "driver" ? "Driver" : "",
      width: 300,
      renderCell: (params: any) => {
        const row = params.row;

        let title;

        if (type == "trips") title = row.title;
        else if (type == "vehicle") title = row.model;
        else if (type == "driver") title = row.driver;

        return <ViewDetails title={title} data={row} cols={cols} />;
      },
    },
    ,
    ...cols.slice(1),
  ];

  return (
    <>
      <Button variant="link" className="m-0 p-0" onClick={handleShow}>
        {month}
      </Button>

      <Modal show={show} onHide={handleClose} centered dialogClassName="custom-modal-90w">
        <Modal.Header closeButton>
          <Modal.Title className="me-3">
            {month} - {type.charAt(0).toUpperCase() + type.slice(1)} Report
          </Modal.Title>{" "}
          <Button
            onClick={() => {
              console.log("Been Here");
              handleExport();
            }}
          >
            Export Data <i className="bi bi-box-arrow-up" />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <CustomTable rows={rows} columns={formattedCols} type={"settings"} />
        </Modal.Body>
      </Modal>
    </>
  );
}
