import { useState } from "react";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import CustomHeader from "../components/CustomHeader";
import { CreatePreventiveMaintenanceProps, CreatePreventiveMaintenanceRequestProps } from "../utils/TypesIndex";
import { addNewPreventiveMaintenance } from "../hooks/axios";
import { requestGuard } from "../utils/utilities";

export default function PreventiveMaintenance(passedData: CreatePreventiveMaintenanceProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    date: "",
    details: "",
    remarks: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const formattedData: CreatePreventiveMaintenanceRequestProps = {
      date: formData.date,
      details: formData.details,
      remarks: formData.details,
      userId: passedData.userId,
      vehicleId: passedData.vehicleId,
      access_token: passedData.access_token,
    };
    const { access_token, ...rest } = formattedData;
    const isDataValid = requestGuard<CreatePreventiveMaintenanceRequestProps>(formattedData, []);
    const final = confirm("Are the details in this preventive maintenance report final and correct?");
    if (isDataValid && final) {
      const res = await addNewPreventiveMaintenance(rest, access_token);
      if (res.statusCode >= 200 && res.statusCode < 400) {
        alert(`Preventive Maintenance was added successfully.`);
        setFormData({
          date: "",
          details: "",
          remarks: "",
        });
        handleClose();
      } else {
        alert(`Somthing went wrong - ${res.message}`);
      }
    } else {
      if (!isDataValid) alert("Fill out all the fields.");
    }
  };

  return (
    <>
      <Button className="mt-1" variant="outline-primary" size="sm" onClick={handleShow}>
        <i className="bi bi-wrench"></i>
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{"Create Preventive Maintenance"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomHeader title={"Preventive Maintenance"} subtitle={"Tell us more about the vehicle details."} />
          <FloatingLabel controlId="date" label="Date" className="mb-2 small-input">
            <Form.Control name="date" type="date" placeholder="" onChange={handleOnChange} value={formData.date ?? ""} />
          </FloatingLabel>
          <FloatingLabel controlId="details" label="Details" className="mb-2 small-input">
            <Form.Control name="details" type="text" placeholder="" onChange={handleOnChange} value={formData.details ?? ""} />
          </FloatingLabel>
          <FloatingLabel controlId="remarks" label="Remarks" className="mb-2 small-input">
            <Form.Control name="remarks" type="text" placeholder="" onChange={handleOnChange} value={formData.remarks ?? ""} />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSave();
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
