import { Button, Card, Col, Container, Row, Image, FloatingLabel, Form } from "react-bootstrap";
import Export from "../assets/svgs/export.svg";
import CustomTable from "../components/Table";
import CustomToast from "../components/Toast";
import { useState, useEffect } from "react";
import { formatISOString } from "../utils/utilities";
import CustomDoughnutChart from "../components/CustomDoughnutChart";
import { DoughnutChartDataProps } from "../utils/TypesIndex";

export default function Dashboard() {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [tableData, setTableData] = useState<DoughnutChartDataProps[]>([
    {
      id: 1,
      title: "TRIP TO JERUSALEM",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 2,
      title: "TRIP TO JERUSALEM",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 3,
      title: "TRIP TO JERUSALEM",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 4,
      title: "TRIP TO JERUSALEM",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 5,
      title: "TRIP TO JERUSALEM",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 6,
      title: "TRIP TO JERUSALEM",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Approved",
      tripStatus: "Upcoming",
    },
  ]);

  useEffect(() => {
    const toastShown = sessionStorage.getItem("loginToastShow");

    if (!toastShown) {
      setShowToast(true);
      sessionStorage.setItem("loginToastShow", "true");
    }
  }, []);

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    { field: "date", headerName: "Date", flex: 2 },
    {
      field: "destination",
      headerName: "Destination",
      flex: 1,
    },
    {
      field: "driver",
      headerName: "Driver",
      flex: 1,
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "vehicle",
      headerName: "Vehicle",
      flex: 1,
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "requestStatus",
      headerName: "Request Status",
      flex: 1,
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    // {
    //   field: "tripStatus",
    //   headerName: "Trip Status",
    //   flex: 1,
    //   // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    // },
  ];

  const totalRequest: DoughnutChartDataProps[] = [
    {
      id: 1,
      title: "TRIP TO JERUSALEM",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 2,
      title: "TRIP TO JERUSALEM",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 3,
      title: "TRIP TO JERUSALEM",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Declined",
      tripStatus: "Upcoming",
    },
    {
      id: 4,
      title: "TRIP TO JERUSALEM",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Declined",
      tripStatus: "Upcoming",
    },
    {
      id: 5,
      title: "TRIP TO JERUSALEM",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 6,
      title: "TRIP TO JERUSALEM",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Approved",
      tripStatus: "Upcoming",
    },
  ];

  const approvedRequest: DoughnutChartDataProps[] = [
    {
      id: 1,
      title: "TRIP TO BETHLEHEM",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 2,
      title: "TRIP TO BETHLEHEM",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Declined",
      tripStatus: "Upcoming",
    },
    {
      id: 3,
      title: "TRIP TO BETHLEHEM",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
  ];

  const declinedRequest: DoughnutChartDataProps[] = [
    {
      id: 1,
      title: "TRIP TO CUBAO",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 2,
      title: "TRIP TO CUBAO",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Declined",
      tripStatus: "Upcoming",
    },
    {
      id: 3,
      title: "TRIP TO CUBAO",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
  ];

  const upcomingRequest: DoughnutChartDataProps[] = [
    {
      id: 1,
      title: "TRIP TO MAKATI",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 2,
      title: "TRIP TO MAKATI",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Approved",
      tripStatus: "Upcoming",
    },
    {
      id: 3,
      title: "TRIP TO MAKATI",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
  ];

  const ongoingRequest: DoughnutChartDataProps[] = [
    {
      id: 1,
      title: "TRIP TO CEBU",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Declined",
      tripStatus: "Upcoming",
    },
    {
      id: 2,
      title: "TRIP TO CEBU",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 3,
      title: "TRIP TO CEBU",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
  ];

  const pastRequest: DoughnutChartDataProps[] = [
    {
      id: 1,
      title: "TRIP TO BATANES",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 2,
      title: "TRIP TO BATANES",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Approved",
      tripStatus: "Upcoming",
    },
    {
      id: 3,
      title: "TRIP TO BATANES",
      date: `${formatISOString("2025-04-16T14:30:00.000")} - ${formatISOString("2025-04-16T14:30:00.000")}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
  ];

  const handleOnClick = (key: string) => {
    if (key == "total") setTableData(totalRequest);
    else if (key == "approved") setTableData(approvedRequest);
    else if (key == "declined") setTableData(declinedRequest);
    else if (key == "upcoming") setTableData(upcomingRequest);
    else if (key == "ongoing") setTableData(ongoingRequest);
    else if (key == "past") setTableData(pastRequest);
    else setTableData(totalRequest);
    // You can do something with `data`, like navigate or open a modal
  };

  return (
    <Container fluid>
      <Row className="pt-5 mb-4">
        <Row className="pb-3">
          <Col lg={8} className="align-items-start">
            <h2 className="text-primary thin-text text-start">Trips Overview</h2>
          </Col>
          <Col lg={4}>
            <Row className="pe-0">
              <Col lg={4}>
                <FloatingLabel controlId="floatingSelectYear" label="Year" className="small-input">
                  <Form.Select name="yearFilter">
                    <option>Open this select menu</option>
                    <option value="all">All</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="past">Past</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col lg={4}>
                <FloatingLabel controlId="floatingSelectYear" label="Month" className="small-input">
                  <Form.Select name="monthFilter">
                    <option value="01">January</option>
                    <option value="02">February</option>
                    <option value="03">March</option>
                    <option value="04">April</option>
                    <option value="05">May</option>
                    <option value="06">June</option>
                    <option value="07">July</option>
                    <option value="08">August</option>
                    <option value="09">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col lg={4}>
                <Button className="w-100 h-100">
                  Export Results <Image src={Export} />
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col lg={8} className="d-flex align-items-center ">
            <div className="w-100">
              <Row>
                <Col lg={{ span: 4, order: 1 }} md={{ span: 6, order: 2 }} xs={{ order: 2 }}>
                  <Card
                    className="card-hover-effect p-0 m-2"
                    onClick={() => {
                      handleOnClick("total");
                    }}
                  >
                    <Card.Body>
                      <Card.Title className="text-start text-secondary">Total Requests</Card.Title>
                      <Row className="">
                        <h1 className="text-primary text-end">100</h1>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={{ order: 1 }} lg={{ span: 4, order: 2 }} xs={{ order: 1 }}>
                  <Card
                    className="card-hover-effect p-0 m-2"
                    onClick={() => {
                      handleOnClick("approved");
                    }}
                  >
                    <Card.Body>
                      <Card.Title className="text-start text-secondary">Approved</Card.Title>
                      <Row>
                        <h1 className="text-primary thick-text text-end">75</h1>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={{ span: 4, order: 3 }} md={{ span: 6, order: 3 }} xs={{ order: 3 }}>
                  <Card
                    className="card-hover-effect p-0 m-2"
                    onClick={() => {
                      handleOnClick("declined");
                    }}
                  >
                    <Card.Body>
                      <Card.Title className="text-start text-secondary">Declined</Card.Title>
                      <Row>
                        <h1 className="text-secondary text-end">25</h1>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col lg={{ span: 4, order: 1 }} md={{ span: 6, order: 2 }} xs={{ order: 2 }}>
                  <Card
                    className="card-hover-effect p-0 m-2"
                    onClick={() => {
                      handleOnClick("upcoming");
                    }}
                  >
                    <Card.Body>
                      <Row>
                        <Col className="d-flex align-items-center" sm={6}>
                          <h4 className="text-secondary thin-text">Upcoming</h4>
                        </Col>
                        <Col sm={6}>
                          <h1 className="text-primary  text-end">30</h1>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={{ span: 4, order: 2 }} md={{ order: 1 }} xs={{ order: 1 }}>
                  <Card
                    className="card-hover-effect p-0 m-2"
                    onClick={() => {
                      handleOnClick("ongoing");
                    }}
                  >
                    <Card.Body>
                      <Row>
                        <Col className="d-flex align-items-center" sm={6}>
                          <h4 className="text-secondary thin-text">Ongoing</h4>
                        </Col>
                        <Col sm={6}>
                          <h1 className="text-primary thick-text  text-end">20</h1>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col lg={{ span: 4, order: 3 }} md={{ span: 6, order: 2 }} xs={{ order: 3 }}>
                  <Card
                    className="card-hover-effect p-0 m-2"
                    onClick={() => {
                      handleOnClick("past");
                    }}
                  >
                    <Card.Body>
                      <Row>
                        <Col className="d-flex align-items-center" sm={6}>
                          <h4 className="text-secondary thin-text ">Past</h4>
                        </Col>
                        <Col sm={6}>
                          <h1 className="text-secondary  text-end">20</h1>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
          <Col lg={4} className="d-flex justify-content-center align-items-center">
            <CustomDoughnutChart requests={tableData} />
          </Col>
        </Row>
      </Row>
      <Row className="mb-4">
        <Row>
          <Col md={12} className="">
            <h2 className="text-primary thin-text text-start">Trips Summary</h2>
          </Col>
        </Row>
      </Row>
      <Row className="px-3">
        <CustomTable rows={tableData} columns={columns} type={"dashboard"} />
      </Row>
      <CustomToast header={"Login"} body={"Login Unsuccessful"} time={"Just now"} show={showToast} setShow={setShowToast} variant={"success"} />;
    </Container>
  );
}
