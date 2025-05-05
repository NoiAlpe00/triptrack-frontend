import { useState } from "react";
import { Button, Modal, FloatingLabel, Form } from "react-bootstrap";
import CustomHeader from "../components/CustomHeader";
import { changePassword } from "../hooks/axios";

export default function ChangePassword({ email, access_token }: { email: string; access_token: string }) {
  const [show, setShow] = useState(false);

  // const auth = useAuthUser();
  // const role = auth()?.role ?? "Staff";

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const isDataValid = formData.confirmNewPassword.length > 0 && formData.newPassword.length > 0 && formData.currentPassword.length > 0;
    const newPasswordMatching = formData.newPassword == formData.confirmNewPassword;
    if (isDataValid && newPasswordMatching) {
      const res = await changePassword(email, formData.currentPassword, formData.newPassword, formData.confirmNewPassword, access_token);
      if (res.statusCode >= 200 && res.statusCode < 400) {
        alert(`Password Updated Successfully.`);
        setFormData({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });

        // window.location.reload();
        handleClose();
      } else {
        alert(`Somthing went wrong - ${res.message}`);
      }
    } else {
      if (!isDataValid) alert("Fill out all the fields.");
      else if (!newPasswordMatching) alert("New passwords doesnt match");
    }
  };

  return (
    <>
      <Button size="sm" variant="outline-secondary" onClick={handleShow}>
        Change Password
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <CustomHeader title={"Change Password"} subtitle={"Change your current password."} />
          <FloatingLabel controlId="currentPassword" label="Current Password" className="mb-2 small-input">
            <Form.Control name="currentPassword" type="text" placeholder="" onChange={handleOnChange} value={formData.currentPassword ?? ""} />
          </FloatingLabel>
          <FloatingLabel controlId="newPassword" label="New Password" className="mb-2 small-input">
            <Form.Control name="newPassword" type="text" placeholder="" onChange={handleOnChange} value={formData.newPassword ?? ""} />
          </FloatingLabel>
          <FloatingLabel controlId="confirmNewPassword" label="Confirm New Password" className="mb-2 small-input">
            <Form.Control name="confirmNewPassword" type="text" placeholder="" onChange={handleOnChange} value={formData.confirmNewPassword ?? ""} />
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
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
