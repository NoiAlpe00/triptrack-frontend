import { useState, useEffect } from "react";
import { Container, Row, Col, FloatingLabel, Form, Button, Image } from "react-bootstrap";
import CustomTable from "../components/Table";
import CustomToast from "../components/Toast";
import CreateUpdateTrip from "../modals/CreateUpdateTrip";
import CheckPurple from "../assets/svgs/check-purple.svg";
import XRed from "../assets/svgs/x-red.svg";
import Pending from "../assets/svgs/pending.svg";
import Upcoming from "../assets/svgs/upcoming.svg";
import Ongoing from "../assets/svgs/ongoing.svg";
import Past from "../assets/svgs/past.svg";
import { capitalize, decodeToken, formatISOString, formatISOStringDateOnly } from "../utils/utilities";
import { useAuthHeader, useAuthUser } from "react-auth-kit";
import CreateUpdateTripChecklist from "../modals/CreateUpdateTripChecklist";
import {
  DepartmentProps,
  DriverProps,
  FeedbackProps,
  TripProps,
  TripSpecificChecklistProps,
  TripTableProps,
  VehicleProps,
} from "../utils/TypesIndex";
import {
  approveExistingTrip,
  declineExistingTrip,
  endorseExistingTrip,
  getAllChecklist,
  getAllDeparment,
  getAllDrivers,
  getAllTrips,
  getAllVehicle,
} from "../hooks/axios";
import ViewTripDetails from "../modals/ViewTripDetails";
import Feedback from "../modals/Feedback";

