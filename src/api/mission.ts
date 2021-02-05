import http from "@/utils/request";
import { ResponseData } from "./types/models";

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
  });
};
