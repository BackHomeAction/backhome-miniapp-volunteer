import http from "@/utils/request";
import { JavaList, ResponseData, VolunteerInformation } from "./types/models";

/**
 * 查询志愿者信息
 *
 * @param {{
 *   province?: string;
 *   city?: string;
 *   district?: string;
 *   id?: number;
 * }} params
 * @return {*}
 */
export const requestGetVolunteers = (params: {
  province?: string;
  city?: string;
  district?: string;
  id?: number; // informationID
}) => {
  return http.request<ResponseData<JavaList<VolunteerInformation>>>({
    url: `volunteer/information/all`,
    method: "GET",
    params: params,
    data: {},
  });
};
