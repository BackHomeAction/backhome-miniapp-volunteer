import authService from "@/service/authService";
import { showModalError } from "../helper";
import Request from "./lib";

const http = new Request({
  baseURL: "https://fwwb2020-app-volunteer.tgucsdn.com/",
});

http.interceptors.request.use(
  async (config) => {
    const noInterceptor = config.custom && config.custom.noInterceptor;
    if (noInterceptor) {
      return config;
    }

    const noAuth = config.custom && config.custom.noAuth;
    const token = uni.getStorageSync("token");

    if (!noAuth) {
      if (!token) {
        // 如果接口需要登录但用户未登录，则请求登录
        await authService.login();
      }

      // 判断是否需要传 token
      if (token) {
        config.header = {
          ...config.header,
          Authorize: `Bearer ${token}`,
        };
      } else {
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
    const noInterceptor =
      response.config.custom && response.config.custom.noInterceptor;
    if (noInterceptor) {
      return response;
    }

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
