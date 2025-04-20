import { useEffect, useState } from "react";
import CustomToast from "../components/Toast";
import { Col, Container, FloatingLabel, Form, Row, Nav, Tab } from "react-bootstrap";
import CustomTable from "../components/Table";
import CreateUpdateUser from "../modals/CreateUpdateUser";
import CreateUpdateDepartment from "../modals/CreateUpdateDepartment";
import CreateUpdateChecklist from "../modals/CreateUpdateChecklist";
import CreateUpdateVehicle from "../modals/CreateUpdateVehicle";

export default function AdminPage() {
  const [showToast, setShowToast] = useState<boolean>(false);

  useEffect(() => {
    const toastShown = sessionStorage.getItem("loginToastShow");

    if (!toastShown) {
      setShowToast(true);
      sessionStorage.setItem("loginToastShow", "true");
    }
  }, []);

  const departmentCols = [
    {
      field: "view",
      headerName: "",
      width: 45,
      minWidth: 45,
      maxWidth: 45,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Row className="d-flex">
            <Col className="px-1">
              <CreateUpdateDepartment id={params.row.id} name={""} isDeleted={true} />
            </Col>
          </Row>
        </>
      ),
    },
    { field: "name", headerName: "Name", flex: 3 },
    { field: "isDeleted", headerName: "Deleted?", flex: 1 },
  ];
  const departmentRows = [
    { id: 1, name: "Department 1", isDeleted: false },
    { id: 2, name: "Department 2", isDeleted: true },
    { id: 3, name: "Department 3", isDeleted: false },
  ];
  const userCols = [
    {
      field: "view",
      headerName: "",
      width: 50,
      minWidth: 50,
      maxWidth: 50,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Row className="d-flex">
            <Col className="px-1">
              <CreateUpdateUser
                id={params.row.id}
                email={""}
                department={{ id: "", name: "string" }}
                type={""}
                firstName={""}
                lastName={""}
                contactNumber={""}
                isActive={true}
                isDeleted={false}
              />
            </Col>
          </Row>
        </>
      ),
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "userType", headerName: "Type", flex: 1 },
    { field: "contactNumber", headerName: "Contact No.", flex: 1 },
    { field: "isActive", headerName: "Status", flex: 1 },
  ];
  const userRows = [
    {
      id: 1,
      name: "Emedu 1",
      email: "email@emec.com",
      userType: "staff",
      contactNumber: "123456",
      isActive: true,
    },
    {
      id: 2,
      name: "Emedu 2",
      email: "email2@emec.com",
      userType: "staff",
      contactNumber: "123456",
      isActive: false,
    },
    {
      id: 3,
      name: "Emedu 3",
      email: "email3@emec.com",
      userType: "staff",
      contactNumber: "123456",
      isActive: true,
    },
  ];

  const vehicleCols = [
    {
      field: "view",
      headerName: "",
      width: 45,
      minWidth: 45,
      maxWidth: 45,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Row className="d-flex">
            <Col className="px-1">
              <CreateUpdateVehicle id={params.row.id} isDeleted={false} model={""} plateNumber={""} />
            </Col>
          </Row>
        </>
      ),
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    { field: "model", headerName: "Model", flex: 2 },
    { field: "plate", headerName: "Plate", flex: 1.5 },
    { field: "seats", headerName: "Seats", flex: 0.5 },
    { field: "isDeleted", headerName: "Deleted?", flex: 1 },
  ];
  const vehicleRows = [
    { id: 1, model: "BMW EMEDU", plate: "B31267", seats: 6, isDeleted: false },
    { id: 2, model: "BMW EMEDI", plate: "B31268", seats: 6, isDeleted: false },
    { id: 3, model: "BMW EMEDE", plate: "B31269", seats: 6, isDeleted: false },
  ];
  const checklistCols = [
    {
      field: "view",
      headerName: "",
      width: 45,
      minWidth: 45,
      maxWidth: 45,
      sortable: false,
      renderCell: (params: any) => (
        <>
          <Row className="d-flex">
            <Col className="px-1">
              <CreateUpdateChecklist id={params.row.id} title={""} isDeleted={true} />
            </Col>
          </Row>
        </>
      ),
    },
    { field: "title", headerName: "Name", flex: 3 },
    { field: "isDeleted", headerName: "Deleted?", flex: 1 },
  ];
  const checklistRows = [
    { id: 1, title: "Gas", isDeleted: false },
    { id: 2, title: "Tires", isDeleted: true },
    { id: 3, title: "Aircon", isDeleted: false },
  ];

  const [activeTab, setActiveTab] = useState("department");

  return (
    <Container fluid>
      <Row className="pt-5 pb-3 px-1">
        <Col lg={6} className="mb-2 px-4">
          <Row className="d-flex align-items-center mb-2">
            <Col lg={6} className="">
              <h2 className="text-primary thin-text text-start">All Users</h2>
            </Col>
            <Col lg={4} className="">
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
            <Col lg={2} className="">
              <CreateUpdateUser
                email={""}
                department={{ id: "", name: "" }}
                type={"staff"}
                firstName={""}
                lastName={""}
                contactNumber={""}
                isActive={true}
                isDeleted={false}
              />
            </Col>
          </Row>
          <Row>
            <CustomTable rows={userRows} columns={userCols} type="admin" />
          </Row>
        </Col>
        <Col lg={6} className="px-4">
          <Tab.Container activeKey={activeTab} onSelect={(k: any) => setActiveTab(k || "department")}>
            <Nav variant="pills" className="mb-3 justify-content-start">
              <Nav.Item>
                <Nav.Link eventKey="department">Department</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="vehicle">Vehicle</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="checklist">Checklist</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="department">
                <Row className="d-flex align-items-center mb-2">
                  <Col lg={6} className="">
                    <h2 className="text-primary thin-text text-start">All Department</h2>
                  </Col>
                  <Col lg={4} className="">
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
                  <Col lg={2} className="">
                    <CreateUpdateDepartment name={""} />
                  </Col>
                </Row>
                <Row>
                  {activeTab === "department" && (
                    <CustomTable rows={departmentRows} columns={departmentCols} type="settings"  />
                  )}
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="vehicle">
                <Row className="d-flex align-items-center mb-2">
                  <Col lg={6} className="">
                    <h2 className="text-primary thin-text text-start">All Vehicle</h2>
                  </Col>
                  <Col lg={4} className="">
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
                  <Col lg={2} className="">
                    <CreateUpdateVehicle model={""} plateNumber={""} isDeleted={false} />
                  </Col>
                </Row>
                <Row>
                  {activeTab === "vehicle" && <CustomTable rows={vehicleRows} columns={vehicleCols} type="settings"  />}
                </Row>
              </Tab.Pane>
              <Tab.Pane eventKey="checklist">
                <Row className="d-flex align-items-center mb-2">
                  <Col lg={6} className="">
                    <h2 className="text-primary thin-text text-start">All Checklist</h2>
                  </Col>
                  <Col lg={4} className="">
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
                  <Col lg={2} className="">
                    <CreateUpdateChecklist title={""} />
                  </Col>
                </Row>
                <Row>
                  {activeTab === "checklist" && <CustomTable rows={checklistRows} columns={checklistCols} type="settings" />}
                </Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
      <CustomToast header={"Login"} body={"Login Unsuccessful"} time={"Just now"} show={showToast} setShow={setShowToast} variant={"success"} />
    </Container>
  );
}
