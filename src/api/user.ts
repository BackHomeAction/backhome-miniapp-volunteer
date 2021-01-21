import http from "@/utils/request";
import {
  ResponseData,
  Volunteer,
  VolunteerInformation,
  VolunteerLoginCode,
  VolunteerRefreshToken,
  volunteerUserInfo,
} from "./types/models";

/**
 * 登录
 *
 * @param {VolunteerLoginCode} params
 * @return {*}
 */
export const requestLogin = (params: VolunteerLoginCode) => {
  return http.request<ResponseData<Volunteer>>({
    url: `volunteer/login`,
    method: "POST",
    params: {},
    data: params,
    custom: { noAuth: true },
  });
};

/**
 * 刷新 token
 *
 * @param {VolunteerRefreshToken} params
 * @return {*}
 */
export const requestRefreshToken = (params: VolunteerRefreshToken) => {
  return http.request<ResponseData<object>>({
    url: `volunteer/refresh`,
    method: "POST",
    params: {},
    data: params,
  });
};

/**
 * 用微信的 userInfo 初始化个人信息（头像等）
 *
 * @param {volunteerUserInfo} params
 * @return {*}
 */
export const requestUpdateInfo = (params: volunteerUserInfo) => {
  return http.request<ResponseData<object>>({
    url: `volunteer/userinfo`,
    method: "POST",
    params: {},
    data: params,
  });
};

/**
 * 获取志愿者信息
 *
 * @return {*}
 */
export const requestGetUserInfo = () => {
  return http.request<ResponseData<VolunteerInformation>>({
    url: `volunteer/information`,
    method: "GET",
    params: {},
    data: {},
  });
};

/**
 * 绑定志愿者手机号时获取验证码
 *
 * @param {{ phone: string }} params
 * @return {*}
 */
export const requestGetCodeWhileRegister = (params: { phone: string }) => {
  return http.request<ResponseData<object>>({
    url: `volunteer/getBindCode`,
    method: "GET",
    params: params,
    data: {},
  });
};
