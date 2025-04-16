import { useState, useEffect } from "react";
import { Container, Row, Col, FloatingLabel, Form } from "react-bootstrap";
import CustomTable from "../components/Table";
import CustomToast from "../components/Toast";
import CreateUpdateTrip from "../modals/CreateUpdateTrip";

export default function Trips() {
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    const toastShown = sessionStorage.getItem("loginToastShow");

    if (!toastShown) {
      setShowToast(true);
      sessionStorage.setItem("loginToastShow", "true");
    }
  }, []);
  return (
    <Container fluid>
      <Row className="pt-5 pb-3 px-1">
        <Col md={6} className="mb-2">
          <Row className="d-flex align-items-center">
            <Col md={2} className="">
              <h2 className="text-primary thin-text text-start">All Trips</h2>
            </Col>
            <Col md={4} className="">
              <FloatingLabel controlId="floatingSelect" label="Status" className="small-input">
                <Form.Select name="statusFilter" aria-label="Floating label select example">
                  <option>Open this select menu</option>
                  <option value="all">All</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="past">Past</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
        </Col>
        <Col md={6} className="d-flex justify-content-end mb-2">
          <CreateUpdateTrip
            id="asdasdasd"
            title={"Eme"}
            department={"ongoing"}
            destination={"Eme"}
            dateStart={"2025-04-16T14:30:00.000"}
            dateEnd={"2025-04-16T14:30:00.000"}
            driverRequest={true}
            vehicleRequest={false}
            purpose={"dsadsadsadsadsa"}
            driver={"ongoing"}
            vehicle={"past"}
          />
          <CreateUpdateTrip
            title={""}
            department={""}
            destination={""}
            dateStart={""}
            dateEnd={""}
            driverRequest={false}
            vehicleRequest={false}
            purpose={""}
          />
        </Col>
      </Row>
      <Row>
        <CustomTable />
      </Row>
      <CustomToast header={"Login"} body={"Login Unsuccessful"} time={"Just now"} show={showToast} setShow={setShowToast} variant={"success"} />;
    </Container>
  );
}
