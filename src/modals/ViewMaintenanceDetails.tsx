import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CustomTable from "../components/Table";
import ViewDetails from "./ViewDetails";
import { formatISOStringDateOnly } from "../utils/utilities";

interface MaintenanceReportProps {
  date: string;
  details: string;
  remarks: string;
  user: string;
}

export default function ViewMaintenanceDetails({ vehicle, rows, cols }: { vehicle: string; rows: any; cols: any }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formattedCols = [
    {
      field: "date",
      headerName: "Date",
      width: 300,
      renderCell: (params: any) => {
        const row: MaintenanceReportProps = params.row;

        console.log(row);

        const passedData = {
          ...row,
          date: formatISOStringDateOnly(row.date.slice(0, -1)),
        };

        return <ViewDetails title={formatISOStringDateOnly(row.date)} data={passedData} cols={cols} />;
      },
    },
    ...cols.slice(1),
  ];

  return (
    <>
      <Button variant="primary" className="w-100" size="sm" onClick={handleShow}>
        <i className="bi bi-eye-fill" /> View Logs
      </Button>

      <Modal show={show} onHide={handleClose} centered size="xl">
        <Modal.Header closeButton>
          <Modal.Title className="me-3">{vehicle} Maintenance Logs</Modal.Title>{" "}
        </Modal.Header>
        <Modal.Body>
          <CustomTable rows={rows} columns={formattedCols} type={"settings"} />
        </Modal.Body>
      </Modal>
    </>
  );
}