export default function Trips() {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [allTripData, setAllTripData] = useState<TripProps[]>([]);
  const [tableData, setTableData] = useState<TripTableProps[]>([]);
  const [allDepartmentData, setAllDepartmentData] = useState<DepartmentProps[]>([]);
  const [allDriverData, setAllDriverData] = useState<DriverProps[]>([]);
  const [allVehicleData, setAllVehicleData] = useState<VehicleProps[]>([]);
  const [allTripSpecificChecklistData, setAllTripSpecificChecklistData] = useState<TripSpecificChecklistProps[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const auth = useAuthUser();
  const userRole = auth()?.role ?? "Requisitioner";

  const authHeader = useAuthHeader();
  const access_token = authHeader();

  const decodedToken = decodeToken(access_token);

  useEffect(() => {
    (async () => {
      const formattedTableData: TripTableProps[] = allTripData
        .filter((trip) => (statusFilter == "all" ? true : trip.status.toLowerCase() === statusFilter))
        .map((trip: TripProps) => {
          return {
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
            requisitioner: `${trip.user?.lastName}, ${trip.user?.firstName}`,
            tripChecklists: trip.tripChecklists, // To Be Implemented yet
            department: { id: trip.department.id, name: trip.department.name },
            driver: trip.driver,
            vehicle: trip.vehicle,
            driverRequest: trip.driverRequest,
            vehicleRequest: trip.vehicleRequest,
            requestStatus: capitalize(trip.status) as "Pending" | "Approved" | "Declined",
            tripStatus: trip.timeDeparture && trip.timeArrival ? "Past" : trip.timeDeparture ? "Ongoing" : "Upcoming",
            date: `${formatISOString(trip.tripStart)} - ${formatISOString(trip.tripEnd)}`,
            user: trip.user,
            feedback: trip.feedback,
            dateRequested: formatISOStringDateOnly(trip.createdDate),
          };
        });
      setTableData(formattedTableData);
    })();
  }, [statusFilter]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setStatusFilter(value);
  };

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
          tripChecklists: row.tripChecklists,
          department: { id: row.department.id, name: "" },
          requisitioner: `${row.user.lastName}, ${row.user.firstName}`,
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
          dateRequested: formatISOString(row.createdDate),
        };

        return (
          passedData.timeDeparture == null &&
          passedData.timeArrival == null && (
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
          )
        );
      },
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    // { field: "id", headerName: "Trip Code", flex: 0.5 },
    { field: "title", headerName: "Title", width: 320 },

    {
      field: "destination",
      headerName: "Destination",
      width: 250,
    },
    !(userRole.toLowerCase() == "guard")
      ? { field: "dateRequested", headerName: "Date Requested", width: 150 }
      : {
          field: "driver",
          headerName: "Driver",
          flex: 1,
          renderCell: (params: any) => {
            const row = params.row;

            return <span>{row.driver !== null ? `${row.driver.lastName}, ${row.driver.firstName}` : "Self Drive"}</span>;
          },
        },
    !(userRole.toLowerCase() == "guard")
      ? { field: "requisitioner", headerName: "Requisitioner", width: 150 }
      : {
          field: "vehicle",
          headerName: "Vehicle",
          flex: 1,
          renderCell: (params: any) => {
            const row = params.row;

            return <span>{row.vehicle !== null ? `${row.vehicle.model} - ${row.vehicle.plateNumber}` : "Own Vehicle"}</span>;
          },
        },
    { field: "date", headerName: "Date Needed", width: 350 },
    !(userRole.toLowerCase() == "guard")
      ? {
          field: "requestStatus",
          headerName: "Request Status",
          width: 150,
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
              ) : params.row.requestStatus?.toLowerCase() == "endorsed" ? (
                <>
                  <Row className="d-flex">
                    <Col className="px-1">
                      <i className="bi bi-file-earmark-arrow-up" />{" "}
                      <span className="text-primary">
                        <strong>Endorsed</strong>
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
          field: "timeDeparture",
          headerName: "Departure Time",
          width: 200,
          renderCell: (params: any) => {
            console.log(params.row);
            return (
              <>
                <CreateUpdateTripChecklist
                  passedData={{
                    tripId: params.row.id,
                    timeDeparture: params.row.timeDeparture,
                    timeArrival: params.row.timeArrival,
                    timing: params.row.timeDeparture == undefined ? "Before" : "After",
                    checklist: allTripSpecificChecklistData,
                    guard: params.row.guard,
                  }}
                  type={"table"}
                  phase={"departure"}
                  access_token={access_token}
                />
              </>
            );
          },
          // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
        },
    ,
    !(userRole.toLowerCase() == "guard")
      ? {
          field: "tripStatus",
          headerName: "Trip Status",
          width: 150,
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
          width: 200,
          renderCell: (params: any) => (
            <>
              <CreateUpdateTripChecklist
                passedData={{
                  tripId: params.row.id,
                  timeDeparture: params.row.timeDeparture,
                  timeArrival: params.row.timeArrival,
                  timing: params.row.timeDeparture == undefined ? "Before" : "After",
                  checklist: allTripSpecificChecklistData,
                  guard: params.row.guard,
                }}
                type={"table"}
                phase={"arrival"}
                access_token={access_token}
              />
            </>
          ),
          // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
        },

    !(userRole.toLowerCase() == "guard")
      ? {
          field: "operations",
          headerName: "",
          width: 300,
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
              tripChecklists: row.tripChecklists, // To Be Implemented yet
              department: row.department,
              driver: row.driver,
              vehicle: row.vehicle,
              user: row.user,
              requisitioner: `${row.user.lastName}, ${row.user.firstName}`,
              driverRequest: row.driverRequest,
              vehicleRequest: row.vehicleRequest,
              requestStatus: capitalize(row.status) as "Pending" | "Approved" | "Declined",
              tripStatus: row.timeDeparture && row.timeArrival ? "Past" : row.timeDeparture ? "Ongoing" : "Upcoming",
              date: `${formatISOString(row.tripStart)} - ${formatISOString(row.tripEnd)}`,
              dateRequested: formatISOStringDateOnly(row.createdDate),
            };

            const feedback: FeedbackProps[] = row.feedback ?? [];

            const hasFeedback = feedback.filter((feedback) => feedback.user.id === decodedToken.sub.userId);

            return (
              <>
                {params.row.tripStatus?.toLowerCase() == "upcoming" && (userRole.toLowerCase() === "admin" || userRole.toLowerCase() === "head") ? (
                  <>
                    <Row className="d-flex">
                      <Col xs={4} className="px-1">
                        <Button
                          size="sm"
                          variant="success"
                          className="w-100"
                          onClick={async () => {
                            const res = confirm(
                              `Confirm to ${userRole.toLowerCase() === "head" ? "endorse" : "approve"} the trip ${params.row.title}`
                            );
                            if (res) {
                              if (decodedToken.userType.toLowerCase() === "admin")
                                await approveExistingTrip(params.row.id, decodedToken.sub.userId, access_token);
                              else await endorseExistingTrip(params.row.id, decodedToken.sub.userId, access_token);
                              window.location.reload();
                            }
                          }}
                        >
                          <i className="bi bi-check2" /> {decodedToken.userType.toLowerCase() === "head" ? "Endorse" : "Approve"}
                        </Button>
                      </Col>
                      <Col xs={4} className="px-1">
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
                          <i className="bi bi-x-circle" /> Decline
                        </Button>
                      </Col>
                      <Col xs={4} className="px-1">
                        <ViewTripDetails passedData={passedData} type={"pending"} />
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <Row className="d-flex">
                      <Col className="px-1">
                        <ViewTripDetails passedData={passedData} type={"operation"} />
                      </Col>
                      {row.tripStatus.toLowerCase() === "past" && row.user.id === decodedToken.sub.userId && hasFeedback == undefined && (
                        <Col>
                          <Feedback
                            userId={decodedToken.sub.userId}
                            access_token={access_token}
                            tripId={row.id}
                            vehicleId={row.vehicle?.id ?? ""}
                            driverId={row.driver?.id ?? ""}
                          />
                        </Col>
                      )}
                    </Row>
                  </>
                )}
              </>
            );
          },
          // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
        }
      : {
          field: "operations",
          headerName: "",
          width: 250,
          renderCell: (params: any) => (
            <>
              <CreateUpdateTripChecklist
                passedData={{
                  tripId: params.row.id,
                  timeDeparture: params.row.timeDeparture,
                  timeArrival: params.row.timeArrival,
                  timing: params.row.timeDeparture == undefined ? "Before" : "After",
                  checklist: allTripSpecificChecklistData,
                  guard: params.row.guard,
                }}
                type={"operation"}
                phase={params.row.timeDeparture && params.row.timeArrival ? "done" : params.row.timeDeparture == undefined ? "departure" : "arrival"}
                access_token={access_token}
              />
            </>
          ),
        },
  ];

  useEffect(() => {
    (async () => {
      const allDeparment = await getAllDeparment(access_token);
      setAllDepartmentData(allDeparment.data ?? []);

      const allChecklist = await getAllChecklist(access_token);
      if (allChecklist.statusCode >= 200 && allChecklist.statusCode < 400) {
        const formattedChecklistTableData = allChecklist.data?.map((checklist) => ({
          checklistId: checklist.id!!,
          title: checklist.title,
          typed: checklist.typed ?? false,
          data: checklist.typed ? "" : "passed",
        }));
        setAllTripSpecificChecklistData(formattedChecklistTableData ?? []);
      }

      const allVehicle = await getAllVehicle(access_token);
      setAllVehicleData(allVehicle.data ?? []);

      const allDriver = await getAllDrivers(access_token);
      setAllDriverData(allDriver.data ?? []);

      const allTrips = await getAllTrips({ id: undefined, type: userRole, withDeleted: false }, access_token);
      if (allTrips.statusCode >= 200 && allTrips.statusCode < 400) {
        setAllTripData(allTrips.data ?? []);
        const formattedTableData: TripTableProps[] = allTrips.data
          ? allTrips.data.map((trip: TripProps) => {
              return {
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
                tripChecklists: trip.tripChecklists, // To Be Implemented yet
                department: { id: trip.department.id, name: trip.department.name },
                requisitioner: `${trip.user?.lastName}, ${trip.user?.firstName}`,
                driver: trip.driver,
                vehicle: trip.vehicle,
                driverRequest: trip.driverRequest,
                vehicleRequest: trip.vehicleRequest,
                requestStatus: capitalize(trip.status) as "Pending" | "Approved" | "Declined",
                tripStatus: trip.timeDeparture && trip.timeArrival ? "Past" : trip.timeDeparture ? "Ongoing" : "Upcoming",
                date: `${formatISOString(trip.tripStart)} - ${formatISOString(trip.tripEnd)}`,
                user: trip.user,
                feedback: trip.feedback,
                dateRequested: formatISOStringDateOnly(trip.createdDate),
              };
            })
          : [];
        setTableData(formattedTableData);
      }
    })();
  }, []);

  const finalCols =
    userRole.toLowerCase() === "guard"
      ? columns.slice(1)
      : userRole.toLowerCase() === "admin" || userRole.toLowerCase() === "head" || userRole.toLowerCase() === "requisitioner"
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
      <Row className="pt-5 pb-3 px-1 d-flex justify-content-center">
        <Col md={6} className="mb-2">
          <Row className="d-flex align-items-center">
            <Col md={2} className="">
              <h2 className="text-primary thin-text text-start">All Trips</h2>
            </Col>
            <Col md={4} className="">
              <FloatingLabel controlId="floatingSelect" label="Status" className="small-input">
                <Form.Select name="statusFilter" aria-label="Floating label select example" value={statusFilter} onChange={handleSelectChange}>
                  <option value="all">All</option>
                  <option value="approved">Approved</option>
                  <option value="endorsed">Endorsed</option>
                  <option value="pending">Pending</option>
                  <option value="declined">Declined</option>
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
