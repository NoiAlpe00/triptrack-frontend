import { useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row, Image } from "react-bootstrap";
import { TripsProps } from "../utils/TypesIndex";
import Edit from "../assets/svgs/edit.svg";
import { useAuthUser } from "react-auth-kit";

export default function CreateUpdateTrip(passedData: TripsProps) {
  const [show, setShow] = useState(false);

  const auth = useAuthUser();
  const role = auth()?.role ?? "Staff";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState<TripsProps>(passedData);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRequestButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    setFormData((prevData) => ({
      ...prevData,
      [name]: !prevData[name as keyof typeof prevData],
    }));
  };

  const handleSave = async () => {
    console.log("Create");
    console.log(formData);
  };

  const handleUpdate = async () => {
    console.log("Update");
    console.log(formData);
  };

  return (
    <>
      {formData.id ? (
        <Button variant="primary" size="sm" onClick={handleShow}>
          <Image src={Edit} />
        </Button>
      ) : (
        <Button variant="primary" onClick={handleShow}>
          Add Trip +
        </Button>
      )}

      <Modal size={role.toLowerCase() === "admin" ? "xl" : undefined} show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ?? "Create New Trip"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={role.toLowerCase() === "admin" ? 4 : 12}>
              <FloatingLabel controlId="floatingInput" label="Title" className="mb-2 small-input">
                <Form.Control name="title" type="text" placeholder="" onChange={handleOnChange} value={formData.title ?? ""} />
              </FloatingLabel>
              <FloatingLabel controlId="floatingSelect" label="Department" className="small-input mb-2">
                <Form.Select name="department" onChange={handleSelectChange} value={formData.department ?? ""}>
                  <option>Open this select menu</option>
                  <option value="all">All</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput" label="Destination" className="mb-2 small-input">
                <Form.Control name="destination" type="text" placeholder="" onChange={handleOnChange} value={formData.destination ?? ""} />
              </FloatingLabel>
              <FloatingLabel controlId="floatingTextarea2" label="Purpose" className="small-input-textarea mb-2">
                <Form.Control
                  name="purpose"
                  type="text"
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                  value={formData.purpose ?? ""}
                  onChange={handleOnChange}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput" label="Date Start" className="small-input mb-2">
                <Form.Control name="dateStart" type="datetime-local" placeholder="" onChange={handleOnChange} value={formData.dateStart ?? ""} />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput" label="Date End" className="small-input mb-3">
                <Form.Control
                  name="dateEnd"
                  type="datetime-local"
                  placeholder=""
                  onChange={handleOnChange}
                  disabled={formData.dateStart.length === 0}
                  value={formData.dateEnd ?? ""}
                  min={formData.dateStart}
                />
              </FloatingLabel>
              <Row className="d-flex">
                <Col md={6} className="d-grid">
                  <Button variant={formData.driverRequest ? "primary" : "outline-primary"} name="driverRequest" onClick={handleRequestButtonClick}>
                    {formData.driverRequest ? "Request Driver" : "Own Driver"}
                  </Button>
                </Col>
                <Col md={6} className="d-grid">
                  <Button variant={formData.vehicleRequest ? "primary" : "outline-primary"} name="vehicleRequest" onClick={handleRequestButtonClick}>
                    {formData.vehicleRequest ? "Request Vechicle" : "Own Vechicle"}
                  </Button>
                </Col>
              </Row>
            </Col>
            {role.toLowerCase() === "admin" && (
              <Col md={8}>
                <FloatingLabel controlId="floatingSelect" label="Driver" className="small-input mb-2">
                  <Form.Select name="driver" onChange={handleSelectChange} value={formData.driver ?? ""}>
                    <option>Open this select menu</option>
                    <option value="all">All</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="floatingTextarea2" label="Driver Schedule" className="no-resize small-input-textarea mb-2">
                  <Form.Control
                    name="driverSchedule"
                    type="text"
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "160px", resize: "none" }}
                    disabled
                  />
                </FloatingLabel>
                <FloatingLabel controlId="floatingSelect" label="Vehicle" className="small-input mb-2">
                  <Form.Select name="vehicle" onChange={handleSelectChange} value={formData.vehicle ?? ""}>
                    <option>Open this select menu</option>
                    <option value="all">All</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel controlId="floatingTextarea2" label="Vehicle Schedule" className="no-resize small-input-textarea mb-2">
                  <Form.Control
                    name="vehicleSchedule"
                    type="text"
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "160px", resize: "none" }}
                    disabled
                  />
                </FloatingLabel>
              </Col>
            )}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              formData.id ? handleUpdate() : handleSave();
              handleClose();
            }}
          >
            {formData.id ? "Update Trip" : "Create Trip"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
