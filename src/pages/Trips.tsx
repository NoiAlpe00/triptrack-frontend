import { useState, useEffect } from "react";
import { Container, Row, Col, FloatingLabel, Form, Button, Image } from "react-bootstrap";
import CustomTable from "../components/Table";
import CustomToast from "../components/Toast";
import CreateUpdateTrip from "../modals/CreateUpdateTrip";
import Check from "../assets/svgs/check.svg";
import Eye from "../assets/svgs/eye.svg";
import X from "../assets/svgs/x.svg";
import CheckPurple from "../assets/svgs/check-purple.svg";
import XRed from "../assets/svgs/x-red.svg";
import Pending from "../assets/svgs/pending.svg";
import Upcoming from "../assets/svgs/upcoming.svg";
import Ongoing from "../assets/svgs/ongoing.svg";
import Past from "../assets/svgs/past.svg";
import { formatISOString } from "../utils/utilities";
import { useAuthUser } from "react-auth-kit";

export default function Trips() {
  const [showToast, setShowToast] = useState<boolean>(false);
  const auth = useAuthUser();
  const userRole = auth()?.role ?? "";

  const columns = [
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
              <CreateUpdateTrip
                id={params.row.id}
                title={""}
                department={""}
                destination={""}
                purpose={""}
                dateStart={""}
                dateEnd={""}
                driverRequest={false}
                vehicleRequest={false}
              />
            </Col>
          </Row>
        </>
      ),
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    { field: "id", headerName: "Trip Code", flex: 0.5 },
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
    !(userRole.toLowerCase() == "guard")
      ? {
          field: "requestStatus",
          headerName: "Request Status",
          flex: 1,
          renderCell: (params: any) => (
            <>
              {params.row.requestStatus?.toLowerCase() == "approved" ? (
                <>
                  <Row className="d-flex">
                    <Col className="px-1">
                      <Image className="pe-1" src={CheckPurple} />
                      <span className="text-primary">
                        <strong>Approved</strong>
                      </span>
                    </Col>
                  </Row>
                </>
              ) : params.row.requestStatus?.toLowerCase() == "declined" ? (
                <>
                  <Row className="d-flex">
                    <Col className="px-1">
                      <Image className="pe-2" src={XRed} />
                      <span className="text-danger">
                        <strong>Declined</strong>
                      </span>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <Row className="d-flex">
                    <Col className="px-1">
                      <Image className="pe-2" src={Pending} />
                      <span className="text-primary">
                        <strong>Pending</strong>
                      </span>
                    </Col>
                  </Row>
                </>
              )}
            </>
          ),
          // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
        }
      : {
          field: "departureTime",
          headerName: "Departure Time",
          flex: 1,
          // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
        },
    ,
    !(userRole.toLowerCase() == "guard")
      ? {
          field: "tripStatus",
          headerName: "Trip Status",
          flex: 1,
          renderCell: (params: any) => (
            <>
              {params.row.tripStatus?.toLowerCase() == "upcoming" ? (
                <>
                  <Row className="d-flex">
                    <Col className="px-1">
                      <Image className="pe-2" src={Upcoming} />
                      <span className="text-primary">
                        <strong>Upcoming</strong>
                      </span>
                    </Col>
                  </Row>
                </>
              ) : params.row.tripStatus?.toLowerCase() == "ongoing" ? (
                <>
                  <Row className="d-flex">
                    <Col className="px-1">
                      <Image className="pe-2" src={Ongoing} />
                      <span className="text-primary">
                        <strong>Ongoing</strong>
                      </span>
                    </Col>
                  </Row>
                </>
              ) : (
                <>
                  <Row className="d-flex">
                    <Col className="px-1">
                      <Image className="pe-2" src={Past} />
                      <span className="text-secondary">
                        <strong>Past</strong>
                      </span>
                    </Col>
                  </Row>
                </>
              )}
            </>
          ),
        }
      : {
          field: "arrivalTime",
          headerName: "Arrival Time",
          flex: 1,
          // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
        },
    {
      field: "operations",
      headerName: "",
      flex: 1.5,
      renderCell: (params: any) => (
        <>
          {params.row.requestStatus?.toLowerCase() !== "approved" ? (
            <>
              <Row className="d-flex">
                <Col xs={6} className="px-1">
                  <Button size="sm" variant="success" className="w-100" onClick={() => console.log(params.row)}>
                    <Image className="pe-2" src={Check} /> Approve
                  </Button>
                </Col>
                <Col xs={6} className="px-1">
                  <Button size="sm" className="w-100 text-white" variant="danger" onClick={() => console.log(params.row)}>
                    <Image className="pe-3" src={X} /> Decline
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <Row className="d-flex">
                <Col className="px-1">
                  <Button size="sm" className="w-100" onClick={() => console.log(params.row)}>
                    <Image className="pe-2" src={Eye} /> View Details
                  </Button>
                </Col>
              </Row>
            </>
          )}
        </>
      ),
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
  ];

  const rows = [
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
      tripStatus: "Past",
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
      requestStatus: "Declined",
      tripStatus: "Ongoing",
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

  const finalCols =
    userRole.toLowerCase() === "guard"
      ? columns.slice(1)
      : userRole.toLowerCase() === "staff"
      ? columns.slice(0, -1)
      : userRole.toLowerCase() === "admin"
      ? columns
      : columns.slice(1, -1);

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
          {/* <CreateUpdateTrip
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
          /> */}
          {userRole.toLowerCase() === "guard" ? null : (
            <>
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
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <CustomTable rows={rows} columns={finalCols} type={"trips"} />
        </Col>
      </Row>
      <CustomToast header={"Login"} body={"Login Unsuccessful"} time={"Just now"} show={showToast} setShow={setShowToast} variant={"success"} />;
    </Container>
  );
}
