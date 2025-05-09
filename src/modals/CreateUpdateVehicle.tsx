import { useState } from "react";
import { Button, Modal, FloatingLabel, Form, Image } from "react-bootstrap";
import CustomHeader from "../components/CustomHeader";
import { CreateUpdateVehicleProps, VehicleProps } from "../utils/TypesIndex";
import Edit from "../assets/svgs/edit.svg";
import { addNewVehicle, updateExistingVehicle } from "../hooks/axios";
import { requestGuard } from "../utils/utilities";

export default function CreateUpdateVehicle({ passedData, access_token }: CreateUpdateVehicleProps) {
  const [show, setShow] = useState(false);

  // const auth = useAuthUser();
  // const role = auth()?.role ?? "Requisitioner";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState<VehicleProps>(passedData);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
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
    const isDataValid = requestGuard<VehicleProps>(formData, ["id", "seats", "isDeleted"]);
    if (isDataValid) {
      const res = await addNewVehicle(formData, access_token);
      if (res.statusCode >= 200 && res.statusCode < 400) {
        alert(`Vehicle ${formData.model} - ${formData.plateNumber} was added successfully.`);
        setFormData({
          model: "",
          plateNumber: "",
          seats: 0,
          isDeleted: false,
        });

        window.location.reload();
        handleClose();
      } else {
        setFormData(passedData);
        alert(`Somthing went wrong - ${res.data}`);
      }
    } else {
      alert("Fill out all the fields.");
    }
  };

  const handleUpdate = async () => {
    const isDataValid = requestGuard<VehicleProps>(formData, ["seats"]);
    if (isDataValid) {
      const res = await updateExistingVehicle(formData, access_token);
      if (res.statusCode >= 200 && res.statusCode < 400) {
        alert(`Vehicle ${formData.model} - ${formData.plateNumber} was updated successfully.`);
        setFormData({
          id: "",
          model: "",
          plateNumber: "",
          seats: 0,
          isDeleted: false,
        });
        window.location.reload();
        handleClose();
      } else {
        setFormData(passedData);
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
          Add +
        </Button>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Update Vehicle" : "Create New Vehicle"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomHeader title={"Vehicle Infomation"} subtitle={"Tell us more about the vehicle details."} />
          <FloatingLabel controlId="model" label="Model" className="mb-2 small-input">
            <Form.Control name="model" type="text" placeholder="" onChange={handleOnChange} value={formData.model ?? ""} />
          </FloatingLabel>
          <FloatingLabel controlId="plateNumber" label="Plate Number" className="mb-2 small-input">
            <Form.Control name="plateNumber" type="text" placeholder="" onChange={handleOnChange} value={formData.plateNumber ?? ""} />
          </FloatingLabel>
          <FloatingLabel controlId="seats" label="Seats" className="mb-2 small-input">
            <Form.Control name="seats" type="text" placeholder="" onChange={handleOnChange} value={formData.seats ?? ""} />
          </FloatingLabel>
          {formData.id && (
            <Button
              variant={!formData.isDeleted ? "danger" : "outline-primary"}
              className={`w-100 ${!formData.isDeleted ? "text-white" : ""}`}
              name="isDeleted"
              onClick={handleRequestButtonClick}
            >
              {!formData.isDeleted ? "Delete" : "Undo Delete"}
            </Button>
          )}
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
            {formData.id ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
