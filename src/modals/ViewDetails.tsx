import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";

export default function ViewDetails({ title, data, cols }: { title: string; data: any; cols: any }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" className="thin-text text-start" size="sm" onClick={handleShow}>
        {title}
      </Button>

      <Modal show={show} onHide={handleClose} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="me-3">{title}</Modal.Title>{" "}
        </Modal.Header>
        <Modal.Body>
          {cols.map((col: any) => (
            <Row>
              <Col lg={3}>
                <span className="thick-text">{col.headerName}</span>
              </Col>
              <Col lg={9}>
                <span className="thin-text">{data[col.field]}</span>
              </Col>
            </Row>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}
