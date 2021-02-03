import { ActionTypes } from "@/enums/actionTypes";
import store from "@/store";
import {
  hideLoading,
  navigateTo,
  showLoading,
  showModalError,
  showToast,
} from "@/utils/helper";
import LocationReporter from "./locationService";

const locationReporter = new LocationReporter();

const login = async () => {
  await requestLocationPermission();
  showLoading("登录中");
  await store.dispatch(ActionTypes.login);
  await getUserInfo(); //获取个人信息

  if (store.getters.hasVolunteerInfo) {
    showToast("登录成功", "success");
    locationReporter.start();
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
    locationReporter.end();
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

const requestLocationPermission = () => {
  return new Promise<void>((resolve, reject) => {
    uni.authorize({
      scope: "scope.userLocation",
      success() {
        resolve();
      },
      fail() {
        showModalError("请授予本程序定位权限");
        reject();
      },
    });
  });
};

export default { login, logout, getUserInfo };
