import http from "@/utils/request";
import { Case, JavaList, ResponseData, VolunteerCase } from "./types/models";

/**
 * 获取开启的案件数量
 *
 * @return {*}
 */
export const requestGetOpenCaseNumber = () => {
  return http.request<ResponseData<number>>({
    url: `case/number`,
    method: "GET",
    params: {},
    data: {},
    custom: { noAuth: true },
  });
};

/**
 * 通过距离、发布时间查找任务
 *
 * @param {{
 *   distance?: number;
 *   timeDiff?: number;
 * }} params
 * @return {*}
 */
export const requestGetOpenMissions = (params: {
  distance?: number;
  timeDiff?: number;
}) => {
  return http.request<ResponseData<JavaList<Case>>>({
    url: `case/ing`,
    method: "GET",
    params: params,
    data: {},
  });
};

/**
 * 获取案件列表
 *
 * @param {{ id?: number }} params
 * @return {*}
 */
export const requestGetCases = (params: { id?: number }) => {
  return http.request<ResponseData<JavaList<Case>>>({
    url: `case`,
    method: "GET",
    params: params,
    data: {},
  });
};

/**
 * 查询本人正在执行的案件
 *
 * @return {*}
 */
export const requestGetMyCases = () => {
  return http.request<ResponseData<JavaList<Case>>>({
    url: `case/volunteer/my`,
    method: "GET",
    params: {},
    data: {},
  });
};

/**
 * 查询本人被指派但还未确认的案件
 *
 * @return {*}
 */
export const requestGetMyUncheckedCases = () => {
  return http.request<ResponseData<JavaList<Case>>>({
    url: `case/volunteer/new`,
    method: "GET",
    params: {},
    data: {},
  });
};

/**
 * 接受案件
 *
 * @param {{
 *   caseId: number;
 *   equipment: string;
 *   traffic: string;
 * }} params
 * @return {*}
 */
export const requestAcceptCase = (params: {
  caseId: number;
  equipment: 1 | 2;
  traffic: string;
}) => {
  return http.request<ResponseData<object>>({
    url: `case/volunteer`,
    method: "POST",
    params: {},
    data: {
      state: 1,
      ...params,
    },
  });
};

/**
 * 拒绝案件
 *
 * @param {{
 *   caseId: number;
 *   equipment: string;
 *   traffic: string;
 * }} params
 * @return {*}
 */
export const requestRefuseCase = (params: { caseId: number }) => {
  return http.request<ResponseData<object>>({
    url: `case/volunteer`,
    method: "POST",
    params: {},
    data: {
      state: 2,
      ...params,
    },
  });
};
