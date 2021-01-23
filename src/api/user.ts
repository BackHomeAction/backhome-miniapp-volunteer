import http from "@/utils/request";
import {
  BindVolunteerInformation,
  ResponseData,
  Volunteer,
  VolunteerBindPhone,
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
    custom: { noAuth: true },
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
  return http.request<ResponseData<Volunteer>>({
    url: `volunteer/information`,
    method: "GET",
    params: {},
    data: {},
  });
};

/**
 * 绑定手机
 *
 * @param {VolunteerBindPhone} params
 * @return {*}
 */
export const requestBindPhone = (params: VolunteerBindPhone) => {
  return http.request<ResponseData<object>>({
    url: `volunteer/bindPhone`,
    method: "POST",
    params: {},
    data: params,
  });
};

/**
 * 绑定身份信息
 *
 * @param {BindVolunteerInformation} params
 * @return {*}
 */
export const requestBindVolunteerInformation = (
  params: BindVolunteerInformation
) => {
  return http.request<ResponseData<VolunteerInformation>>({
    url: `volunteer/information`,
    method: "POST",
    params: {},
    data: params,
  });
};

/**
 * 用微信用户信息初始化用户资料
 *
 * @param {volunteerUserInfo} params
 * @return {*}
 */
export const requestUpdateWechatUserInfo = (params: volunteerUserInfo) => {
  return http.request<ResponseData<object>>({
    url: `volunteer/userinfo`,
    method: "POST",
    params: {},
    data: params,
  });
};
