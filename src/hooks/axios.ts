import axios from "axios";
import { LoginRequestProps, ResponsePropsArray, TripProps, TripRequestProps } from "../utils/TypesIndex";

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
