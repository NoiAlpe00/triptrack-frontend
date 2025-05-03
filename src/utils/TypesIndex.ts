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

export interface TripChecklistProps {
  id?: string;
  tripId: string;
  departureTime?: string;
  arrivalTime?: string;
  checklist: TripSpecificChecklistProps[];
  type: string;
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
}

export interface TripProps {
  id: string;
  title: string;
  tripStart: string; // ISO 8601 date-time string
  tripEnd: string; // ISO 8601 date-time string
  destination: string;
  purpose: string;
  status: string;
  timeDeparture: string; // ISO 8601 date-time string
  timeArrival: string | null;
  remarks: string;
  createdDate: string; // ISO 8601 date-time string
  updatedDate: string; // ISO 8601 date-time string
  isDeleted: boolean;
  tripChecklists: TripChecklistIndividualProps[];
  department: DepartmentProps;
  driver: UserProps | null;
  vehicle: VehicleProps | null;
}

export interface ResponsePropsArray<T> {
  statusCode: number;
  data: T[];
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
