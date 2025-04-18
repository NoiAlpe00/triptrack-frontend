import { JSX } from "react";

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


