import { useState } from "react";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import CustomHeader from "../components/CustomHeader";
import { TripChecklistProps } from "../utils/TypesIndex";
import CustomRadioButton from "../components/CustomRadioButton";

export default function CreateUpdateTripChecklist(passedData: TripChecklistProps) {
  const [show, setShow] = useState(false);

  // const auth = useAuthUser();
  // const role = auth()?.role ?? "Staff";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState<TripChecklistProps>(passedData);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      checklist: prevData.checklist.map((checklist) => (checklist.checklistId === name ? { ...checklist, data: value } : checklist)),
    }));
  };

  const handleSpecificChecklist = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      checklist: prevData.checklist.map((checklist) => (checklist.checklistId === name ? { ...checklist, data: value } : checklist)),
    }));
  };

  const handleSave = async () => {
    console.log("Create");
    console.log(formData);
  };

  const handleUpdate = async () => {
    console.log("Update");
    console.log({ formData });
  };

  console.log(formData);

  return (
    <>
      {formData.type.split(" ")[0] == "table" ? (
        formData.type.split(" ")[1] == "departure" ? (
          formData.departureTime ? (
            <Button variant="outline-primary w-100" size="sm" onClick={handleShow}>
              {formData.departureTime}
            </Button>
          ) : (
            "-"
          )
        ) : formData.type.split(" ")[1] == "arrival" ? (
          formData.arrivalTime ? (
            <Button variant="outline-primary w-100" size="sm" onClick={handleShow}>
              {formData.arrivalTime}
            </Button>
          ) : (
            "-"
          )
        ) : null
      ) : formData.type == "operation" && (!formData.departureTime || !formData.arrivalTime) ? (
        !formData.departureTime ? (
          <Button variant="primary w-100" size="sm" onClick={handleShow}>
            Departure Create Checklist
          </Button>
        ) : (
          <Button variant="primary w-100" size="sm" onClick={handleShow}>
            Arrival Create Checklist
          </Button>
        )
      ) : null}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {formData.type == "operation" && (!formData.departureTime || !formData.arrivalTime) ? "Create New Checklist" : "Update Checklist"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomHeader title={"Trip Checklist Information"} subtitle={"Tell us about the status of the vehicle."} />
          <FloatingLabel controlId="tripCode" label="Trip Code" className="mb-2 small-input">
            <Form.Control name="tripId" type="text" placeholder="" onChange={handleOnChange} value={formData.tripId ?? ""} disabled />
          </FloatingLabel>
          {!formData.departureTime ? (
            <FloatingLabel controlId="departureTime" label="Departure Time" className="mb-2 small-input">
              <Form.Control
                name="departureTime"
                type="datetime-local"
                placeholder=""
                onChange={handleOnChange}
                value={formData.departureTime ?? ""}
              />
            </FloatingLabel>
          ) : (
            <FloatingLabel controlId="arrivalTime" label="Arrival Time" className="mb-2 small-input">
              <Form.Control name="arrivalTime" type="datetime-local" placeholder="" onChange={handleOnChange} value={formData.arrivalTime ?? ""} />
            </FloatingLabel>
          )}
          {formData.checklist.map((checklist, index) =>
            checklist.typed ? (
              <FloatingLabel
                key={`${checklist.checklistId}-${index}`}
                controlId={checklist.title}
                label={checklist.title}
                className="mb-2 small-input"
              >
                <Form.Control
                  name={checklist.checklistId}
                  type="text"
                  placeholder=""
                  onChange={handleSpecificChecklist}
                  value={formData.checklist.find((data) => data.checklistId == checklist.checklistId)?.data ?? ""}
                />
              </FloatingLabel>
            ) : (
              <CustomRadioButton
                key={`${checklist.checklistId}-${index}`}
                name={checklist.checklistId}
                value={checklist.data}
                label={checklist.title}
                onChange={handleRadioChange}
              />
            )
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
