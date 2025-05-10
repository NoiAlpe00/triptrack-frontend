import { Toast, ToastContainer } from "react-bootstrap";
import { CustomToastProps } from "../utils/TypesIndex";

export default function CustomToast(toastProps: CustomToastProps) {
  return (
    <ToastContainer className="p-3" position="bottom-start">
      <Toast
        className={toastProps.show ? "toast-animate" : ""}
        bg={toastProps.variant.toLowerCase()}
        onClose={() => toastProps.setShow(false)}
        show={toastProps.show}
        delay={5000}
        autohide
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{toastProps.header}</strong>
          <small>{toastProps.time}</small>
        </Toast.Header>
        <Toast.Body className={toastProps.variant.toLowerCase() == "primary" ? "text-white" : ""}>{toastProps.body}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
