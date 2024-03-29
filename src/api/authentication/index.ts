import axios, { AxiosResponse } from "axios";
import client from "config/axiosConfig";
import { onHandleErrorFromApi } from "helpers/*";


//hook
import { informationFormType } from "hook/useUserAuth";

//Api.type
import { APIResponseErrorType, AxiosReturn } from "types/Api.type";

//type
import { SignInResponseType, SignUpResponseType } from "./authentication.type";

//type
export type SingUpParamType = {
  username?: string;
  email?: string;
  password?: string;
};

export type SingInParamType = {
  identifier?: string;
  password?: string;
};

export async function onSingUp({
  email,
  password,
}: informationFormType): AxiosReturn<SignUpResponseType> {
  try {
    const response = await client.post<
      SignUpResponseType,
      AxiosResponse<SignUpResponseType>,
      SingUpParamType
    >("/auth/local/register", {
      username: email,
      email,
      password,
    });
    return [response.data, null];
  } catch (error) {
    if (axios.isAxiosError<APIResponseErrorType>(error)) {
      return [null, error.response?.data?.error?.message ?? "Error"];
    }
    return [null, (error as Error).message];
  }
}

export async function onSingIn({
  email,
  password,
}: informationFormType): AxiosReturn<SignInResponseType> {
  try {
    const response = await client.post<
      SignInResponseType,
      AxiosResponse<SignInResponseType>,
      SingInParamType
    >("/auth/local", {
      identifier: email,
      password,
    });
    return [response.data, null];
  } catch (error) {
    return onHandleErrorFromApi(error);
  }
}
//request ส่งคำร้องไป
//response ขอข้อมูลกลับมา
