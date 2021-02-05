import templateMessageSettings from "@/config/templateMessage";
import { ActionTypes } from "@/enums/actionTypes";
import store from "@/store";
import {
  hideLoading,
  navigateTo,
  showLoading,
  showModalError,
  showToast,
} from "@/utils/helper";
import WebsocketService from "./websocketService";

const websocketService = new WebsocketService();

const login = async () => {
  showLoading("登录中");
  await store.dispatch(ActionTypes.login);
  await getUserInfo(); //获取个人信息
  await requestLocationPermission(); // 申请定位权限

  if (store.getters.hasVolunteerInfo) {
    showToast("登录成功", "success");
    try {
      checkPermissions(); // 检查权限
      websocketService.start();
    } catch (e) {
      console.log(e);
    }
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
    websocketService.end();
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

const checkPermissions = () => {
  return new Promise<void>((resolve, reject) => {
    uni.getSetting({
      withSubscriptions: true,
      success(res) {
        console.debug(res.subscriptionsSetting);
        if (
          !res.subscriptionsSetting.mainSwitch ||
          !res.subscriptionsSetting.itemSettings ||
          res.subscriptionsSetting.itemSettings[
            templateMessageSettings.tmplIds[0]
          ] !== "accept"
        ) {
          navigateTo("/pages/requestSubscribeMessage/index");
        }

        resolve();
      },
      fail() {
        reject();
      },
    });
  });
};

export default { login, logout, getUserInfo };
