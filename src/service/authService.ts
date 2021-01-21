import { ActionTypes } from "@/enums/actionTypes";
import store from "@/store";
import { hideLoading, showLoading, showToast } from "@/utils/helper";

const login = async () => {
  showLoading("登录中");
  await store.dispatch(ActionTypes.login);
  await getUserInfo(); //获取个人信息
  showToast("登录成功", "success");
};

const logout = async () => {
  showLoading("退出中");

  try {
    await store.dispatch(ActionTypes.logout);
    showToast("退出成功", "success");
  } catch (e) {
    hideLoading();
    console.log(e);
  }
};

const getUserInfo = async () => {
  try {
    await store.dispatch(ActionTypes.getUserInfo);
  } catch (e) {
    console.log(e);
  }
};

export default { login, logout, getUserInfo };
