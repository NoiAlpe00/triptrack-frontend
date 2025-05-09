import { useState } from "react";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import CustomHeader from "../components/CustomHeader";
import { ChecklistProps, CreateUpdateChecklistProps } from "../utils/TypesIndex";
import { addNewChecklist, updateExistingChecklist } from "../hooks/axios";
import { requestGuard } from "../utils/utilities";

export default function CreateUpdateChecklist({ passedData, access_token }: CreateUpdateChecklistProps) {
  const [show, setShow] = useState(false);

  // const auth = useAuthUser();
  // const role = auth()?.role ?? "Requisitioner";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState<ChecklistProps>(passedData);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "true", // TODO: Add Name here
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
    const isDataValid = requestGuard<ChecklistProps>(formData, ["id", "isDeleted"]);
    if (isDataValid) {
      const res = await addNewChecklist(formData, access_token);
      if (res.statusCode >= 200 && res.statusCode < 400) {
        alert(`Checklist ${formData.title} was added successfully.`);
        setFormData({
          title: "",
          typed: false,
          isDeleted: false,
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

  const handleUpdate = async () => {
    const isDataValid = requestGuard<ChecklistProps>(formData, []);
    if (isDataValid) {
      const res = await updateExistingChecklist(formData, access_token);
      if (res.statusCode >= 200 && res.statusCode < 400) {
        alert(`Checklist ${formData.title} was updated successfully.`);
        setFormData({
          title: "",
          typed: false,
          isDeleted: false,
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
          <i className="bi bi-pencil-square" />
        </Button>
      ) : (
        <Button variant="primary w-100" onClick={handleShow}>
          Add +
        </Button>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Update Checklist" : "Create New Checklist"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomHeader title={"Checklist Infomation"} subtitle={"Tell us more about the items to be checked."} />
          <FloatingLabel controlId="title" label="Checklist Title" className="mb-2 small-input">
            <Form.Control name="title" type="text" placeholder="" onChange={handleOnChange} value={formData.title ?? ""} />
          </FloatingLabel>
          <FloatingLabel controlId="typed" label="Is the data needs to be typed?" className="small-input mb-4">
            <Form.Select name="typed" onChange={handleSelectChange} value={formData.typed?.toString() ?? ""}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Select>
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
