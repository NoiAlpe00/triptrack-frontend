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
  id: number;
  title: string;
  date: string;
  destination: string;
  driver: string;
  vehicle: string;
  requestStatus: "Pending" | "Approved" | "Declined";
  tripStatus: string;
}
