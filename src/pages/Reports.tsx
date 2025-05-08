import { Button, Col, Container, FloatingLabel, Form, Nav, Row, Tab } from "react-bootstrap";
import CustomHeader from "../components/CustomHeader";
import { useEffect, useState } from "react";
import CustomTable from "../components/Table";
import { getYearlyDriverReport, getYearlyTripReport, getYearlyVehicleReport } from "../hooks/axios";
import { useAuthHeader } from "react-auth-kit";
import { YearlyDriverTableProps, YearlyTripTableProps, YearlyVehicleTableProps } from "../utils/TypesIndex";

export default function Reports() {
  const [activeTab, setActiveTab] = useState("trip");
  const [year, setYear] = useState(new Date().toISOString().split("T")[0].split("-")[0]);
  const [tripTableData, setTripTableData] = useState<YearlyTripTableProps[]>([]);
  const [vehicleTableData, setVehicleTableData] = useState<YearlyVehicleTableProps[]>([]);
  const [driverTableData, setDriverTableData] = useState<YearlyDriverTableProps[]>([]);

  const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"] as const;

  const authHeader = useAuthHeader();
  const access_token = authHeader();

  useEffect(() => {
    (async () => {
      const yearlyDriverReport = await getYearlyDriverReport(year, access_token);
      const yearlyTripReport = await getYearlyTripReport(year, access_token);
      const yearlyVehicleReport = await getYearlyVehicleReport(year, access_token);

      setTripTableData(
        await Promise.all(
          months.map(async (month) => {
            const data = yearlyTripReport.data[0][month];

            if (!data) {
              return {
                id: `${year}-${month}-trip`,
                month: month.charAt(0).toUpperCase() + month.slice(1),
                noOfTrips: "0",
                approved: "0",
                approvedOutsourced: "0",
                rejected: "0",
                internalTrips: [],
                outsourcedTrips: [],
                rejectedTrips: [],
              };
            }

            const noOfTrips = data.internalTrips.length + data.outsourcedTrips.length;
            const approved = data.internalTrips.length;
            const approvedOutsourced = data.outsourcedTrips.length;
            const rejected = data.rejectedTrips.length;

            return {
              id: `${year}-${month}-trip`,
              month: month.charAt(0).toUpperCase() + month.slice(1),
              noOfTrips: noOfTrips.toString(),
              approved: approved.toString(),
              approvedOutsourced: approvedOutsourced.toString(),
              rejected: rejected.toString(),
              internalTrips: data.internalTrips,
              outsourcedTrips: data.outsourcedTrips,
              rejectedTrips: data.rejectedTrips,
            };
          })
        )
      );

      setVehicleTableData(
        await Promise.all(
          months.map(async (month) => {
            const data = yearlyVehicleReport.data[0][month];

            if (!data) {
              return {
                id: `${year}-${month}-vehicle`,
                month: month.charAt(0).toUpperCase() + month.slice(1),
                totalAssigned: 0,
                mostUsed: null,
                leastUsed: null,
                data: data.data,
              };
            }

            return {
              id: `${year}-${month}-vehicle`,
              month: month.charAt(0).toUpperCase() + month.slice(1),
              totalAssigned: data.totalAssignedTrips,
              mostUsed: data.mostUsedVehicle?.model ?? "-",
              leastUsed: data.leastUsedVehicle?.model ?? "-",
              data: data.data,
            };
          })
        )
      );

      setDriverTableData(
        await Promise.all(
          months.map(async (month) => {
            const data = yearlyDriverReport.data[0][month];

            if (!data) {
              return {
                id: `${year}-${month}-vehicle`,
                month: month.charAt(0).toUpperCase() + month.slice(1),
                totalAssigned: 0,
                highRating: null,
                mostActive: null,
                data: data.data,
              };
            }

            return {
              id: `${year}-${month}-vehicle`,
              month: month.charAt(0).toUpperCase() + month.slice(1),
              totalAssigned: data.totalAssignedTrips,
              highRating: data.highestRatedDriver ? `${data.highestRatedDriver.lastName}, ${data.highestRatedDriver.firstName}` : "-",
              mostActive: data.mostAssignedDriver ? `${data.mostAssignedDriver.lastName}, ${data.mostAssignedDriver.firstName}` : "-",
              data: data.data,
            };
          })
        )
      );

      // console.log(yearlyDriverReport);
      // console.log(yearlyTripReport);
      // console.log(yearlyVehicleReport);
    })();
  }, [year]);

  const tripCols = [
    { field: "month", headerName: "Month", flex: 1 },
    { field: "noOfTrips", headerName: "Total Trips", flex: 1 },
    { field: "approved", headerName: "Approved", flex: 1 },
    { field: "approvedOutsourced", headerName: "Approved (Outsourced)", flex: 1 },
    { field: "rejected", headerName: "Rejected", flex: 1 },
  ];
  const vehicleCols = [
    { field: "month", headerName: "Month", flex: 1 },
    { field: "totalAssigned", headerName: "Total Assign trips", flex: 1 },
    { field: "mostUsed", headerName: "Most Used Vehicle", flex: 1 },
    { field: "leastUsed", headerName: "Least Used", flex: 1 },
  ];
  const driverCols = [
    { field: "month", headerName: "Month", flex: 1 },
    { field: "totalAssigned", headerName: "Total Assigned Trips", flex: 1 },
    { field: "highRating", headerName: "Highest Rating Driver", flex: 1 },
    { field: "mostActive", headerName: "Most Active Driver", flex: 1 },
  ];

  const handleYearSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setYear(value);
  };
  return (
    <Container>
      <Row className="mt-5">
        <Col lg={6} className="d-flex justify-content-start text-start">
          <CustomHeader title={"Reports"} subtitle={"Everything about the trips"} />
        </Col>
        <Col lg={6} className="">
          <Row className="d-flex justify-content-end">
            <Col lg={4}>
              <FloatingLabel controlId="floatingSelect" label="Year" className="small-input mb-2">
                <Form.Select name="year" onChange={handleYearSelectChange} value={year}>
                  <option>2025</option>
                  <option>2026</option>
                  <option>2027</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Tab.Container activeKey={activeTab} onSelect={(k: any) => setActiveTab(k || "department")}>
          <Nav variant="pills" className="mb-3 justify-content-start">
            <Nav.Item>
              <Nav.Link eventKey="trip">Trip</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="vehicle">Vehicle</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="driver">Driver</Nav.Link>
            </Nav.Item>
            <Nav className="ms-auto ">
              <div className="d-flex align-items-center">
                <Button className="primary">
                  Export Data <i className="bi bi-box-arrow-right" />
                </Button>
              </div>
            </Nav>
          </Nav>

          <Tab.Content>
            <Tab.Pane eventKey="trip">
              <Row className="d-flex align-items-center mb-2">
                <Col lg={4} className="">
                  {/* <FloatingLabel controlId="floatingSelect" label="Filter" className="small-input">
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
                  </FloatingLabel> */}
                </Col>
                <Col lg={2} className="">
                  {/* <CreateUpdateDepartment passedData={{ name: "" }} access_token={access_token} /> */}
                </Col>
              </Row>
              <Row>{activeTab === "trip" && <CustomTable rows={tripTableData} columns={tripCols} type={"settings"} />}</Row>
            </Tab.Pane>
            <Tab.Pane eventKey="vehicle">
              <Row className="d-flex align-items-center mb-2">
                <Col lg={4} className="">
                  {/* <FloatingLabel controlId="floatingSelect" label="Filter" className="small-input">
                    <Form.Select name="vehicleFilter" aria-label="Floating label select example" value={vehicleFilter} onChange={handleSelectChange}>
                      <option value="all">All</option>
                      <option value="true">Deleted</option>
                      <option value="false">Not Deleted</option>
                    </Form.Select>
                  </FloatingLabel> */}
                </Col>
                <Col lg={2} className="">
                  {/* <CreateUpdateVehicle passedData={{ model: "", plateNumber: "", isDeleted: false }} access_token={access_token} /> */}
                </Col>
              </Row>
              <Row>{activeTab === "vehicle" && <CustomTable rows={vehicleTableData} columns={vehicleCols} type={"settings"} />}</Row>
            </Tab.Pane>
            <Tab.Pane eventKey="driver">
              <Row className="d-flex align-items-center mb-2">
                <Col lg={4} className="">
                  {/* <FloatingLabel controlId="floatingSelect" label="Filter" className="small-input">
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
                  </FloatingLabel> */}
                </Col>
                <Col lg={2} className="">
                  {/* <CreateUpdateChecklist passedData={{ title: "", typed: false }} access_token={access_token} /> */}
                </Col>
              </Row>
              <Row>{activeTab === "driver" && <CustomTable rows={driverTableData} columns={driverCols} type={"settings"} />}</Row>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Row>
    </Container>
  );
}
