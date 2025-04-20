import { useState } from "react";
import { Button, Modal, FloatingLabel, Form, Image } from "react-bootstrap";
import CustomHeader from "../components/CustomHeader";
import { ChecklistProps } from "../utils/TypesIndex";
import Edit from "../assets/svgs/edit.svg";

export default function CreateUpdateChecklist(passedData: ChecklistProps) {
  const [show, setShow] = useState(false);

  // const auth = useAuthUser();
  // const role = auth()?.role ?? "Staff";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState<ChecklistProps>(passedData);

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
          <CustomHeader title={"Checklist Infomation"} subtitle={"Tell us more about the items to be checked."} />
          <FloatingLabel controlId="title" label="Checklist Title" className="mb-2 small-input">
            <Form.Control name="title" type="text" placeholder="" onChange={handleOnChange} value={formData.title ?? ""} />
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
