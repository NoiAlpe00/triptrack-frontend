import { useState, useEffect } from "react";
import { Container, Row, Col, FloatingLabel, Form, Button, Image, InputGroup } from "react-bootstrap";
import CustomTable from "../components/Table";
import CustomToast from "../components/Toast";
import CreateUpdateTrip from "../modals/CreateUpdateTrip";
import CheckPurple from "../assets/svgs/check-purple.svg";
import XRed from "../assets/svgs/x-red.svg";
import Waiting from "../assets/svgs/pending.svg";
import Pending from "../assets/svgs/upcoming.svg";
import Ongoing from "../assets/svgs/ongoing.svg";
import Completed from "../assets/svgs/past.svg";
import { capitalize, decodeToken, formatISOString, formatISOStringDateOnly, getLocalISOString, isDateCompleted } from "../utils/utilities";
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
  disapproveExistingTrip,
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
  const [search, setSearch] = useState<string>("");

  const auth = useAuthUser();
  const userRole = auth()?.role ?? "Requisitioner";

  const authHeader = useAuthHeader();
  const access_token = authHeader();

  const now = getLocalISOString(new Date());

  const decodedToken = decodeToken(access_token);

  useEffect(() => {
    (async () => {
      const formattedTableData: TripTableProps[] = allTripData
        .filter((trip) => (statusFilter == "all" ? true : trip.status.toLowerCase() === statusFilter))
        .filter((trip) => {
          const tripStatus = capitalize(trip.status);
          console.log(now);
          const isPastStart = isDateCompleted(now, trip.tripStart.slice(0, -1));
          console.log(trip.tripStart);
          console.log(isPastStart);

          if (statusFilter === "waiting" || statusFilter === "endorsed") {
            const isDeclinedOrDisapproved = tripStatus === "Declined" || tripStatus === "Disapproved";
            const isOverdueAndNotApproved = isPastStart && tripStatus !== "Approved";

            return !isDeclinedOrDisapproved && !isOverdueAndNotApproved;
          }

          return true; // for other status filters, don't exclude anything
        })
        .filter((trip) => trip.id.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => b.id.localeCompare(a.id))
        .map((trip: TripProps) => {
          const isCompleted = isDateCompleted(now, trip.tripStart);
          return {
            id: trip.id,
            pax: trip.pax,
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
            requestStatus: capitalize(trip.status) as "Waiting" | "Approved" | "Declined",
            tripStatus:
              trip.timeDeparture && trip.timeArrival
                ? "Completed"
                : trip.timeDeparture
                ? "Ongoing"
                : (isCompleted && capitalize(trip.status) !== "Approved") ||
                  capitalize(trip.status) === "Declined" ||
                  capitalize(trip.status) == "Disapproved"
                ? "Cancelled"
                : "Pending",
            date: `${formatISOString(trip.tripStart.slice(0, -1))} - ${formatISOString(trip.tripEnd.slice(0, -1))}`,
            user: trip.user,
            feedbacks: trip.feedbacks,
            dateRequested: formatISOStringDateOnly(trip.createdDate),
          };
        });
      setTableData(formattedTableData);
    })();
  }, [statusFilter, search]);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setStatusFilter(value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearch(value);
  };

  const columns = [
    {
      field: "edit",
      headerName: "",
      width: 50,
      minWidth: 50,
      maxWidth: 50,
      sortable: false,
      renderCell: (params: any) => {
        const row = params.row;

        const isCompleted = isDateCompleted(now, row.tripStart);

        const passedData: TripTableProps = {
          id: row.id,
          pax: row.pax,
          tripStart: row.tripStart.slice(0, -8),
          tripEnd: row.tripEnd.slice(0, -8),
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
          feedbacks: row.feedbacks,
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
            trips: row.vehicle?.trips,
          },
          driverRequest: row.driverRequest,
          vehicleRequest: row.vehicleRequest,
          requestStatus: capitalize(row.status) as "Waiting" | "Approved" | "Declined",
          tripStatus:
            row.timeDeparture && row.timeArrival
              ? "Completed"
              : row.timeDeparture
              ? "Ongoing"
              : (isCompleted && capitalize(row.status) !== "Approved") ||
                capitalize(row.status) === "Declined" ||
                capitalize(row.status) == "Disapproved"
              ? "Cancelled"
              : "Pending",
          date: `${formatISOString(row.tripStart)} - ${formatISOString(row.tripEnd)}`,
          dateRequested: formatISOString(row.createdDate),
        };

        return (
          passedData.timeDeparture == null &&
          passedData.timeArrival == null &&
          !isDateCompleted(now, passedData.tripStart) && (
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
    {
      field: "id",
      headerName: "Trip Code",
      width: 150,
      renderCell: (params: any) => {
        const row = params.row;

        const isCompleted = isDateCompleted(now, row.tripStart);

        const passedData: TripTableProps = {
          id: row.id,
          pax: row.pax,
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
          requestStatus: capitalize(row.status) as "Waiting" | "Approved" | "Declined",
          tripStatus:
            row.timeDeparture && row.timeArrival
              ? "Completed"
              : row.timeDeparture
              ? "Ongoing"
              : (isCompleted && capitalize(row.status) !== "Approved") ||
                capitalize(row.status) === "Declined" ||
                capitalize(row.status) == "Disapproved"
              ? "Cancelled"
              : "Pending",
          date: `${formatISOString(row.tripStart.slice(0, -1))} - ${formatISOString(row.tripEnd.slice(0, -1))}`,
          dateRequested: formatISOStringDateOnly(row.createdDate),
          feedbacks: row.feedbacks,
        };

        return <ViewTripDetails passedData={passedData} type={"title"} />;
      },
    },
    {
      field: "pax",
      headerName: "Pax",
      width: 100,
    },

    userRole.toLowerCase() == "guard"
      ? { field: "requisitioner", headerName: "Requisitioner", width: 150 }
      : {
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
    { field: "date", headerName: "Date Needed", width: 400 },
    !(userRole.toLowerCase() == "guard")
      ? {
          field: "requestStatus",
          headerName: "Request Status",
          width: 150,
          renderCell: (params: any) => {
            const tripStart = params.row.tripStart.slice(0, -1); // removing trailing Z
            const isCompleted = isDateCompleted(tripStart, now);

            return (
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
                ) : params.row.requestStatus?.toLowerCase() == "declined" || params.row.requestStatus?.toLowerCase() == "disapproved" ? (
                  <>
                    <Row className="d-flex">
                      <Col className="px-1">
                        <Image className="pe-2" src={XRed} />
                        <span className="text-danger">
                          <strong>{params.row.requestStatus}</strong>
                        </span>
                      </Col>
                    </Row>
                  </>
                ) : params.row.requestStatus?.toLowerCase() == "endorsed" && isCompleted ? (
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
                ) : isCompleted ? (
                  <>
                    <Row className="d-flex">
                      <Col className="px-1">
                        <Image className="pe-2" src={Waiting} />
                        <span className="text-primary">
                          <strong>Waiting</strong>
                        </span>
                      </Col>
                    </Row>
                  </>
                ) : (
                  "-"
                )}
              </>
            );
          },
          // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
        }
      : {
          field: "timeDeparture",
          headerName: "Departure Time",
          width: 200,
          renderCell: (params: any) => {
            return (
              <>
                <CreateUpdateTripChecklist
                  passedData={{
                    tripId: params.row.id,
                    timeDeparture: params.row.timeDeparture ? params.row.timeDeparture.slice(0, -1) : undefined,
                    timeArrival: params.row.timeArrival ? params.row.timeArrival.slice(0, -1) : undefined,
                    timing: params.row.timeDeparture == undefined ? "Before" : "After",
                    checklist: allTripSpecificChecklistData,
                    guard: params.row.guard,
                    tripStart: params.row.tripStart.slice(0, -8),
                    tripEnd: params.row.tripEnd.slice(0, -8),
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
          renderCell: (params: any) => {
            const requestStatus = params.row.requestStatus.toLowerCase();
            const tripStatus = params.row.tripStatus?.toLowerCase();
            const tripStart = params.row.tripStart.slice(0, -1); // removing trailing Z
            const isCompleted = !isDateCompleted(tripStart, now);

            if (requestStatus === "declined" || requestStatus === "disapproved") {
              return (
                <Row className="d-flex">
                  <Col className="px-1">
                    <Image className="pe-2" src={XRed} />
                    <span className="text-danger">
                      <strong>Cancelled</strong>
                    </span>
                  </Col>
                </Row>
              );
            }

            if (requestStatus == "approved") {
              if (tripStatus == "completed") {
                return (
                  <Row className="d-flex">
                    <Col className="px-1">
                      <Image className="pe-2" src={Completed} />
                      <span className="text-secondary">
                        <strong>Completed</strong>
                      </span>
                    </Col>
                  </Row>
                );
              } else if (tripStatus === "pending") {
                return (
                  <Row className="d-flex">
                    <Col className="px-1">
                      <Image className="pe-2" src={Pending} />
                      <span className="text-primary">
                        <strong>Pending</strong>
                      </span>
                    </Col>
                  </Row>
                );
              } else if (tripStatus === "ongoing") {
                return (
                  <Row className="d-flex">
                    <Col className="px-1">
                      <Image className="pe-2" src={Ongoing} />
                      <span className="text-primary">
                        <strong>Ongoing</strong>
                      </span>
                    </Col>
                  </Row>
                );
              }
            }

            return isCompleted ? (
              <Row className="d-flex">
                <Col className="px-1">
                  <Image className="pe-2" src={XRed} />
                  <span className="text-danger">
                    <strong>Cancelled</strong>
                  </span>
                </Col>
              </Row>
            ) : (
              "-"
            );
          },
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
                  timeDeparture: params.row.timeDeparture ? params.row.timeDeparture.slice(0, -1) : undefined,
                  timeArrival: params.row.timeArrival ? params.row.timeArrival?.slice(0, -1) : undefined,
                  timing: params.row.timeDeparture == undefined ? "Before" : "After",
                  checklist: allTripSpecificChecklistData,
                  guard: params.row.guard,
                  tripStart: params.row.tripStart.slice(0, -8),
                  tripEnd: params.row.tripEnd.slice(0, -8),
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
          width: 320,
          renderCell: (params: any) => {
            const row = params.row;
            const isCompleted = isDateCompleted(now, row.tripStart);
            const passedData: TripTableProps = {
              id: row.id,
              pax: row.pax,
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
              requestStatus: capitalize(row.status) as "Waiting" | "Approved" | "Declined",
              tripStatus:
                row.timeDeparture && row.timeArrival
                  ? "Completed"
                  : row.timeDeparture
                  ? "Ongoing"
                  : (isCompleted && capitalize(row.status) !== "Approved") ||
                    capitalize(row.status) === "Declined" ||
                    capitalize(row.status) == "Disapproved"
                  ? "Cancelled"
                  : "Pending",
              date: `${formatISOString(row.tripStart)} - ${formatISOString(row.tripEnd)}`,
              dateRequested: formatISOStringDateOnly(row.createdDate),
              feedbacks: row.feedbacks,
            };

            const feedbacks: FeedbackProps[] = row.feedbacks ?? [];

            const hasFeedback = feedbacks.filter((feedback) => feedback.user.id === decodedToken.sub.userId).length > 0;

            return (
              <>
                {params.row.tripStatus?.toLowerCase() == "pending" &&
                (userRole.toLowerCase() === "admin" || userRole.toLowerCase() === "head") &&
                isDateCompleted(params.row.tripStart.slice(0, -1), now) ? (
                  <>
                    <Row className="d-flex">
                      <Col xs={4} className="px-1">
                        <Button
                          size="sm"
                          variant="success"
                          className="w-100"
                          onClick={async () => {
                            const res = confirm(`Confirm to ${userRole.toLowerCase() === "head" ? "endorse" : "approve"} the trip ${params.row.id}`);
                            if (res) {
                              if (decodedToken.userType.toLowerCase() === "admin") await approveExistingTrip(params.row.id, access_token);
                              else await endorseExistingTrip(params.row.id, access_token);
                              window.location.reload();
                            }
                          }}
                        >
                          <i className="bi bi-check2" /> {decodedToken.userType.toLowerCase() === "head" ? "Endorse" : "Approve"}
                        </Button>
                      </Col>
                      <Col xs={decodedToken.userType.toLowerCase() === "head" ? 5 : 4} className="px-1">
                        <Button
                          size="sm"
                          className="w-100 text-white"
                          variant="danger"
                          onClick={async () => {
                            const res = confirm(
                              `Confirm to ${decodedToken.userType.toLowerCase() === "head" ? "disapprove" : "decline"} the trip ${params.row.id}`
                            );
                            if (res) {
                              if (decodedToken.userType.toLowerCase() === "admin") await declineExistingTrip(params.row.id, access_token);
                              else await disapproveExistingTrip(params.row.id, access_token);
                              window.location.reload();
                            }
                          }}
                        >
                          <i className="bi bi-x-circle" /> {decodedToken.userType.toLowerCase() === "admin" ? "Decline" : "Disapprove"}
                        </Button>
                      </Col>
                      <Col xs={decodedToken.userType.toLowerCase() === "head" ? 3 : 4} className="px-1">
                        <ViewTripDetails passedData={passedData} type={"waiting"} />
                      </Col>
                    </Row>
                  </>
                ) : (
                  <>
                    <Row className="d-flex">
                      <Col className="px-1">
                        <ViewTripDetails passedData={passedData} type={"operation"} />
                      </Col>

                      {!(decodedToken.userType.toLowerCase() === "driver") &&
                        row.tripStatus.toLowerCase() === "completed" &&
                        row.user.id === decodedToken.sub.userId &&
                        !hasFeedback && (
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
                  tripStart: params.row.tripStart.slice(0, -8),
                  tripEnd: params.row.tripEnd.slice(0, -8),
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
          ? allTrips.data
              .sort((a, b) => b.id.localeCompare(a.id))
              .map((trip: TripProps) => {
                const isCompleted = isDateCompleted(now, trip.tripStart);
                return {
                  id: trip.id,
                  pax: trip.pax,
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
                  requestStatus: capitalize(trip.status) as "Waiting" | "Approved" | "Declined",
                  tripStatus:
                    trip.timeDeparture && trip.timeArrival
                      ? "Completed"
                      : trip.timeDeparture
                      ? "Ongoing"
                      : (isCompleted && capitalize(trip.status) !== "Approved") ||
                        capitalize(trip.status) === "Declined" ||
                        capitalize(trip.status) == "Disapproved"
                      ? "Cancelled"
                      : "Pending",
                  date: `${formatISOString(trip.tripStart.slice(0, -1))} - ${formatISOString(trip.tripEnd.slice(0, -1))}`,
                  user: trip.user,
                  feedbacks: trip.feedbacks,
                  dateRequested: formatISOStringDateOnly(trip.createdDate),
                };
              })
          : [];
        setTableData(formattedTableData);
      }
    })();
  }, []);

  const finalCols =
    userRole.toLowerCase() === "guard" || userRole.toLowerCase() === "driver" || userRole.toLowerCase() === "requisitioner"
      ? columns.slice(1)
      : userRole.toLowerCase() === "admin" || userRole.toLowerCase() === "head"
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
      <Row className="pt-5 pb-2 px-1 d-flex justify-content-center">
        <Col md={6} className="mb-1">
          <Row className="d-flex align-items-center">
            <Col md={2} className="">
              <h2 className="text-primary thin-text text-start">All Trips</h2>
            </Col>
            {!(decodedToken.userType.toLowerCase() == "driver") && !(decodedToken.userType.toLowerCase() == "guard") && (
              <Col md={4} className="">
                <FloatingLabel controlId="floatingSelect" label="Status" className="small-input">
                  <Form.Select name="statusFilter" aria-label="Floating label select example" value={statusFilter} onChange={handleSelectChange}>
                    <option value="all">All</option>
                    <option value="approved">Approved</option>
                    <option value="endorsed">Endorsed</option>
                    <option value="waiting">Waiting</option>
                    <option value="declined">Declined</option>
                    <option value="disapproved">Disapproved</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
            )}
          </Row>
        </Col>

        <Col md={6} className="d-flex justify-content-end mb-1">
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
            vehicle={"completed"}
          /> */}
          {!(decodedToken.userType.toLowerCase() == "driver") && !(decodedToken.userType.toLowerCase() == "driver") && (
            <CreateUpdateTrip
              passedData={{
                id: "",
                pax: "",
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
          )}
        </Col>
      </Row>
      <Row className="d-flex justify-content-end mb-2">
        <Col lg={2}>
          <InputGroup>
            <InputGroup.Text id="basic-addon1">
              <i className="bi bi-search"></i>
            </InputGroup.Text>
            <Form.Control name="search" placeholder="Search" aria-label="Search" aria-describedby="basic-addon1" onChange={handleChange} />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <CustomTable rows={tableData} columns={finalCols} type={"trips"} />
        </Col>
      </Row>
      <CustomToast header={"Login"} body={"Login Successful"} time={"Just now"} show={showToast} setShow={setShowToast} variant={"success"} />;
    </Container>
  );
}
