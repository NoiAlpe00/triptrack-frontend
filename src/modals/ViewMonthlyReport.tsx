import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CustomTable from "../components/Table";

export default function ViewMontlyReport({ month, rows, cols }: { month: string; rows: any; cols: any }) {
  const [show, setShow] = useState(false);

  // const auth = useAuthUser();
  // const role = auth()?.role ?? "Staff";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" className="m-0 p-0" onClick={handleShow}>
        {month}
      </Button>

      <Modal show={show} onHide={handleClose} centered dialogClassName="custom-modal-90w">
        <Modal.Header closeButton>
          <Modal.Title>{month}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomTable rows={rows} columns={cols} type={"settings"} />
        </Modal.Body>
      </Modal>
    </>
  );
}
