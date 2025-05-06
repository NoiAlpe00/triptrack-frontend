import { ChangeEvent, JSX } from "react";

export interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

export interface LoginProps {
  email: string;
  password: string;
}

export interface CustomToastProps {
  header: string;
  body: string;
  time: string;
  show: boolean;
  variant: string;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface TripsProps {
  id?: string;
  title: string;
  department: string;
  destination: string;
  purpose: string;
  dateStart: string;
  dateEnd: string;
  driverRequest: boolean;
  vehicleRequest: boolean;
  driver?: string;
  vehicle?: string;
}

export interface DepartmentProps {
  id?: string;
  name: string;
  isDeleted?: boolean;
}

export interface ChecklistProps {
  id?: string;
  title: string;
  typed?: boolean;
  isDeleted?: boolean;
}

export interface CreateUpdateChecklistProps {
  passedData: ChecklistProps;
  access_token: string;
}

export interface TripSpecificChecklistProps {
  checklistId: string;
  title: string;
  data: string;
  typed: boolean;
}

export interface UserProps {
  id?: string;
  email: string;
  department: DepartmentProps;
  type: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  isActive: boolean;
  isDeleted: boolean;
  password?: string;
}

export interface UserTableProps {
  id?: string;
  email: string;
  department: DepartmentProps;
  type: string;
  firstName: string;
  lastName: string;
  name: string;
  contactNumber: string;
  isActive: boolean;
  isDeleted: boolean;
}

export interface VehicleProps {
  id?: string;
  model: string;
  plateNumber: string;
  seats?: number;
  isDeleted: boolean;
}

export interface CreateUpdateVehicleProps {
  passedData: VehicleProps;
  access_token: string;
}

export interface TripChecklistProps {
  id?: string;
  tripId: string;
  timeDeparture?: string;
  timeArrival?: string;
  timing: string;
  checklist: TripSpecificChecklistProps[];
}

export interface CreateUpdateTripChecklistProps {
  passedData: TripChecklistProps;
  type: string;
  phase: string;
  access_token: string;
}

export interface CustomRadioButtonProps {
  name: string;
  value: string;
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export interface DoughnutChartDataProps {
  id: string;
  title: string;
  date: string;
  destination: string;
  driver: string;
  vehicle: string;
  requestStatus: "Pending" | "Approved" | "Declined";
  tripStatus: string;
}

export interface TripsTableProps {
  id: string;
  title: string;
  date: string;
  destination: string;
  driver: string;
  vehicle: string;
  requestStatus: "Pending" | "Approved" | "Declined";
  tripStatus: string;
  tripStart: string;
  tripEnd: string;
  timeDeparture: string | null | undefined;
  timeArrival: string | null | undefined;
}

export interface LoginRequestProps {
  email: string;
  password: string;
}

export interface TripRequestProps {
  id?: string;
  type: string;
  withDeleted?: boolean;
}

export interface TokenData {
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
  sub: {
    userId: string;
  };
}

export interface TripChecklistIndividualProps {
  id: string;
  timing: string;
  data: string;
  isDeleted: boolean;
  checklist: ChecklistProps;
}

export interface TripProps {
  id: string;
  title: string;
  tripStart: string; // ISO 8601 date-time string
  tripEnd: string; // ISO 8601 date-time string
  destination: string;
  purpose: string;
  status: string;
  timeDeparture: string | null; // ISO 8601 date-time string
  timeArrival: string | null; // ISO 8601 date-time strin
  remarks: string;
  createdDate: string; // ISO 8601 date-time string
  updatedDate: string; // ISO 8601 date-time string
  isDeleted: boolean;
  tripChecklists: TripChecklistIndividualProps[];
  department: DepartmentProps;
  driver?: UserProps | null;
  vehicle?: VehicleProps | null;
  driverRequest: boolean;
  vehicleRequest: boolean;
  authorizedBy?: UserProps;
  user?: UserProps;
  feedback?: FeedbackProps[];
}

export interface TripTableProps extends TripProps {
  date: string;
  requestStatus: "Pending" | "Approved" | "Declined";
  tripStatus: string;
}

export interface ViewTripProps {
  passedData: TripTableProps;
  type: string;
}

export interface CreateUpdateTripProps {
  passedData: TripProps;
  access_token: string;
  departments: DepartmentProps[];
  vehicles: VehicleProps[];
  drivers: DriverProps[];
}

export interface ResponsePropsArray<T> {
  statusCode: number;
  data?: T[];
  message?: string;
}

export interface ResponsePropsSolo<T> {
  statusCode: number;
  data: T;
  message?: string;
}

export type TripItem = {
  requestStatus: "Approved" | "Declined" | "Pending";
  tripStatus: "Past" | "Ongoing" | "Upcoming";
};

export type StatusCounts<T extends string> = Record<T, number>;

export interface CreateUpdateUserProps {
  passedData: UserProps;
  departments: DepartmentProps[];
  access_token: string;
  setUserTableData: React.Dispatch<React.SetStateAction<UserTableProps[]>>;
}

export interface CreateUpdateUserRequestProps {
  id?: string;
  email: string;
  department: string;
  type: string;
  firstName: string;
  lastName: string;
  contactNumber: string;
  isActive: boolean;
  isDeleted: boolean;
  password?: string;
}

export interface CreateUpdateDepartmentProps {
  passedData: DepartmentProps;
  access_token: string;
}

export interface DriverProps extends UserProps {
  drivenTrips: TripProps;
}

export interface CreateUpdateTripRequestProps {
  id?: string;
  departmentId: string;
  driverRequest: boolean;
  vehicleRequest: boolean;
  authorizedBy?: string;
  userId: string;
  driverId: string | null;
  vehicleId: string | null;
  title: string;
  tripStart: string;
  tripEnd: string;
  destination: string;
  purpose: string;
  status: string;
}

export interface CreatePreventiveMaintenanceProps {
  userId: string;
  vehicleId: string;
  access_token: string;
}

export interface CreatePreventiveMaintenanceRequestProps extends CreatePreventiveMaintenanceProps {
  date: string;
  details: string;
  remarks: string;
}

export interface CreateTripFeedbackProps {
  userId: string;
  tripId: string;
  vehicleId: string;
  driverId: string;
  access_token: string;
}

export interface CreateTripFeedbackRequestProps extends Omit<CreateTripFeedbackProps, "vehicleId" | "driverId"> {
  vehicleRating: number;
  serviceRating: number;
  driverRating: number;
  remarks: string;
}

export interface FeedbackProps {
  id: string;
  vehicleRating: number;
  serviceRating: number;
  driverRating: number;
  remarks: string;
  user: UserProps;
}
