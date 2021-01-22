import { ActionTypes } from "@/enums/actionTypes";
import store from "@/store";
import {
  hideLoading,
  navigateTo,
  showLoading,
  showToast,
} from "@/utils/helper";

const login = async () => {
  showLoading("登录中");
  await store.dispatch(ActionTypes.login);
  await getUserInfo(); //获取个人信息

  if (store.getters.hasVolunteerInfo) {
    showToast("登录成功", "success");
  } else {
    hideLoading();
    if (store.getters.userInfo.phone) {
      // 如果已绑定手机，则直接进入绑定个人信息页面
      navigateTo("/pages/register/index?step=2");
    } else {
      // 如果否则先绑定手机
      navigateTo("/pages/register/index");
    }
  }
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
