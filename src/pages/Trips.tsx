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
import { capitalize, decodeToken, formatISOString } from "../utils/utilities";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import CreateUpdateTripChecklist from "../modals/CreateUpdateTripChecklist";
import {
  DepartmentProps,
  DriverProps,
  TripProps,
  TripSpecificChecklistProps,
  TripsTableProps,
  TripTableProps,
  UserProps,
  VehicleProps,
} from "../utils/TypesIndex";
import { approveExistingTrip, declineExistingTrip, getAllDeparment, getAllDrivers, getAllTrips, getAllVehicle } from "../hooks/axios";

export default function Trips() {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [allTripData, setAllTripData] = useState<TripProps[]>([]);
  const [tableData, setTableData] = useState<TripTableProps[]>([]);
  const [allDepartmentData, setAllDepartmentData] = useState<DepartmentProps[]>([]);
  const [allDriverData, setAllDriverData] = useState<DriverProps[]>([]);
  const [allVehicleData, setAllVehicleData] = useState<VehicleProps[]>([]);

  const auth = useAuthUser();
  const userRole = auth()?.role ?? "Staff";

  const authHeader = useAuthHeader();
  const access_token = authHeader();

  const decodedToken = decodeToken(access_token);

  useEffect(() => {
    (async () => {})();
  }, []);

  const checklistSimulation: TripSpecificChecklistProps[] = [
    {
      checklistId: "Eme1",
      title: "Eme1 Title",
      data: "passed",
      typed: false,
    },
    {
      checklistId: "Eme2",
      title: "Eme2 Title",
      data: "passed",
      typed: false,
    },
    {
      checklistId: "Eme3",
      title: "Eme3 Title",
      data: "",
      typed: true,
    },
    {
      checklistId: "Eme4",
      title: "Eme4 Title",
      data: "",
      typed: true,
    },
  ];

  {
    /*
      {
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
    */
  }

  {
    /*
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
    */
  }

  const columns = [
    {
      field: "view",
      headerName: "",
      width: 50,
      minWidth: 50,
      maxWidth: 50,
      sortable: false,
      renderCell: (params: any) => {
        const row = params.row;

        const passedData: TripTableProps = {
          id: row.id,
          title: row.title,
          tripStart: row.tripStart.slice(0, -1),
          tripEnd: row.tripEnd.slice(0, -1),
          destination: row.destination,
          purpose: row.purpose,
          status: row.status,
          timeDeparture: row.timeDeparture,
          timeArrival: row.timeArrival,
          remarks: row.remarks,
          createdDate: row.createdDate,
          updatedDate: row.updatedDate,
          isDeleted: row.isDeleted,
          tripChecklists: [], // To Be Implemented yet
          department: { id: row.department.id, name: "" },
          driver: {
            id: row.driver?.id ?? "",
            firstName: row.driver?.firstName ?? "",
            lastName: row.driver?.lastName ?? "",
            email: row.driver?.email ?? "",
            department: { id: row.driver?.department.id ?? "", name: row.driver?.department.name ?? "" },
            type: row.driver?.type ?? "",
            contactNumber: row.driver?.contactNumber ?? "",
            isActive: row.driver?.isActive ?? false,
            isDeleted: row.driver?.isDeleted ?? false,
          },
          vehicle: {
            id: row.vehicle?.id ?? "",
            model: row.vehicle?.model ?? "",
            plateNumber: row.vehicle?.plateNumber ?? "",
            seats: row.vehicle?.seats ?? 0,
            isDeleted: false,
          },
          driverRequest: false,
          vehicleRequest: false,
          requestStatus: capitalize(row.status) as "Pending" | "Approved" | "Declined",
          tripStatus: row.timeDeparture && row.timeArrival ? "Past" : row.timeDeparture ? "Ongoing" : "Upcoming",
          date: `${formatISOString(row.tripStart)} - ${formatISOString(row.tripEnd)}`,
        };

        return (
          <Row className="d-flex">
            <Col className="px-1">
              <CreateUpdateTrip
                passedData={passedData}
                access_token={access_token}
                departments={allDepartmentData}
                vehicles={allVehicleData}
                drivers={allDriverData}
              />
            </Col>
          </Row>
        );
      },
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
      renderCell: (params: any) => {
        const row = params.row;

        return <span>{row.driver !== null ? `${row.driver.lastName}, ${row.driver.firstName}` : "Self Drive"}</span>;
      },
    },
    {
      field: "vehicle",
      headerName: "Vehicle",
      flex: 1,
      renderCell: (params: any) => {
        const row = params.row;

        return <span>{row.vehicle !== null ? `${row.vehicle.model} - ${row.vehicle.plateNumber}` : "Own Vehicle"}</span>;
      },
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
          renderCell: (params: any) => (
            <>
              <CreateUpdateTripChecklist
                tripId={params.row.id}
                departureTime={params.row.departureTime}
                arrivalTime={params.row.arrivalTime}
                checklist={checklistSimulation}
                type={"table departure"}
              />
            </>
          ),
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
          renderCell: (params: any) => (
            <>
              <CreateUpdateTripChecklist
                tripId={params.row.id}
                departureTime={params.row.departureTime}
                arrivalTime={params.row.arrivalTime}
                checklist={checklistSimulation}
                type={"table arrival"}
              />
            </>
          ),
          // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
        },
    !(userRole.toLowerCase() == "guard")
      ? {
          field: "operations",
          headerName: "",
          flex: 1.5,
          renderCell: (params: any) => (
            <>
              {params.row.requestStatus?.toLowerCase() !== "approved" ? (
                <>
                  <Row className="d-flex">
                    <Col xs={6} className="px-1">
                      <Button
                        size="sm"
                        variant="success"
                        className="w-100"
                        onClick={async () => {
                          const res = confirm(`Confirm to approve the trip ${params.row.title}`);
                          if (res) {
                            await approveExistingTrip(params.row.id, decodedToken.sub.userId, access_token);
                            window.location.reload();
                          }
                        }}
                      >
                        <Image className="pe-2" src={Check} /> Approve
                      </Button>
                    </Col>
                    <Col xs={6} className="px-1">
                      <Button
                        size="sm"
                        className="w-100 text-white"
                        variant="danger"
                        onClick={async () => {
                          const res = confirm(`Confirm to decline the trip ${params.row.title}`);
                          if (res) {
                            await declineExistingTrip(params.row.id, decodedToken.sub.userId, access_token);
                            window.location.reload();
                          }
                        }}
                      >
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
        }
      : {
          field: "operations",
          headerName: "",
          flex: 1.5,
          renderCell: (params: any) => (
            <>
              <CreateUpdateTripChecklist
                tripId={params.row.id}
                departureTime={params.row.departureTime}
                arrivalTime={params.row.arrivalTime}
                checklist={checklistSimulation}
                type={"operation"}
              />
            </>
          ),
        },
  ];

  useEffect(() => {
    (async () => {
      const allTrips = await getAllTrips({ id: undefined, type: userRole, withDeleted: false }, access_token);
      setAllTripData(allTrips.data ?? []);
      const formattedTableData: TripTableProps[] = allTrips.data!!.map((trip: TripProps) => ({
        id: trip.id,
        title: trip.title,
        tripStart: trip.tripStart,
        tripEnd: trip.tripEnd,
        destination: trip.destination,
        purpose: trip.purpose,
        status: trip.status,
        timeDeparture: trip.timeDeparture,
        timeArrival: trip.timeArrival,
        remarks: trip.remarks,
        createdDate: trip.createdDate,
        updatedDate: trip.updatedDate,
        isDeleted: trip.isDeleted,
        tripChecklists: [], // To Be Implemented yet
        department: { id: trip.department.id, name: "" },
        driver: trip.driver,
        vehicle: trip.vehicle,
        driverRequest: false,
        vehicleRequest: false,
        requestStatus: capitalize(trip.status) as "Pending" | "Approved" | "Declined",
        tripStatus: trip.timeDeparture && trip.timeArrival ? "Past" : trip.timeDeparture ? "Ongoing" : "Upcoming",
        date: `${formatISOString(trip.tripStart)} - ${formatISOString(trip.tripEnd)}`,
      }));
      setTableData(formattedTableData);

      const allDeparment = await getAllDeparment(access_token);
      setAllDepartmentData(allDeparment.data ?? []);

      const allVehicle = await getAllVehicle(access_token);
      setAllVehicleData(allVehicle.data ?? []);

      const allDriver = await getAllDrivers(access_token);
      setAllDriverData(allDriver.data ?? []);
    })();
  }, []);

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
                passedData={{
                  id: "",
                  title: "",
                  tripStart: "", // ISO 8601 date-time string
                  tripEnd: "", // ISO 8601 date-time string
                  destination: "",
                  purpose: "",
                  status: "",
                  timeDeparture: "", // ISO 8601 date-time string
                  timeArrival: "", // ISO 8601 date-time strin
                  remarks: "",
                  createdDate: "", // ISO 8601 date-time string
                  updatedDate: "", // ISO 8601 date-time string
                  isDeleted: false,
                  tripChecklists: [],
                  department: { id: "", name: "" },
                  driverRequest: true,
                  vehicleRequest: true,
                }}
                departments={allDepartmentData}
                access_token={access_token}
                vehicles={allVehicleData}
                drivers={allDriverData}
              />
            </>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          <CustomTable rows={tableData} columns={finalCols} type={"trips"} />
        </Col>
      </Row>
      <CustomToast header={"Login"} body={"Login Unsuccessful"} time={"Just now"} show={showToast} setShow={setShowToast} variant={"success"} />;
    </Container>
  );
}
