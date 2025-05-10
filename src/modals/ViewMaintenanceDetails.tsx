import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CustomTable from "../components/Table";

export default function ViewMaintenanceDetails({ vehicle, rows, cols }: { vehicle: string; rows: any; cols: any }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className="w-100" size="sm" onClick={handleShow}>
        <i className="bi bi-eye-fill" /> View Logs
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="me-3">{vehicle}</Modal.Title>{" "}
        </Modal.Header>
        <Modal.Body>
          <CustomTable rows={rows} columns={cols} type={"settings"} />
        </Modal.Body>
      </Modal>
    </>
  );
}
