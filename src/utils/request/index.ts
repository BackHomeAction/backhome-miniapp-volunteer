import { showModalError } from "../helper";
import Request from "./lib";

const http = new Request({
  baseURL: "http://101.200.120.207:8080/",
});

http.interceptors.response.use(
  (response: any) => {
    /* 对响应成功做点什么 可使用 async await 做异步操作 */

    const state = response.data.state;
    const message = response.data.message;

    if (state !== 200) {
      if (state !== 103) {
        /* 除了 token 过期以外的错误 */
        showModalError(message);
      }
      return Promise.reject(response);
    }

    return response;
  },
  (response: any) => {
    /*  对响应错误做点什么 （statusCode !== 200）*/

    return Promise.reject(response);
  }
);

export default http;
