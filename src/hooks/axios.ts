import axios from "axios";
import {
  ChecklistProps,
  CreateUpdateUserRequestProps,
  DepartmentProps,
  LoginRequestProps,
  ResponsePropsArray,
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
