import { useEffect, useState } from "react";
import CustomToast from "../components/Toast";
import { Col, Container, FloatingLabel, Form, Row, Nav, Tab } from "react-bootstrap";
import CustomTable from "../components/Table";
import CreateUpdateUser from "../modals/CreateUpdateUser";
import CreateUpdateDepartment from "../modals/CreateUpdateDepartment";
import CreateUpdateChecklist from "../modals/CreateUpdateChecklist";
import CreateUpdateVehicle from "../modals/CreateUpdateVehicle";
import { useAuthHeader } from "react-auth-kit";
import { getAllChecklist, getAllDeparment, getAllUsers, getAllVehicle } from "../hooks/axios";
import { ChecklistProps, DepartmentProps, UserProps, UserTableProps, VehicleProps } from "../utils/TypesIndex";

export default function AdminPage() {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [allUserData, setAllUserData] = useState<UserProps[]>([]);
  const [userTableData, setUserTableData] = useState<UserTableProps[]>([]);
  const [allChecklistData, setAllChecklistData] = useState<ChecklistProps[]>([]);
  const [checklistTableData, setChecklistTableData] = useState<ChecklistProps[]>([]);
  const [allVehicleData, setAllVehicleData] = useState<VehicleProps[]>([]);
  const [vehicleTableData, setVehicleTableData] = useState<VehicleProps[]>([]);
  const [allDepartmentData, setAllDepartmentData] = useState<DepartmentProps[]>([]);
  const [departmentTableData, setDepartmentTableData] = useState<DepartmentProps[]>([]);

  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [vehicleFilter, setVehicleFilter] = useState<string>("all");
  const [checklistFilter, setChecklistFilter] = useState<string>("all");
  const [userRoleFilter, setUserRoleFilter] = useState<string>("all");
  const [userStatusFilter, setUserStatusFilter] = useState<string>("all");

  const authHeader = useAuthHeader();
  const access_token = authHeader();

  useEffect(() => {
    const toastShown = sessionStorage.getItem("loginToastShow");

    if (!toastShown) {
      setShowToast(true);
      sessionStorage.setItem("loginToastShow", "true");
    }
  }, []);

  useEffect(() => {
    if (departmentFilter == "all") {
      setDepartmentTableData(allDepartmentData);
    } else if (departmentFilter === "true") {
      setDepartmentTableData(allDepartmentData.filter((departmentFilter) => departmentFilter.isDeleted == true));
    } else {
      setDepartmentTableData(allDepartmentData.filter((departmentFilter) => departmentFilter.isDeleted == false));
    }
  }, [departmentFilter]);

  useEffect(() => {
    if (vehicleFilter == "all") {
      setVehicleTableData(allVehicleData);
    } else if (vehicleFilter === "true") {
      setVehicleTableData(allVehicleData.filter((vehicleData) => vehicleData.isDeleted == true));
    } else {
      setVehicleTableData(allVehicleData.filter((vehicleData) => vehicleData.isDeleted == false));
    }
  }, [vehicleFilter]);

  useEffect(() => {
    if (checklistFilter == "all") {
      setChecklistTableData(allChecklistData);
    } else if (checklistFilter === "true") {
      setChecklistTableData(allChecklistData.filter((checklistData) => checklistData.isDeleted == true));
    } else {
      setChecklistTableData(allChecklistData.filter((checklistData) => checklistData.isDeleted == false));
    }
  }, [checklistFilter]);

  useEffect(() => {
    if (userRoleFilter == "all" && userStatusFilter == "all") {
      const formattedTableData = allUserData.map((user: UserProps) => ({
        ...user,
        name: `${user.lastName}, ${user.firstName}`,
      }));
      setUserTableData(formattedTableData);
    } else {
      const formattedTableData = allUserData
        .filter((user) => {
          return (
            (userRoleFilter == "all" ? true : user.type === userRoleFilter) &&
            (userStatusFilter == "all" ? true : user.isActive == (userStatusFilter === "true"))
          );
        })
        .map((user: UserProps) => ({
          ...user,
          name: `${user.lastName}, ${user.firstName}`,
        }));
      setUserTableData(formattedTableData);
    }
  }, [userRoleFilter, userStatusFilter]);

  useEffect(() => {
    (async () => {
      const allUsers = await getAllUsers(access_token);
      setAllUserData(allUsers.data ?? []);
      const formattedTableData = allUsers.data?.map((user: UserProps) => ({
        ...user,
        name: `${user.lastName}, ${user.firstName}`,
      }));
      setUserTableData(formattedTableData ?? []);

      const allChecklist = await getAllChecklist(access_token);
      setAllChecklistData(allChecklist.data ?? []);
      const formattedChecklistTableData = allChecklist.data;
      setChecklistTableData(formattedChecklistTableData ?? []);

      const allVehicle = await getAllVehicle(access_token);
      setAllVehicleData(allVehicle.data ?? []);
      const formattedVehicleTableData = allVehicle.data;
      setVehicleTableData(formattedVehicleTableData ?? []);

      const allDeparment = await getAllDeparment(access_token);
      setAllDepartmentData(allDeparment.data ?? []);
      const formattedDepartmentTableData = allDeparment.data;
      setDepartmentTableData(formattedDepartmentTableData ?? []);
    })();
  }, []);

  const departmentCols = [
    {
      field: "view",
      headerName: "",
      width: 45,
      minWidth: 45,
      maxWidth: 45,
      sortable: false,
      renderCell: (params: any) => {
        const row = params.row;

        const passedData: DepartmentProps = {
          id: row.id,
          name: row.name,
          isDeleted: row.isDeleted,
        };

        return (
          <Row className="d-flex">
            <Col className="px-1">
              <CreateUpdateDepartment passedData={passedData} access_token={access_token} />
            </Col>
          </Row>
        );
      },
    },
    { field: "name", headerName: "Name", flex: 3 },
    { field: "isDeleted", headerName: "Deleted?", flex: 1 },
  ];
  const userCols = [
    {
      field: "view",
      headerName: "",
      width: 50,
      minWidth: 50,
      maxWidth: 50,
      sortable: false,
      renderCell: (params: any) => {
        const row = params.row;

        const passedData: UserProps = {
          id: row.id,
          email: row.email !== "NULL" ? row.email : "",
          department: row.department && row.department !== "NULL" ? { id: row.department.id, name: row.department.name } : { id: "", name: "" },
          type: row.type !== "NULL" ? row.type : "",
          firstName: row.firstName !== "NULL" ? row.firstName : "",
          lastName: row.lastName !== "NULL" ? row.lastName : "",
          contactNumber: row.contactNumber !== "NULL" ? row.contactNumber : "",
          isActive: row.isActive !== "NULL" ? row.isActive : true,
          isDeleted: row.isDeleted !== "NULL" ? row.isDeleted : false,
        };

        return (
          <Row className="d-flex">
            <Col className="px-1">
              <CreateUpdateUser
                passedData={passedData}
                departments={allDepartmentData}
                access_token={access_token}
                setUserTableData={setUserTableData}
              />
            </Col>
          </Row>
        );
      },

      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 2 },
    { field: "type", headerName: "Type", flex: 1 },
    {
      field: "contactNumber",
      headerName: "Contact No.",
      flex: 1,
      renderCell: (params: any) => {
        const row = params.row;

        return row.contactNumber !== "NULL" ? row.contactNumber : "";
      },
    },
    {
      field: "isActive",
      headerName: "Status",
      flex: 1,
      renderCell: (params: any) => {
        const row = params.row;

        return row.isActive ? "Active" : "Inactive";
      },
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
      renderCell: (params: any) => {
        const row = params.row;

        const passedData: VehicleProps = {
          id: row.id,
          model: row.model,
          plateNumber: row.plateNumber,
          seats: row.seats,
          isDeleted: row.isDeleted,
        };

        return (
          <Row className="d-flex">
            <Col className="px-1">
              <CreateUpdateVehicle passedData={passedData} access_token={access_token} />
            </Col>
          </Row>
        );
      },
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    { field: "model", headerName: "Model", flex: 2 },
    { field: "plateNumber", headerName: "Plate Number", flex: 1.5 },
    { field: "seats", headerName: "Seats", flex: 0.5 },
    { field: "isDeleted", headerName: "Deleted?", flex: 1 },
  ];
  const checklistCols = [
    {
      field: "view",
      headerName: "",
      width: 45,
      minWidth: 45,
      maxWidth: 45,
      sortable: false,
      renderCell: (params: any) => {
        const row = params.row;

        const passedData: ChecklistProps = {
          id: row.id,
          title: row.title,
          typed: row.typed,
          isDeleted: row.isDeleted,
        };

        return (
          <Row className="d-flex">
            <Col className="px-1">
              <CreateUpdateChecklist passedData={passedData} access_token={access_token} />
            </Col>
          </Row>
        );
      },
    },
    { field: "title", headerName: "Name", flex: 3 },
    { field: "typed", headerName: "Typed?", flex: 1 },
    { field: "isDeleted", headerName: "Deleted?", flex: 1 },
  ];

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "departmentFilter") {
      setDepartmentFilter(value);
    } else if (name === "vehicleFilter") {
      setVehicleFilter(value);
    } else if (name === "checklistFilter") {
      setChecklistFilter(value);
    } else if (name === "userRoleFilter") {
      setUserRoleFilter(value);
    } else if (name === "userStatusFilter") {
      setUserStatusFilter(value);
    }
  };

  const [activeTab, setActiveTab] = useState("department");

  return (
    <Container fluid>
      <Row className="pt-5 pb-3 px-1">
        <Col lg={6} className="mb-2 px-4">
          <Row className="d-flex align-items-center mb-2">
            <Col lg={6} className="">
              <h2 className="text-primary thin-text text-start">All Users</h2>
            </Col>
            <Col lg={2} className="">
              <FloatingLabel controlId="floatingSelect" label="Role" className="small-input">
                <Form.Select name="userRoleFilter" aria-label="Floating label select example" value={userRoleFilter} onChange={handleSelectChange}>
                  <option value="all">All</option>
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                  <option value="Guard">Guard</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
            <Col lg={2} className="">
              <FloatingLabel controlId="floatingSelect" label="Status" className="small-input">
                <Form.Select
                  name="userStatusFilter"
                  aria-label="Floating label select example"
                  value={userStatusFilter}
                  onChange={handleSelectChange}
                >
                  <option value="all">All</option>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </Form.Select>
              </FloatingLabel>
            </Col>

            <Col lg={2} className="">
              <CreateUpdateUser
                passedData={{
                  email: "",
                  department: { id: "", name: "" },
                  type: "staff",
                  firstName: "",
                  lastName: "",
                  contactNumber: "",
                  isActive: true,
                  isDeleted: false,
                }}
                departments={allDepartmentData}
                access_token={access_token}
                setUserTableData={setUserTableData}
              />
            </Col>
          </Row>
          <Row>
            <CustomTable rows={userTableData} columns={userCols} type="admin" />
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
                    <FloatingLabel controlId="floatingSelect" label="Filter" className="small-input">
                      <Form.Select
                        name="departmentFilter"
                        aria-label="Floating label select example"
                        value={departmentFilter}
                        onChange={handleSelectChange}
                      >
                        <option value="all">All</option>
                        <option value="true">Deleted</option>
                        <option value="false">Not Deleted</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col lg={2} className="">
                    <CreateUpdateDepartment passedData={{ name: "" }} access_token={access_token} />
                  </Col>
                </Row>
                <Row>{activeTab === "department" && <CustomTable rows={departmentTableData} columns={departmentCols} type="settings" />}</Row>
              </Tab.Pane>
              <Tab.Pane eventKey="vehicle">
                <Row className="d-flex align-items-center mb-2">
                  <Col lg={6} className="">
                    <h2 className="text-primary thin-text text-start">All Vehicle</h2>
                  </Col>
                  <Col lg={4} className="">
                    <FloatingLabel controlId="floatingSelect" label="Filter" className="small-input">
                      <Form.Select
                        name="vehicleFilter"
                        aria-label="Floating label select example"
                        value={vehicleFilter}
                        onChange={handleSelectChange}
                      >
                        <option value="all">All</option>
                        <option value="true">Deleted</option>
                        <option value="false">Not Deleted</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col lg={2} className="">
                    <CreateUpdateVehicle passedData={{ model: "", plateNumber: "", isDeleted: false }} access_token={access_token} />
                  </Col>
                </Row>
                <Row>{activeTab === "vehicle" && <CustomTable rows={vehicleTableData} columns={vehicleCols} type="settings" />}</Row>
              </Tab.Pane>
              <Tab.Pane eventKey="checklist">
                <Row className="d-flex align-items-center mb-2">
                  <Col lg={6} className="">
                    <h2 className="text-primary thin-text text-start">All Checklist</h2>
                  </Col>
                  <Col lg={4} className="">
                    <FloatingLabel controlId="floatingSelect" label="Filter" className="small-input">
                      <Form.Select
                        name="checklistFilter"
                        aria-label="Floating label select example"
                        value={checklistFilter}
                        onChange={handleSelectChange}
                      >
                        <option value="all">All</option>
                        <option value="true">Deleted</option>
                        <option value="false">Not Deleted</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Col lg={2} className="">
                    <CreateUpdateChecklist passedData={{ title: "", typed: false }} access_token={access_token} />
                  </Col>
                </Row>
                <Row>{activeTab === "checklist" && <CustomTable rows={checklistTableData} columns={checklistCols} type="settings" />}</Row>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
      <CustomToast header={"Login"} body={"Login Unsuccessful"} time={"Just now"} show={showToast} setShow={setShowToast} variant={"success"} />
    </Container>
  );
}
