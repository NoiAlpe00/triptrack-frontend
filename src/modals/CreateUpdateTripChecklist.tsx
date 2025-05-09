import { useState } from "react";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import CustomHeader from "../components/CustomHeader";
import { CreateUpdateTripChecklistProps, TripChecklistProps } from "../utils/TypesIndex";
import CustomRadioButton from "../components/CustomRadioButton";
import { addNewTripChecklist } from "../hooks/axios";
import { formatISOString, requestGuard } from "../utils/utilities";

export default function CreateUpdateTripChecklist({ passedData, type, phase, access_token }: CreateUpdateTripChecklistProps) {
  const [show, setShow] = useState(false);

  // const auth = useAuthUser();
  // const role = auth()?.role ?? "Requisitioner";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState<TripChecklistProps>(passedData);

  console.log(passedData);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(type, phase);
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // console.log(name, value);
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
    const requestData: TripChecklistProps = {
      tripId: formData.tripId,
      ...(type === "operation" && phase === "departure"
        ? { timeDeparture: `${formData.timeDeparture}Z` }
        : { timeArrival: `${formData.timeArrival}Z` }),
      checklist: formData.checklist,
      timing: passedData.timing,
    };
    const isDataValid = requestGuard<TripChecklistProps>(requestData, []);
    const doubleCheck = confirm("This step is final and uneditable, are you sure the data is correct?");
    if (isDataValid && doubleCheck) {
      const res = await addNewTripChecklist(requestData, access_token);
      if (res.statusCode >= 200 && res.statusCode < 400) {
        alert(` ${phase === "departure" ? "Departure" : "Arrival"} Trip Checklist for trip ${requestData.tripId} was added successfully.`);
        setFormData({
          tripId: "",
          checklist: passedData.checklist,
          timing: "",
        });
        handleClose();
        window.location.reload();
      } else {
        alert(`Somthing went wrong - ${res.data}`);
      }
    } else {
      if (!doubleCheck) {
      } else alert("Fill out all the fields.");
    }
  };

  const handleUpdate = async () => {
    // const requestData: CreateUpdateUserRequestProps = {
    //   id: formData.id,
    //   email: formData.email,
    //   department: formData.department.id!!,
    //   type: formData.type,
    //   firstName: formData.firstName,
    //   lastName: formData.lastName,
    //   contactNumber: formData.contactNumber,
    //   isActive: formData.isActive,
    //   isDeleted: formData.isDeleted,
    //   password: formData.password,
    // };
    // const isDataValid = requestGuard<CreateUpdateUserRequestProps>(requestData, ["password"]);
    // if (isDataValid) {
    //   const res = await updateExistingUser(requestData, access_token);
    //   if (res.statusCode >= 200 && res.statusCode < 400) {
    //     alert(`User ${requestData.email} was updated successfully.`);
    //     setFormData({
    //       email: "",
    //       department: { id: "", name: "" },
    //       type: "",
    //       firstName: "",
    //       lastName: "",
    //       contactNumber: "",
    //       isActive: true,
    //       isDeleted: false,
    //       password: "",
    //     });
    //     window.location.reload();
    //     handleClose();
    //   } else {
    //     alert(`Somthing went wrong - ${res.data}`);
    //   }
    // } else {
    //   alert("Fill out all the fields.");
    // }
  };

  return (
    <>
      {type == "table" ? (
        phase == "departure" ? (
          formData.timeDeparture ? (
            formatISOString(passedData.timeDeparture!!)
          ) : (
            "-"
          )
        ) : phase == "arrival" ? (
          formData.timeArrival ? (
            formatISOString(passedData.timeArrival!!)
          ) : (
            "-"
          )
        ) : null
      ) : type == "operation" && phase == "departure" ? (
        <Button variant="primary w-100" size="sm" onClick={handleShow}>
          Departure Create Checklist
        </Button>
      ) : phase !== "done" ? (
        <Button variant="primary w-100" size="sm" onClick={handleShow}>
          Arrival Create Checklist
        </Button>
      ) : (
        "-"
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {type == "operation" && (phase == "departure" || phase == "arrival") ? "Create New Checklist" : "Update Checklist"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CustomHeader title={"Trip Checklist Information"} subtitle={"Tell us about the status of the vehicle."} />
          <FloatingLabel controlId="tripCode" label="Trip Code" className="mb-2 small-input">
            <Form.Control name="tripId" type="text" placeholder="" onChange={handleOnChange} value={formData.tripId ?? ""} disabled />
          </FloatingLabel>
          {phase == "departure" && type == "operation" ? (
            <FloatingLabel controlId="timeDeparture" label="Departure Time" className="mb-2 small-input">
              <Form.Control
                name="timeDeparture"
                type="datetime-local"
                placeholder=""
                onChange={handleOnChange}
                value={formData.timeDeparture ?? ""}
              />
            </FloatingLabel>
          ) : (
            <FloatingLabel controlId="timeArrival" label="Arrival Time" className="mb-2 small-input">
              <Form.Control name="timeArrival" type="datetime-local" placeholder="" onChange={handleOnChange} value={formData.timeArrival ?? ""} />
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
            }}
          >
            {formData.id ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
