import { useState } from "react";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import CustomHeader from "../components/CustomHeader";
import { CreateTripFeedbackProps, CreateTripFeedbackRequestProps } from "../utils/TypesIndex";
import { addNewTripFeedback } from "../hooks/axios";
import { requestGuard } from "../utils/utilities";

export default function Feedback(passedData: CreateTripFeedbackProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    date: "",
    details: "",
    remarks: "",
    vehicleRating: "5",
    serviceRating: "5",
    driverRating: "5",
  });

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
      [name]: value == "true",
    }));
  };

  const handleSave = async () => {
    const formattedData: CreateTripFeedbackRequestProps = {
      remarks: formData.details,
      userId: passedData.userId,
      access_token: passedData.access_token,
      vehicleRating: parseInt(formData.vehicleRating),
      serviceRating: parseInt(formData.serviceRating),
      driverRating: parseInt(formData.driverRating),
      tripId: passedData.tripId,
    };
    const { access_token, ...rest } = formattedData;
    const isDataValid = requestGuard<CreateTripFeedbackRequestProps>(formattedData, ["remarks"]);
    const final = confirm("Are the details in this preventive maintenance report final and correct?");
    if (isDataValid && final) {
      const res = await addNewTripFeedback(rest, access_token);
      if (res.statusCode >= 200 && res.statusCode < 400) {
        alert(`Remarks added successfully.`);
        setFormData({
          date: "",
          details: "",
          remarks: "",
          vehicleRating: "",
          serviceRating: "",
          driverRating: "",
        });
        handleClose();
        window.location.reload();
      } else {
        alert(`Somthing went wrong - ${res.message}`);
      }
    } else {
      if (!isDataValid) alert("Fill out all the fields.");
    }
  };

  return (
    <>
      <Button className="w-100" variant="outline-primary" size="sm" onClick={handleShow}>
        <i className="bi bi-star-fill"></i> Feedback
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <CustomHeader title={"Trip Feedback"} subtitle={"We value your insight on how the trip went."} />
          {passedData.driverId.length > 0 && (
            <FloatingLabel controlId="driverRating" label="Driver Rating" className="small-input mb-2">
              <Form.Select name="driverRating" onChange={handleSelectChange} value={formData.driverRating ?? ""}>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </Form.Select>
            </FloatingLabel>
          )}
          {passedData.vehicleId.length > 0 && (
            <FloatingLabel controlId="vehicleRating" label="Vehicle Rating" className="small-input mb-2">
              <Form.Select name="vehicleRating" onChange={handleSelectChange} value={formData.vehicleRating ?? ""}>
                <option value="5">5</option>
                <option value="4">4</option>
                <option value="3">3</option>
                <option value="2">2</option>
                <option value="1">1</option>
              </Form.Select>
            </FloatingLabel>
          )}
          <FloatingLabel controlId="serviceRating" label="Service Rating" className="small-input mb-2">
            <Form.Select name="serviceRating" onChange={handleSelectChange} value={formData.serviceRating ?? ""}>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </Form.Select>
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
