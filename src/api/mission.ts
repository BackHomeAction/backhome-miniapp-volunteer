import http from "@/utils/request";
import { Case, JavaList, ResponseData } from "./types/models";

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
