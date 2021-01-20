import { showModalError } from "../helper";
import Request from "./lib";

const http = new Request({
  baseURL: "http://101.200.120.207:8080/",
});

http.interceptors.request.use(
  (config) => {
    const noAuth = config.custom && config.custom.noAuth;
    const token = uni.getStorageSync("token");

    if (!noAuth) {
      // 判断是否需要传 token
      if (token) {
        config.header = {
          ...config.header,
          Authorize: `Bearer ${token}`,
        };
      } else {
        // 如果接口需要登录但用户未登录，则请求登录
        // TODO: 登录逻辑
        // 如果 token 不存在，且该接口不是无需 token 的接口，且登录失败，则取消本次请求
        return Promise.reject(config);
      }
    }

    return config;
  },
  (config) => {
    // 可使用async await 做异步操作
    return Promise.reject(config);
  }
);

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
