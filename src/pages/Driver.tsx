import { Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import CustomHeader from "../components/CustomHeader";
import { useAuthHeader } from "react-auth-kit";
import PreventiveMaintenance from "../modals/PreventiveMaintenance";
import { MaintenanceProps, VehicleProps } from "../utils/TypesIndex";
import { decodeToken, formatISOStringDateOnly } from "../utils/utilities";
import { useEffect, useState } from "react";
import { getAllVehicle } from "../hooks/axios";
import CustomTable from "../components/Table";
import ViewMaintenanceDetails from "../modals/ViewMaintenanceDetails";
import ViewDetails from "../modals/ViewDetails";

export default function Driver() {
  const authHeader = useAuthHeader();
  const access_token = authHeader();

  const [allVehicleData, setAllVehicleData] = useState<VehicleProps[]>([]);
  const [vehicleTableData, setVehicleTableData] = useState<VehicleProps[]>([]);
  const [vehicleFilter, setVehicleFilter] = useState<string>("all");

  const decodedToken = decodeToken(access_token);

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setVehicleFilter(value);
  };

  useEffect(() => {
    (async () => {
      const allVehicle = await getAllVehicle(access_token);
      setAllVehicleData(allVehicle.data ?? []);
      const formattedVehicleTableData = allVehicle.data;
      setVehicleTableData(formattedVehicleTableData ?? []);
    })();
  }, []);

  useEffect(() => {
    if (vehicleFilter == "all") {
      setVehicleTableData(allVehicleData);
    } else if (vehicleFilter === "true") {
      setVehicleTableData(allVehicleData.filter((vehicleData) => vehicleData.isDeleted == true));
    } else {
      setVehicleTableData(allVehicleData.filter((vehicleData) => vehicleData.isDeleted == false));
    }
  }, [vehicleFilter]);

  const maintenanceCols = [
    {
      field: "date",
      headerName: "Date",
      width: 200,
      renderCell: (params: any) => {
        const row = params.row;

        return formatISOStringDateOnly(row.date);
      },
    },
    { field: "details", headerName: "Details", width: 300 },
    { field: "remarks", headerName: "Remarks", width: 250 },
    { field: "user", headerName: "Performed By", width: 250 },
  ];

  const vehicleColsView = [
    { field: "model", headerName: "Model", width: 600 },
    { field: "plateNumber", headerName: "Plate Number", width: 150 },
    { field: "seats", headerName: "Seats", width: 100 },
    {
      field: "isDeleted",
      headerName: "Status",
      width: 200,
    },
  ];

  const vehicleCols = [
    {
      field: "maintenance",
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
          trips: row.trips,
        };

        return (
          <Row className="d-flex align-items-center">
            <Col className="d-flex justify-content-center px-1">
              <PreventiveMaintenance userId={decodedToken.sub.userId} vehicleId={passedData.id!!} access_token={access_token} />
            </Col>
          </Row>
        );
      },
      // valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
    },
    {
      field: "model",
      headerName: "Model",
      width: 600,
      renderCell: (params: any) => {
        const row = params.row;

        const passedData = {
          model: row.model,
          plateNumber: row.plateNumber,
          seats: row.seats,
          isDeleted: row.isDeleted ? "Inactive" : "Active",
        };

        return <ViewDetails title={row.model} data={passedData} cols={vehicleColsView} />;
      },
    },
    { field: "plateNumber", headerName: "Plate Number", width: 150 },
    { field: "seats", headerName: "Seats", width: 100 },
    {
      field: "isDeleted",
      headerName: "Status",
      width: 200,
      renderCell: (params: any) => {
        const row = params.row;

        return row.isDeleted ? "Inactive" : "Active";
      },
    },
    {
      field: "operation",
      headerName: "View",
      width: 200,
      renderCell: (params: any) => {
        const row = params.row;

        const vehicle = row.model;

        const maintenance: MaintenanceProps[] = row.maintenance;

        const formattedMaintenance = maintenance.map((record) => ({ ...record, user: `${record.user.lastName}, ${record.user.firstName}` }));

        return maintenance.length > 0 ? <ViewMaintenanceDetails vehicle={vehicle} rows={formattedMaintenance} cols={maintenanceCols} /> : "-";
      },
    },
  ];

  return (
    <Container>
      <Row className="mt-5 d-flex justify-content-center">
        <Col lg={6} className="text-start">
          <CustomHeader title={"Vehicle Maintenace Log"} subtitle={"Logging of Maintenance"} />
        </Col>
        <Col lg={6}>
          <Row className="d-flex justify-content-end">
            <Col lg={4} className="">
              <FloatingLabel controlId="floatingSelect" label="Filter" className="small-input">
                <Form.Select name="vehicleFilter" aria-label="Floating label select example" value={vehicleFilter} onChange={handleSelectChange}>
                  <option value="all">All</option>
                  <option value="false">Active</option>
                  <option value="true">Inactive</option>
                </Form.Select>
              </FloatingLabel>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row>
        <CustomTable rows={vehicleTableData} columns={vehicleCols} type={"admin"} />
      </Row>
    </Container>
  );
}
