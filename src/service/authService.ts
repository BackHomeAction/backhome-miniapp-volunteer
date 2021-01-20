import { requestLogin } from "@/api/user";
import { MutationTypes } from "@/enums/mutationTypes";
import {
  setToken,
  setRefreshToken,
  removeToken,
  removeRefreshToken,
} from "@/utils/auth";
import store from "@/store";
import { hideLoading, showLoading, showToast } from "@/utils/helper";

const login = () => {
  return new Promise(() => {
    showLoading("登录中");

    try {
      uni.login({
        success: async ({ code }) => {
          const res = await requestLogin({ code });
          res.data.token && setToken(res.data.token);
          res.data.refreshToken && setRefreshToken(res.data.refreshToken);
          store.commit(MutationTypes.SET_LOGIN, true);
          console.log(res);
          showToast("登录成功", "success");
          return Promise.resolve();
        },
      });
    } catch (e) {
      hideLoading();
      console.log(e);
      return Promise.reject();
    }
  });
};

const logout = () => {
  showLoading("退出中");

  try {
    removeToken();
    removeRefreshToken();
    store.commit(MutationTypes.SET_LOGIN, false);
    showToast("退出成功", "success");
  } catch (e) {
    hideLoading();
    console.log(e);
  }
};

export default { login, logout };
