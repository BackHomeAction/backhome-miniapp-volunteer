import http from "@/utils/request";
import {
  ResponseData,
  Volunteer,
  VolunteerLoginCode,
  VolunteerRefreshToken,
  volunteerUserInfo,
} from "./types/models";

export const requestLogin = (params: VolunteerLoginCode) => {
  return http.request<ResponseData<Volunteer>>({
    url: `volunteer/login`,
    method: "POST",
    params: {},
    data: params,
    custom: { noAuth: true },
  });
};

export const requestRefreshToken = (params: VolunteerRefreshToken) => {
  return http.request<ResponseData<object>>({
    url: `volunteer/refresh`,
    method: "POST",
    params: {},
    data: params,
  });
};

export const requestUpdateInfo = (params: volunteerUserInfo) => {
  return http.request<ResponseData<object>>({
    url: `volunteer/userinfo`,
    method: "POST",
    params: {},
    data: params,
  });
};
