import { useState } from "react";
// import { useAuthUser } from "react-auth-kit";
import { Button, Modal, Row, Col, FloatingLabel, Form, Image } from "react-bootstrap";
import { CreateUpdateUserProps, CreateUpdateUserRequestProps, UserProps } from "../utils/TypesIndex";
import Edit from "../assets/svgs/edit.svg";
import CustomHeader from "../components/CustomHeader";
import { requestGuard } from "../utils/utilities";
import { addNewUser, updateExistingUser } from "../hooks/axios";

export default function CreateUpdateUser({ passedData, departments, access_token }: CreateUpdateUserProps) {
  const [show, setShow] = useState(false);

  // const auth = useAuthUser();
  // const role = auth()?.role ?? "Staff";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState<UserProps>(passedData);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "department") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: { id: value, name: "" }, // TODO: Add name
      }));
    } else if (name === "type") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value, // TODO: Add name
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value == "true", // TODO: Add Name here
      }));
    }
  };

  const handleSave = async () => {
    const requestData: CreateUpdateUserRequestProps = {
      email: formData.email,
      department: formData.department.id!!,
      type: formData.type,
      firstName: formData.firstName,
      lastName: formData.lastName,
      contactNumber: formData.contactNumber,
      isActive: formData.isActive,
      isDeleted: formData.isDeleted,
      password: formData.password,
    };
    const isDataValid = requestGuard<CreateUpdateUserRequestProps>(requestData, []);
    if (isDataValid) {
      const res = await addNewUser(requestData, access_token);
      if (res.statusCode >= 200 && res.statusCode < 400) {
        alert(`User ${requestData.email} was added successfully.`);
        setFormData({
          email: "",
          department: { id: "", name: "" },
          type: "",
          firstName: "",
          lastName: "",
          contactNumber: "",
          isActive: true,
          isDeleted: false,
          password: "",
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
    const requestData: CreateUpdateUserRequestProps = {
      id: formData.id,
      email: formData.email,
      department: formData.department.id!!,
      type: formData.type,
      firstName: formData.firstName,
      lastName: formData.lastName,
      contactNumber: formData.contactNumber,
      isActive: formData.isActive,
      isDeleted: formData.isDeleted,
      password: formData.password,
    };
    console.log(requestData);
    const isDataValid = requestGuard<CreateUpdateUserRequestProps>(requestData, ["password"]);
    if (isDataValid) {
      const res = await updateExistingUser(requestData, access_token);
      if (res.statusCode >= 200 && res.statusCode < 400) {
        alert(`User ${requestData.email} was updated successfully.`);

        setFormData({
          email: "",
          department: { id: "", name: "" },
          type: "",
          firstName: "",
          lastName: "",
          contactNumber: "",
          isActive: true,
          isDeleted: false,
          password: "",
        });
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
        <Button variant="primary" size="sm" onClick={handleShow}>
          <Image src={Edit} />
        </Button>
      ) : (
        <Button variant="primary w-100" onClick={handleShow}>
          Add User +
        </Button>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? `Update User` : "Create New User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomHeader title={"User Infomation"} subtitle={"We would like to know who will use the system."} />
          <FloatingLabel controlId="firstName" label="First Name" className="mb-2 small-input">
            <Form.Control name="firstName" type="text" placeholder="" onChange={handleOnChange} value={formData.firstName ?? ""} />
          </FloatingLabel>
          <FloatingLabel controlId="lastName" label="Last Name" className="mb-2 small-input">
            <Form.Control name="lastName" type="text" placeholder="" onChange={handleOnChange} value={formData.lastName ?? ""} />
          </FloatingLabel>
          <FloatingLabel controlId="contactNumber" label="Contact Number" className="mb-2 small-input">
            <Form.Control name="contactNumber" type="text" placeholder="" onChange={handleOnChange} value={formData.contactNumber ?? ""} />
          </FloatingLabel>
          <FloatingLabel controlId="department" label="Department" className="small-input mb-4">
            <Form.Select name="department" onChange={handleSelectChange} value={formData.department.id ?? ""}>
              <option>Select Department</option>
              {departments.map((deparment, index) => (
                <option key={`${deparment}-${index}`} value={deparment.id}>
                  {deparment.name}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
          <CustomHeader title={"Account Details"} subtitle={"We would like to know the details of the account."} />

          <FloatingLabel controlId="email" label="Email" className="mb-2 small-input">
            <Form.Control name="email" type="text" placeholder="" onChange={handleOnChange} value={formData.email ?? ""} />
          </FloatingLabel>
          <FloatingLabel controlId="password" label="Password" className="mb-2 small-input">
            <Form.Control name="password" type="text" placeholder="" onChange={handleOnChange} value={formData.password ?? ""} />{" "}
            {/* TODO: Add password randomizer here*/}
          </FloatingLabel>
          <Row>
            <Col lg={6}>
              <FloatingLabel controlId="floatingSelect" label="User Type" className="small-input mb-4">
                <Form.Select name="type" onChange={handleSelectChange} value={formData.type ?? ""}>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                  <option value="Driver">Driver</option>
                  <option value="Guard">Driver</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col lg={6}>
              <FloatingLabel controlId="floatingSelect" label="Status" className="small-input mb-4">
                <Form.Select name="isActive" onChange={handleSelectChange} value={formData.isActive.toString() ?? "true"}>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>

          {/* <Row>
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
          </Row> */}
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
            {formData.id ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
