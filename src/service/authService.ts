import { requestLogin } from "@/api/user";

const login = () => {
  try {
    uni.login({
      success: async ({ code }) => {
        const res = await requestLogin({ code });
        uni.setStorageSync("token", res.data.token);
        uni.setStorageSync("refresh_token", res.data.refreshToken);
        console.log(res);
      },
    });
  } catch (e) {
    console.log(e);
  }
};

const logout = () => {
  try {
    uni.removeStorageSync("token");
    uni.removeStorageSync("refresh_token");
  } catch (e) {
    console.log(e);
  }
};

export default { login, logout };
