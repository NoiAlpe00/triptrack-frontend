import { useEffect, useState } from "react";
import CustomToast from "../components/Toast";

export default function AdminPage() {
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    const toastShown = sessionStorage.getItem("loginToastShow");

    if (!toastShown) {
      setShowToast(true);
      sessionStorage.setItem("loginToastShow", "true");
    }
  }, []);

  return (
    <div>
      ADMIN!!!!
      <CustomToast header={"Login"} body={"Login Unsuccessful"} time={"Just now"} show={showToast} setShow={setShowToast} variant={"success"} />;
    </div>
  );
}
