import { useState } from "react";
import { Button, Modal, FloatingLabel, Form, Image } from "react-bootstrap";
import CustomHeader from "../components/CustomHeader";
import { DepartmentProps } from "../utils/TypesIndex";
import Edit from "../assets/svgs/edit.svg";

export default function CreateUpdateDepartment(passedData: DepartmentProps) {
  console.log(passedData);
  const [show, setShow] = useState(false);

  // const auth = useAuthUser();
  // const role = auth()?.role ?? "Staff";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState<DepartmentProps>(passedData);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <Button variant="primary w-100" onClick={handleShow}>
          Add +
        </Button>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Update Department" : "Create New Department"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomHeader title={"Department Infomation"} subtitle={"We would like to know more about the department."} />
          <FloatingLabel controlId="name" label="Department Name" className="mb-2 small-input">
            <Form.Control name="name" type="text" placeholder="" onChange={handleOnChange} value={formData.name ?? ""} />
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
            {formData.id ? "Update Trip" : "Create Trip"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
