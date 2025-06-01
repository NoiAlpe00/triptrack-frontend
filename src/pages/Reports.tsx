import { Button, Col, Container, FloatingLabel, Form, Nav, Row, Tab } from "react-bootstrap";
import CustomHeader from "../components/CustomHeader";
import { useEffect, useState } from "react";
import CustomTable from "../components/Table";
import { getYearlyDriverReport, getYearlyTripReport, getYearlyVehicleReport } from "../hooks/axios";
import { useAuthHeader } from "react-auth-kit";
import { DriverUsage, TripProps, VehicleUsage, YearlyDriverTableProps, YearlyTripTableProps, YearlyVehicleTableProps } from "../utils/TypesIndex";
import ViewMontlyReport from "../modals/ViewMonthlyReport";
import { formatISOString } from "../utils/utilities";

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

  // const handleTripExport = () => {
  //   // Prepare CSV headers
  //   const headers = ["Month", "Total Trips", "Approved", "Approved (Outsourced)", "Rejected"];

  //   // Map the data to CSV rows
  //   const rows = tripTableData.map((trip) => [trip.month, trip.noOfTrips, trip.approvedOutsourced, trip.rejected]);

  //   // Combine headers and rows
  //   const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

  //   // Create a Blob from the CSV content
  //   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  //   // Create a temporary <a> element to trigger the download
  //   const link = document.createElement("a");
  //   const url = URL.createObjectURL(blob);
  //   link.href = url;
  //   link.setAttribute("download", `trips_summary_${year}.csv`);
  //   document.body.appendChild(link);
  //   link.click();

  //   document.body.removeChild(link);
  //   URL.revokeObjectURL(url);
  // };

  // const handleVehicleExport = () => {
  //   // Prepare CSV headers
  //   const headers = ["Month", "Total Assigned Trips", "Most Used Vehicle", "Least Used"];

  //   // Map the data to CSV rows
  //   const rows = vehicleTableData.map((vehicle) => [vehicle.month, vehicle.totalAssigned, vehicle.mostUsed, vehicle.leastUsed]);

  //   // Combine headers and rows
  //   const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

  //   // Create a Blob from the CSV content
  //   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  //   // Create a temporary <a> element to trigger the download
  //   const link = document.createElement("a");
  //   const url = URL.createObjectURL(blob);
  //   link.href = url;
  //   link.setAttribute("download", `vehicle_summary_${year}.csv`);
  //   document.body.appendChild(link);
  //   link.click();

  //   document.body.removeChild(link);
  //   URL.revokeObjectURL(url);
  // };

  // const handleDriverExport = () => {
  //   // Prepare CSV headers
  //   const headers = ["Month", "Total Assigned Trips", "Highest Rating Driver", "Most Active Driver"];

  //   // Map the data to CSV rows
  //   const rows = driverTableData.map((driver) => [driver.month, driver.totalAssigned, driver.highRating, driver.mostActive]);

  //   // Combine headers and rows
  //   const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

  //   // Create a Blob from the CSV content
  //   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  //   // Create a temporary <a> element to trigger the download
  //   const link = document.createElement("a");
  //   const url = URL.createObjectURL(blob);
  //   link.href = url;
  //   link.setAttribute("download", `driver_summary_${year}.csv`);
  //   document.body.appendChild(link);
  //   link.click();

  //   document.body.removeChild(link);
  //   URL.revokeObjectURL(url);
  // };

  const handleVehicleExport = () => {
    const headers = ["Month", "Total Assigned Trips", "Most Used Vehicle", "Least Used"];
    const rows = vehicleTableData.map((vehicle) => [vehicle.month, vehicle.totalAssigned, vehicle.mostUsed, vehicle.leastUsed]);

    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const filename = `vehicle_summary_${year}.csv`;

    // Check if running in Android WebView
    if (typeof (window as any).AndroidBridge !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(",")[1]; // strip data: URI prefix
        (window as any).AndroidBridge.saveBlobData(base64data, "text/csv", filename);
      };
      reader.readAsDataURL(blob);
    } else {
      // Normal browser download fallback
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleTripExport = () => {
    const headers = ["Month", "Total Trips", "Approved", "Approved (Outsourced)", "Rejected"];
    const rows = tripTableData.map((trip) => [trip.month, trip.noOfTrips, trip.approvedOutsourced, trip.rejected]);

    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const filename = `trips_summary_${year}.csv`;

    if (typeof (window as any).AndroidBridge !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(",")[1];
        (window as any).AndroidBridge.saveBlobData(base64data, "text/csv", filename);
      };
      reader.readAsDataURL(blob);
    } else {
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleDriverExport = () => {
    const headers = ["Month", "Total Assigned Trips", "Highest Rating Driver", "Most Active Driver"];
    const rows = driverTableData.map((driver) => [driver.month, driver.totalAssigned, driver.highRating, driver.mostActive]);

    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const filename = `driver_summary_${year}.csv`;

    if (typeof (window as any).AndroidBridge !== "undefined") {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(",")[1];
        (window as any).AndroidBridge.saveBlobData(base64data, "text/csv", filename);
      };
      reader.readAsDataURL(blob);
    } else {
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const tripCols = [
    {
      field: "month",
      headerName: "Month",
      width: 300,
      renderCell: (params: any) => {
        const row = params.row;

        // internalTrips: [],
        // outsourcedTrips: [],
        // rejectedTrips: [],

        const allMonthlyTripData: TripProps[] = [...row.internalTrips, ...row.outsourcedTrips, ...row.rejectedTrips];

        const rows = allMonthlyTripData
          .sort((a, b) => new Date(a.tripStart).getTime() - new Date(b.tripStart).getTime())
          .sort((a, b) => a.status.localeCompare(b.status))
          .map((trip) => ({
            id: trip.id,
            pax: trip.pax,
            createdDate: formatISOString(trip.createdDate),
            dateNeeded: `${formatISOString(trip.tripStart)} - ${formatISOString(trip.tripEnd)} `,
            requisitioner: `${trip.user?.lastName}, ${trip.user?.firstName}`,
            purpose: trip.purpose,
            status: trip.status,
            vehicle: trip.vehicle ? trip.vehicle.model : "-",
            driver: trip.driver ? `${trip.driver.lastName}, ${trip.driver.firstName}` : "-",
            contactNo: trip.driver ? trip.driver.contactNumber : "-",
            vehicleRating: trip.vehicle && trip.feedbacks ? (trip.feedbacks.length > 0 ? trip.feedbacks[0].vehicleRating : "-") : "-",
            driverRating: trip.driver && trip.feedbacks ? (trip.feedbacks.length > 0 ? trip.feedbacks[0].driverRating : "-") : "-",
            serviceRating: trip.feedbacks && trip.feedbacks.length > 0 ? trip.feedbacks[0].serviceRating : "-",
            ratingRemarks: trip.feedbacks && trip.feedbacks.length > 0 ? trip.feedbacks[0].remarks : "-",
          }));

        return row.noOfTrips != 0 ? <ViewMontlyReport month={row.month} rows={rows} cols={monthlyReportTripCols} type={"trips"} /> : row.month;
      },
    },
    { field: "noOfTrips", headerName: "Total Trips", width: 250 },
    { field: "approved", headerName: "Approved", width: 250 },
    { field: "approvedOutsourced", headerName: "Approved (Outsourced)", width: 250 },
    { field: "rejected", headerName: "Rejected", width: 220 },
  ];
  const vehicleCols = [
    {
      field: "month",
      headerName: "Month",
      width: 300,
      renderCell: (params: any) => {
        const row = params.row;

        const rowsData: VehicleUsage[] = row.data;

        const formattedRows = rowsData.map((vehicle) => ({
          id: vehicle.vehicle.id,
          model: vehicle.vehicle.model,
          plateNumber: vehicle.vehicle.plateNumber,
          howManyUsed: vehicle.howManyUsed,
          lastMaintenance: vehicle.lastMaintenance ? formatISOString(vehicle.lastMaintenance) : "-",
        }));

        return row.totalAssigned != 0 ? (
          <ViewMontlyReport month={row.month} rows={formattedRows} cols={monthlyReportVehicleCols} type={"vehicle"} />
        ) : (
          row.month
        );
      },
    },
    { field: "totalAssigned", headerName: "Total Assigned trips", width: 250 },
    { field: "mostUsed", headerName: "Most Used Vehicle", width: 250 },
    { field: "leastUsed", headerName: "Least Used", width: 250 },
  ];
  const driverCols = [
    {
      field: "month",
      headerName: "Month",
      width: 300,
      renderCell: (params: any) => {
        const row = params.row;

        const rowData: DriverUsage[] = row.data;

        const rows = rowData.map((data) => ({
          id: data.driver.id,
          driver: `${data.driver.lastName}, ${data.driver.firstName}`,
          howManyTrips: data.howManyTrips,
          averageRating: data.averageRating ?? "-",
        }));

        return row.totalAssigned != 0 ? <ViewMontlyReport month={row.month} rows={rows} cols={monthlyReportDriverCols} type={"driver"} /> : row.month;
      },
    },
    { field: "totalAssigned", headerName: "Total Assigned Trips", width: 250 },
    { field: "highRating", headerName: "Highest Rating Driver", width: 250 },
    { field: "mostActive", headerName: "Most Active Driver", width: 250 },
  ];

  const monthlyReportTripCols = [
    { field: "id", headerName: "Trip Code", width: 100 },
    { field: "pax", headerName: "Pax", width: 100 },
    { field: "createdDate", headerName: "Date Requested", width: 180 },
    { field: "dateNeeded", headerName: "Date Needed", width: 350 },
    { field: "requisitioner", headerName: "Requisitioner", width: 120 },
    { field: "purpose", headerName: "Purpose", width: 150 },
    { field: "status", headerName: "Status  ", width: 120 },
    { field: "vehicle", headerName: "Vehicle", width: 150 },
    { field: "driver", headerName: "Driver", width: 150 },
    { field: "contactNo", headerName: "Contact No", width: 150 },
    { field: "vehicleRating", headerName: "Vehicle Rating", width: 150 },
    { field: "driverRating", headerName: "Driver Rating", width: 150 },
    { field: "serviceRating", headerName: "Service Rating", width: 150 },
    { field: "ratingRemarks", headerName: "Rating Remarks", width: 150 },
  ];

  const monthlyReportVehicleCols = [
    { field: "model", headerName: "Model", width: 600 },
    { field: "plateNumber", headerName: "Plate Number", width: 350 },
    { field: "howManyUsed", headerName: "Trips Taken", width: 350 },
    { field: "lastMaintenance", headerName: "Last Maintenance", width: 350 },
  ];

  const monthlyReportDriverCols = [
    { field: "driver", headerName: "Driver", width: 600 },
    { field: "howManyTrips", headerName: "Trips Assigned", width: 350 },
    { field: "averageRating", headerName: "Average Rating", width: 350 },
  ];

  const handleYearSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setYear(value);
  };
  return (
    <Container>
      <Row className="mt-5 d-flex justify-content-center">
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
        <Tab.Container activeKey={activeTab} onSelect={(k: any) => setActiveTab(k || "trip")}>
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
                <Button
                  className="primary"
                  onClick={() => {
                    if (activeTab === "trip") {
                      handleTripExport();
                    } else if (activeTab === "vehicle") {
                      handleVehicleExport();
                    } else {
                      handleDriverExport();
                    }
                  }}
                >
                  Export Data <i className="bi bi-box-arrow-up" />
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
                  {/* <CreateUpdateChecklist passedData={{ pax: "", typed: false }} access_token={access_token} /> */}
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
