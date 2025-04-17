import { Button, Card, Col, Container, Row, Image } from "react-bootstrap";
import Export from "../assets/svgs/export.svg";
import CustomTable from "../components/Table";
import CustomToast from "../components/Toast";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [showToast, setShowToast] = useState<boolean>(false);

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

  const rows = [
    {
      id: 1,
      title: "TRIP TO JERUSALEM",
      date: `${"2025-04-16T14:30:00.000"} - ${"2025-04-16T14:30:00.000"}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 2,
      title: "TRIP TO JERUSALEM",
      date: `${"2025-04-16T14:30:00.000"} - ${"2025-04-16T14:30:00.000"}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 3,
      title: "TRIP TO JERUSALEM",
      date: `${"2025-04-16T14:30:00.000"} - ${"2025-04-16T14:30:00.000"}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 4,
      title: "TRIP TO JERUSALEM",
      date: `${"2025-04-16T14:30:00.000"} - ${"2025-04-16T14:30:00.000"}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 5,
      title: "TRIP TO JERUSALEM",
      date: `${"2025-04-16T14:30:00.000"} - ${"2025-04-16T14:30:00.000"}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Pending",
      tripStatus: "Upcoming",
    },
    {
      id: 6,
      title: "TRIP TO JERUSALEM",
      date: `${"2025-04-16T14:30:00.000"} - ${"2025-04-16T14:30:00.000"}`,
      destination: "Jerusalem",
      driver: "Kuya Dan",
      vehicle: "Mitsubishi Mirage",
      requestStatus: "Approved",
      tripStatus: "Upcoming",
    },
  ];

  return (
    <Container>
      <Row className="pt-5">
        <Row className="pb-3">
          <Col className="align-items-start">
            <h2 className="text-primary thin-text text-start">Trips Overview</h2>
          </Col>
        </Row>
        <Col lg={{ span: 4, order: 1 }} md={{ span: 6, order: 2 }} xs={{ order: 2 }}>
          <Card className="p-0 m-2">
            <Card.Body>
              <Card.Title className="text-start text-secondary">Total Requests</Card.Title>
              <Card.Text className="text-end">
                <h1 className="text-primary">100</h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={{ order: 1 }} lg={{ span: 4, order: 2 }} xs={{ order: 1 }}>
          <Card className="p-0 m-2">
            <Card.Body>
              <Card.Title className="text-start text-secondary">Approved</Card.Title>
              <Card.Text className="text-end">
                <h1 className="text-primary thick-text">75</h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={{ span: 4, order: 3 }} md={{ span: 6, order: 3 }} xs={{ order: 3 }}>
          <Card className="p-0 m-2">
            <Card.Body>
              <Card.Title className="text-start text-secondary">Declined</Card.Title>
              <Card.Text className="text-end">
                <h1 className="text-secondary">25</h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="pb-5">
        <Col lg={{ span: 4, order: 1 }} md={{ span: 6, order: 2 }} xs={{ order: 2 }}>
          <Card className="p-0 m-2">
            <Card.Body>
              <Card.Text className="text-end">
                <Row>
                  <Col className="d-flex align-items-center" sm={6}>
                    <h4 className="text-secondary thin-text">Upcoming</h4>
                  </Col>
                  <Col sm={6}>
                    <h1 className="text-primary">30</h1>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={{ span: 4, order: 2 }} md={{ order: 1 }} xs={{ order: 1 }}>
          <Card className="p-0 m-2">
            <Card.Body>
              <Card.Text className="text-end">
                <Row>
                  <Col className="d-flex align-items-center" sm={6}>
                    <h4 className="text-secondary thin-text">Ongoing</h4>
                  </Col>
                  <Col sm={6}>
                    <h1 className="text-primary thick-text">20</h1>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={{ span: 4, order: 3 }} md={{ span: 6, order: 2 }} xs={{ order: 3 }}>
          <Card className="p-0 m-2">
            <Card.Body>
              <Card.Text className="text-end">
                <Row>
                  <Col className="d-flex align-items-center" sm={6}>
                    <h4 className="text-secondary thin-text">Past</h4>
                  </Col>
                  <Col sm={6}>
                    <h1 className="text-secondary">20</h1>
                  </Col>
                </Row>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mb-4">
        <Row>
          <Col md={6} className="">
            <h2 className="text-primary thin-text text-start">Trips Summary</h2>
          </Col>
          <Col md={6} className="d-flex justify-content-end pe-0">
            <Button>
              Export Results <Image src={Export} />
            </Button>
          </Col>
        </Row>
      </Row>
      <Row className="px-3">
        <CustomTable rows={rows} columns={columns} type={"dashboard"} />
      </Row>
      <CustomToast header={"Login"} body={"Login Unsuccessful"} time={"Just now"} show={showToast} setShow={setShowToast} variant={"success"} />;
    </Container>
  );
}
