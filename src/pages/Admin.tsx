import { useState } from "react";
import CustomToast from "../components/Toast";

export default function AdminPage() {
  const [showToast, setShowToast] = useState<boolean>(true);
  return (
    <div>
      ADMIN!!!!
      <CustomToast header={"Login"} body={"Login Unsuccessful"} time={"Just now."} show={showToast} setShow={setShowToast} variant={"success"} />;
    </div>
  );
}
