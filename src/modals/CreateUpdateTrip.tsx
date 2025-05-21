import { useState } from "react";
import { Button, Col, FloatingLabel, Form, Modal, Row } from "react-bootstrap";
import { CreateUpdateTripProps, CreateUpdateTripRequestProps, TripProps } from "../utils/TypesIndex";
import { useAuthUser } from "react-auth-kit";
import { decodeToken, formatISOString, isDateRangeOverlapping, requestGuard } from "../utils/utilities";
import { addNewTrip, updateExistingTrip } from "../hooks/axios";

export default function CreateUpdateTrip({ passedData, access_token, departments, vehicles, drivers }: CreateUpdateTripProps) {
  console.log(passedData);
  const [show, setShow] = useState(false);

  const auth = useAuthUser();
  const role = auth()?.role ?? "Requisitioner";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState<TripProps>(passedData);
  const now = new Date().toISOString().slice(0, -8);
  console.log(formData);

  const decodedToken = decodeToken(access_token);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "vehicle" || name === "driver" || name === "department") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: { id: value },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRequestButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;

    setFormData((prevData) => ({
      ...prevData,
      [name]: !prevData[name as keyof typeof prevData],
    }));
  };

  const handleSave = async () => {
    const requestData: CreateUpdateTripRequestProps = {
      departmentId: formData.department.id!!,
      driverRequest: formData.driverRequest,
      vehicleRequest: formData.vehicleRequest,
      userId: decodedToken.sub.userId,
      driverId: formData.driver?.id ?? null,
      vehicleId: formData.vehicle?.id ?? null,
      title: formData.title,
      tripStart: formData.tripStart,
      tripEnd: formData.tripEnd,
      destination: formData.destination,
      purpose: formData.purpose,
      status: "Pending",
    };
    const isDataValid = requestGuard<CreateUpdateTripRequestProps>(requestData, ["id", "authorizedBy", "driverId", "vehicleId"]);
    if (isDataValid) {
      const res = await addNewTrip(requestData, access_token);
      if (res.statusCode >= 200 && res.statusCode < 400) {
        alert(`Trip ${requestData.title} is added successfully.`);
        setFormData({
          id: "",
          title: "",
          tripStart: "", // ISO 8601 date-time string
          tripEnd: "", // ISO 8601 date-time string
          destination: "",
          purpose: "",
          status: "",
          timeDeparture: "", // ISO 8601 date-time string
          timeArrival: "", // ISO 8601 date-time strin
          remarks: "",
          createdDate: "", // ISO 8601 date-time string
          updatedDate: "", // ISO 8601 date-time string
          isDeleted: false,
          tripChecklists: [],
          department: { id: "", name: "" },
          driverRequest: true,
          vehicleRequest: true,
        });
        handleClose();
        window.location.reload();
      } else {
        alert(`Somthing went wrong - ${res.data}`);
      }
    } else {
      alert("Fill out all the fields.");
    }
  };

  const handleUpdate = async () => {
    const requestData: CreateUpdateTripRequestProps = {
      id: formData.id,
      departmentId: formData.department.id!!,
      driverRequest: formData.driverRequest,
      vehicleRequest: formData.vehicleRequest,
      userId: decodedToken.sub.userId,
      driverId: formData.driver?.id ?? null,
      vehicleId: formData.vehicle?.id ?? null,
      title: formData.title,
      tripStart: formData.tripStart,
      tripEnd: formData.tripEnd,
      destination: formData.destination,
      purpose: formData.purpose,
      status: (formData.status === "Approved" || formData.status === "Declined") && decodedToken.userType !== "Admin" ? "Pending" : formData.status,
    };
    const isDataValid = requestGuard<CreateUpdateTripRequestProps>(requestData, ["authorizedBy", "driverId", "vehicleId", "status"]);
    if (isDataValid) {
      const res = await updateExistingTrip(requestData, access_token);
      if (res.statusCode >= 200 && res.statusCode < 400) {
        alert(`Trip ${requestData.title} was updated successfully.`);

        setFormData(passedData);
        window.location.reload();
        handleClose();
      } else {
        alert(`Somthing went wrong - ${res.data}`);
      }
    } else {
      alert("Fill out all the fields.");
    }
  };

  return (
    <>
      {formData.id ? (
        <Button className="w-100" variant="primary" size="sm" onClick={handleShow}>
          <i className="bi bi-pencil-square" />
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
                <Form.Select name="department" onChange={handleSelectChange} value={formData.department.id ?? ""}>
                  <option>Select Department</option>
                  {departments.length > 0 && departments
                    ? departments.map((deparment, index) => (
                        <option key={`${deparment}-${index}`} value={deparment.id}>
                          {deparment.name}
                        </option>
                      ))
                    : null}
                </Form.Select>
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput" label="Destination" className="mb-2 small-input">
                <Form.Control name="destination" type="text" placeholder="" onChange={handleOnChange} value={formData.destination ?? ""} />
              </FloatingLabel>
              <FloatingLabel controlId="floatingTextarea2" label="Number of Passengers and Purpose" className="small-input-textarea mb-2">
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
                <Form.Control
                  name="tripStart"
                  type="datetime-local"
                  placeholder=""
                  onChange={handleOnChange}
                  min={now}
                  value={formData.tripStart ?? ""}
                />
              </FloatingLabel>
              <FloatingLabel controlId="floatingInput" label="Date End" className="small-input mb-3">
                <Form.Control
                  name="tripEnd"
                  type="datetime-local"
                  placeholder=""
                  onChange={handleOnChange}
                  disabled={formData.tripStart.length === 0}
                  value={formData.tripEnd ?? ""}
                  min={formData.tripStart}
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
                  <Form.Select name="driver" onChange={handleSelectChange} value={formData.driver?.id ?? ""}>
                    <option value={""}>Select Driver</option>
                    {drivers.map((driver, index) => (
                      <option key={`${driver}-${index}`} value={driver.id}>
                        {driver.lastName}, {driver.firstName}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
                {/* <FloatingLabel controlId="floatingTextarea2" label="Driver Schedule" className="no-resize small-input-textarea mb-2">
                  <Form.Control
                    name="driverSchedule"
                    type="text"
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "160px", resize: "none" }}
                    disabled
                  />
                </FloatingLabel> */}
                <Row className="schedule d-flex align-items-start p-2">
                  <div className="d-flex flex-column" style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {formData.driver &&
                      drivers
                        .filter((driver) => driver.id == formData.driver?.id)
                        .map((driver) =>
                          driver.drivenTrips.map((trips, index) => (
                            <span
                              key={`driver-drivenTrips-${index}-${trips.tripStart}-${trips.tripEnd}`}
                              className={`mb-1 small-text thin-text ${
                                isDateRangeOverlapping(trips.tripStart, trips.tripEnd, formData.tripStart, formData.tripEnd) ? "text-danger" : ""
                              }`}
                            >
                              {formatISOString(trips.tripStart)} - {formatISOString(trips.tripEnd)}
                            </span>
                          ))
                        )}
                  </div>
                </Row>

                <FloatingLabel controlId="floatingSelect" label="Vehicle" className="small-input mb-2">
                  <Form.Select name="vehicle" onChange={handleSelectChange} value={formData.vehicle?.id ?? ""}>
                    <option value={""}>Select Vehicle</option>
                    {vehicles.map((vehicle, index) => (
                      <option key={`${vehicle}-${index}`} value={vehicle.id}>
                        {vehicle.model} - {vehicle.plateNumber}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
                {/* <FloatingLabel controlId="floatingTextarea2" label="Vehicle Schedule" className="no-resize small-input-textarea mb-2">
                  <Form.Control
                    name="vehicleSchedule"
                    type="text"
                    as="textarea"
                    placeholder="Leave a comment here"
                    style={{ height: "160px", resize: "none" }}
                    disabled
                  />
                </FloatingLabel> */}
                <Row className="schedule d-flex align-items-start p-2">
                  <div className="d-flex flex-column" style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {formData.vehicle &&
                      vehicles
                        .filter((vehicle) => vehicle.id == formData.vehicle?.id)
                        .map((vehicle) =>
                          vehicle.trips!!.map((trips, index) => (
                            <span
                              key={`vehicle-drivenTrips-${index}-${trips.tripStart}-${trips.tripEnd}`}
                              className={`mb-1 small-text thin-text ${
                                isDateRangeOverlapping(trips.tripStart, trips.tripEnd, formData.tripStart + "Z", formData.tripEnd + "Z")
                                  ? "text-danger"
                                  : ""
                              }`}
                            >
                              {formatISOString(trips.tripStart)} - {formatISOString(trips.tripEnd)}
                            </span>
                          ))
                        )}
                  </div>
                </Row>
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
            }}
          >
            {formData.id ? "Update Trip" : "Create Trip"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
