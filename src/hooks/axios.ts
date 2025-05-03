import axios from "axios";
import { ChecklistProps, DepartmentProps, LoginRequestProps, ResponsePropsArray, TripProps, TripRequestProps, UserProps, VehicleProps } from "../utils/TypesIndex";

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
    });
    return res.data;
  } catch (error: any) {
    return { statusCode: error.response.statusCode, data: error.response.data.message };
  }
};
