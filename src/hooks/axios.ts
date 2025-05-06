import axios from "axios";
import {
  ChecklistProps,
  CreatePreventiveMaintenanceRequestProps,
  CreateUpdateTripRequestProps,
  CreateUpdateUserRequestProps,
  DepartmentProps,
  DriverProps,
  LoginRequestProps,
  ResponsePropsArray,
  TripChecklistProps,
  TripProps,
  TripRequestProps,
  UserProps,
  VehicleProps,
} from "../utils/TypesIndex";

const URL = "http://localhost:8888";

export const loginUser = async ({ email, password }: LoginRequestProps) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${URL}/auth/login`,
      data: {
        email: email,
        password: password,
      },
      withCredentials: true,
    });
    return { status: res.status, data: res.data.access_token };
  } catch (error: any) {
    return { status: error.response.status, data: error.response.data.message };
  }
};

export const getAllTrips = async ({ id, type, withDeleted }: TripRequestProps, access_token: string): Promise<ResponsePropsArray<TripProps>> => {
  try {
    const res = await axios({
      method: "GET",
      url: `${URL}/trip`,
      params: {
        id,
        type,
        withDeleted,
      },
      headers: {
        authorization: access_token,
      },
    });
    console.log(res.data.data);
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const getAllUsers = async (access_token: string): Promise<ResponsePropsArray<UserProps>> => {
  try {
    const res = await axios({
      method: "GET",
      url: `${URL}/auth/allAccounts`,
      headers: {
        authorization: access_token,
      },
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, message: error.response.data.message };
  }
};

export const addNewUser = async (data: CreateUpdateUserRequestProps, access_token: string) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${URL}/user/add`,
      headers: {
        authorization: access_token,
      },
      data,
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const updateExistingUser = async (data: CreateUpdateUserRequestProps, access_token: string) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `${URL}/user/update`,
      headers: {
        authorization: access_token,
      },
      data,
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const getAllChecklist = async (access_token: string): Promise<ResponsePropsArray<ChecklistProps>> => {
  try {
    const res = await axios({
      method: "GET",
      url: `${URL}/checklist`,
      headers: {
        authorization: access_token,
      },
      params: {
        withDeleted: true,
      },
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const getAllVehicle = async (access_token: string): Promise<ResponsePropsArray<VehicleProps>> => {
  try {
    const res = await axios({
      method: "GET",
      url: `${URL}/vehicle`,
      headers: {
        authorization: access_token,
      },
      params: {
        withDeleted: true,
      },
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const getAllDeparment = async (access_token: string): Promise<ResponsePropsArray<DepartmentProps>> => {
  try {
    const res = await axios({
      method: "GET",
      url: `${URL}/department`,
      headers: {
        authorization: access_token,
      },
      params: {
        withDeleted: true,
      },
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const addNewDeparment = async (data: DepartmentProps, access_token: string) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${URL}/department`,
      headers: {
        authorization: access_token,
      },
      data,
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const updateExistingDeparment = async (data: DepartmentProps, access_token: string) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `${URL}/department/update`,
      headers: {
        authorization: access_token,
      },
      data,
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const addNewChecklist = async (data: ChecklistProps, access_token: string) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${URL}/checklist`,
      headers: {
        authorization: access_token,
      },
      data,
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const updateExistingChecklist = async (data: ChecklistProps, access_token: string) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `${URL}/checklist/update`,
      headers: {
        authorization: access_token,
      },
      data,
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const addNewVehicle = async (data: VehicleProps, access_token: string) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${URL}/vehicle`,
      headers: {
        authorization: access_token,
      },
      data,
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const updateExistingVehicle = async (data: VehicleProps, access_token: string) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `${URL}/vehicle/update`,
      headers: {
        authorization: access_token,
      },
      data,
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const getAllDrivers = async (access_token: string): Promise<ResponsePropsArray<DriverProps>> => {
  try {
    const res = await axios({
      method: "GET",
      url: `${URL}/user/getAllDriver`,
      headers: {
        authorization: access_token,
      },
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, message: error.response.data.message };
  }
};

export const addNewTrip = async (data: CreateUpdateTripRequestProps, access_token: string) => {
  console.log(data);
  try {
    const res = await axios({
      method: "POST",
      url: `${URL}/trip`,
      headers: {
        authorization: access_token,
      },
      data: { ...data, driverId: data.driverId?.length == 0 ? null : data.driverId, vehicleId: data.vehicleId?.length == 0 ? null : data.vehicleId },
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const updateExistingTrip = async (data: CreateUpdateTripRequestProps, access_token: string) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `${URL}/trip/update`,
      headers: {
        authorization: access_token,
      },
      data: { ...data, driverId: data.driverId?.length == 0 ? null : data.driverId, vehicleId: data.vehicleId?.length == 0 ? null : data.vehicleId },
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const approveExistingTrip = async (id: string, userId: string, access_token: string) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `${URL}/trip/update`,
      headers: {
        authorization: access_token,
      },
      data: { id, status: "Approved", authorizedById: userId },
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const declineExistingTrip = async (id: string, userId: string, access_token: string) => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `${URL}/trip/update`,
      headers: {
        authorization: access_token,
      },
      data: { id, status: "Declined", authorizedById: userId },
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const addNewTripChecklist = async (data: TripChecklistProps, access_token: string) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${URL}/trip-checklist`,
      headers: {
        authorization: access_token,
      },
      data,
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const updateTripChecklist = async (data: TripChecklistProps, access_token: string) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${URL}/trip-checklist`,
      headers: {
        authorization: access_token,
      },
      data: data.checklist,
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};

export const changePassword = async (
  email: string,
  currentPassword: string,
  NewPassword: string,
  ConfirmNewPassword: string,
  access_token: string
): Promise<ResponsePropsArray<UserProps>> => {
  try {
    const res = await axios({
      method: "PATCH",
      url: `${URL}/auth/changePassword`,
      headers: {
        authorization: access_token,
      },
      data: {
        email,
        currentPassword,
        NewPassword,
        ConfirmNewPassword,
      },
    });
    return { statusCode: res.data.statusCode, message: res.data.messge };
  } catch (error: any) {
    return { statusCode: error.response.statusCode, message: error.response.data.message };
  }
};

export const logOut = async (access_token: string) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${URL}/auth/logout`,
      headers: {
        authorization: access_token,
      },
    });
    return { statusCode: res.data.statusCode, message: res.data.messge };
  } catch (error: any) {
    return { statusCode: error.response.statusCode, message: error.response.data.message };
  }
};

export const addNewPreventiveMaintenance = async (data: Omit<CreatePreventiveMaintenanceRequestProps, "access_token">, access_token: string) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${URL}/preventive-maintenance`,
      headers: {
        authorization: access_token,
      },
      data,
    });
    return { statusCode: res.data.statusCode, message: res.data.messge, data: res.data.data };
  } catch (error: any) {
    return { statusCode: error.response.statusCode, message: error.response.data.message };
  }
};
